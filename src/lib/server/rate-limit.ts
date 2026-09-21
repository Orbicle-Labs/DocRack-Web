import 'server-only';
import { createHmac, randomBytes } from 'node:crypto';
import { Firestore, Timestamp } from '@google-cloud/firestore';
import { deadline, ServiceFailure } from './deadline';
import { failureCode, logEvent } from './log';

export const limits = {
  demo: { max: 3, windowMs: 20 * 60 * 1000 },
  support: { max: 5, windowMs: 30 * 60 * 1000 },
} as const;
export type FormKind = keyof typeof limits;
type Counter = { count: number; windowStart: number; resetAt: number; expiresAt: Timestamp };
type Decision = { allowed: boolean; retryAfter: number };

export class MemoryLimiter {
  private store = new Map<string, Counter>();
  constructor(private readonly capacity = 10000) {}
  prune(now = Date.now()) {
    for (const [key, entry] of this.store) if (entry.resetAt <= now) this.store.delete(key);
  }
  consume(key: string, kind: FormKind, now = Date.now()): Decision {
    this.prune(now);
    const previous = this.store.get(key);
    if (!previous && this.store.size >= this.capacity) return { allowed: false, retryAfter: 60 };
    const { counter, decision } = advance(previous, kind, now);
    if (decision.allowed) this.store.set(key, counter);
    return decision;
  }
}

function advance(previous: Counter | undefined, kind: FormKind, now: number) {
  const { max, windowMs } = limits[kind];
  const counter: Counter =
    previous && previous.resetAt > now && previous.expiresAt.toMillis() > now
      ? { ...previous }
      : {
          count: 0,
          windowStart: now,
          resetAt: now + windowMs,
          expiresAt: Timestamp.fromMillis(now + windowMs),
        };
  const allowed = counter.count < max;
  if (allowed) counter.count++;
  return {
    counter,
    decision: { allowed, retryAfter: Math.max(1, Math.ceil((counter.resetAt - now) / 1000)) },
  };
}

export function counterKey(kind: FormKind, identity: string, secret: string) {
  return `${kind}_${createHmac('sha256', secret).update(`${kind}:${identity}`).digest('hex')}`;
}

export async function consumeFirestore(
  db: Firestore,
  key: string,
  kind: FormKind,
  signal: AbortSignal
): Promise<Decision> {
  const ref = db.collection('websiteRateLimits').doc(key);
  return db.runTransaction(
    async (transaction) => {
      signal.throwIfAborted();
      const snapshot = await transaction.get(ref);
      signal.throwIfAborted();
      const { counter, decision } = advance(
        snapshot.exists ? (snapshot.data() as Counter) : undefined,
        kind,
        Date.now()
      );
      if (decision.allowed) transaction.set(ref, counter);
      return decision;
    },
    { maxAttempts: 3 }
  );
}

const fallback = new MemoryLimiter();
const processSecret = randomBytes(32).toString('hex');
let firestore: Firestore | undefined;
let unavailableUntil = 0;
const cleanup = setInterval(() => fallback.prune(), 60000);
cleanup.unref();

// GAX retry budgets can override timeout_millis. Disable RPC-level replays and
// bound both budgets; Firestore's transaction loop handles contention retries.
export const firestoreClientConfig = {
  interfaces: {
    'google.firestore.v1.Firestore': {
      retry_codes: { non_idempotent: [] },
      retry_params: {
        default: {
          initial_retry_delay_millis: 100,
          retry_delay_multiplier: 1,
          max_retry_delay_millis: 100,
          initial_rpc_timeout_millis: 2000,
          rpc_timeout_multiplier: 1,
          max_rpc_timeout_millis: 2000,
          total_timeout_millis: 2000,
        },
      },
      methods: Object.fromEntries(
        ['BeginTransaction', 'BatchGetDocuments', 'Commit', 'Rollback'].map((method) => [
          method,
          {
            timeout_millis: 2000,
            retry_codes_name: 'non_idempotent',
            retry_params_name: 'default',
          },
        ])
      ),
    },
  },
};

function database() {
  if (
    !process.env.FIRESTORE_PROJECT_ID ||
    !process.env.FIRESTORE_DATABASE_ID ||
    (process.env.RATE_LIMIT_HMAC_SECRET?.length ?? 0) < 32
  )
    throw new ServiceFailure('configuration');
  firestore ??= new Firestore({
    projectId: process.env.FIRESTORE_PROJECT_ID,
    databaseId: process.env.FIRESTORE_DATABASE_ID,
    clientConfig: firestoreClientConfig,
  });
  return firestore;
}

export async function checkRateLimit(
  kind: FormKind,
  identity: string,
  correlationId: string
): Promise<Decision> {
  const started = Date.now();
  const secret = process.env.RATE_LIMIT_HMAC_SECRET || processSecret;
  const key = counterKey(kind, identity, secret);
  // Shadow attempts locally so entering fallback cannot reset this instance's allowance.
  const local = fallback.consume(key, kind);
  try {
    if (Date.now() < unavailableUntil) throw new ServiceFailure('provider');
    const db = database();
    return await deadline(3000, (signal) => consumeFirestore(db, key, kind, signal));
  } catch (error) {
    unavailableUntil = Date.now() + 30000;
    logEvent('limiter_degraded', correlationId, failureCode(error), started);
    return local;
  }
}
