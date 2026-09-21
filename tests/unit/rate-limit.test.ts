import { beforeEach, expect, it, vi } from 'vitest';
import { Firestore, Timestamp } from '@google-cloud/firestore';
import {
  checkRateLimit,
  consumeFirestore,
  counterKey,
  MemoryLimiter,
} from '@/lib/server/rate-limit';

const mock = vi.hoisted(() => ({ run: vi.fn(), doc: vi.fn() }));
vi.mock('@google-cloud/firestore', async (original) => ({
  ...(await original<typeof import('@google-cloud/firestore')>()),
  Firestore: class {
    collection() {
      return { doc: mock.doc };
    }
    runTransaction = mock.run;
  },
}));
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

it('uses namespace-separated HMAC keys without an IP or form data', () => {
  const key = counterKey('demo', '192.0.2.1', 'synthetic-secret');
  expect(key).toMatch(/^demo_[a-f0-9]{64}$/);
  expect(key).not.toContain('192.0.2.1');
  expect(counterKey('support', '192.0.2.1', 'synthetic-secret')).not.toBe(key);
  expect(counterKey('demo', '192.0.2.1', 'other-secret')).not.toBe(key);
});

it.each([
  { kind: 'demo' as const, max: 3, windowMs: 1200000 },
  { kind: 'support' as const, max: 5, windowMs: 1800000 },
])(
  'enforces $kind concurrency across two SDK clients sharing a transactional mock',
  async ({ kind, max, windowMs }) => {
    // Serialised shared transaction mock models Firestore atomicity, not a live service.
    const records = new Map<string, Record<string, unknown>>();
    let lock: Promise<unknown> = Promise.resolve();
    mock.doc.mockImplementation((key) => key);
    mock.run.mockImplementation((callback) => {
      const next = lock.then(() =>
        callback({
          get: async (key: string) => ({ exists: records.has(key), data: () => records.get(key) }),
          set: (key: string, data: Record<string, unknown>) => {
            records.set(key, data);
          },
        })
      );
      lock = next;
      return next;
    });
    const clients = [new Firestore(), new Firestore()];
    const key = counterKey(kind, '192.0.2.1', 'secret');
    const decisions = await Promise.all(
      Array.from({ length: 20 }, (_, i) =>
        consumeFirestore(clients[i % 2], key, kind, new AbortController().signal)
      )
    );
    expect(decisions.filter((d) => d.allowed)).toHaveLength(max);
    expect(mock.run).toHaveBeenCalledWith(expect.any(Function), { maxAttempts: 3 });
    expect(Object.keys(records.get(key)!)).toEqual([
      'count',
      'windowStart',
      'resetAt',
      'expiresAt',
    ]);
    expect(records.get(key)!.count).toBe(max);
    expect((records.get(key)!.expiresAt as Timestamp).toMillis()).toBe(records.get(key)!.resetAt);
    vi.useFakeTimers();
    vi.setSystemTime((records.get(key)!.windowStart as number) + windowMs);
    expect(
      (await consumeFirestore(clients[0], key, kind, new AbortController().signal)).allowed
    ).toBe(true);
  }
);

it('checks expiry even while TTL has not removed the document', async () => {
  mock.doc.mockReturnValue('key');
  const set = vi.fn();
  mock.run.mockImplementation((callback) =>
    callback({
      get: async () => ({
        exists: true,
        data: () => ({
          count: 3,
          windowStart: Date.now() - 1000,
          resetAt: Date.now() + 1000,
          expiresAt: Timestamp.fromMillis(Date.now() - 1),
        }),
      }),
      set,
    })
  );
  expect(
    (await consumeFirestore(new Firestore(), 'key', 'demo', new AbortController().signal)).allowed
  ).toBe(true);
  expect(set.mock.calls[0][1].count).toBe(1);
});

it('bounds fallback cardinality, retains existing limits at capacity, and prunes expired entries', () => {
  const local = new MemoryLimiter(2);
  expect(local.consume('a', 'demo', 0).allowed).toBe(true);
  expect(local.consume('b', 'demo', 0).allowed).toBe(true);
  expect(local.consume('c', 'demo', 0).allowed).toBe(false);
  local.consume('a', 'demo', 0);
  local.consume('a', 'demo', 0);
  expect(local.consume('a', 'demo', 0)).toEqual({ allowed: false, retryAfter: 1200 });
  expect(local.consume('c', 'demo', 1200000).allowed).toBe(true);
});

it('falls back on a shared-store failure, emits only safe operational fields, and resets at expiry', async () => {
  vi.useFakeTimers();
  vi.setSystemTime(Date.now() + 60000);
  vi.stubEnv('FIRESTORE_PROJECT_ID', 'synthetic-project');
  vi.stubEnv('FIRESTORE_DATABASE_ID', 'synthetic-db');
  vi.stubEnv('RATE_LIMIT_HMAC_SECRET', 'synthetic-long-secret-32-characters');
  mock.run.mockRejectedValue(new Error('private-provider-body'));
  for (let n = 0; n < 3; n++)
    expect((await checkRateLimit('demo', '192.0.2.99', 'synthetic-id')).allowed).toBe(true);
  expect((await checkRateLimit('demo', '192.0.2.99', 'synthetic-id')).allowed).toBe(false);
  expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toMatch(
    /192\.0\.2|private-provider-body|synthetic-long-secret/
  );
  expect(vi.mocked(console.error).mock.calls[0][0]).toContain('limiter_degraded');
  await vi.advanceTimersByTimeAsync(1200000);
  expect((await checkRateLimit('demo', '192.0.2.99', 'synthetic-id')).allowed).toBe(true);
});

it('bounds unavailable shared transactions and prevents writes after late reads', async () => {
  vi.useFakeTimers();
  vi.setSystemTime(Date.now() + 2000000);
  vi.stubEnv('FIRESTORE_PROJECT_ID', 'synthetic-project');
  vi.stubEnv('FIRESTORE_DATABASE_ID', 'synthetic-db');
  vi.stubEnv('RATE_LIMIT_HMAC_SECRET', 'synthetic-long-secret-32-characters');
  let resolve!: (value: unknown) => void;
  const set = vi.fn();
  mock.run.mockImplementation((callback) =>
    callback({
      get: () =>
        new Promise((done) => {
          resolve = done;
        }),
      set,
    })
  );
  const pending = checkRateLimit('support', '192.0.2.88', 'synthetic-id');
  await vi.advanceTimersByTimeAsync(3000);
  expect((await pending).allowed).toBe(true);
  resolve({ exists: false });
  await Promise.resolve();
  expect(set).not.toHaveBeenCalled();
});
