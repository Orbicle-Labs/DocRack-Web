/**
 * Shared submit path for the two lead forms.
 *
 * Both API routes answer with the same shape — `{ error }` plus `{ fields }` on
 * a 422 and a `Retry-After` header on a 429 — but neither form used to read
 * either, so a per-field validation failure surfaced as one generic toast and a
 * rate limit gave no indication of how long to wait. This is where that is
 * translated, once, for both.
 *
 * The request bodies themselves are unchanged: same endpoints, same field
 * names, same JSON.
 */

export interface SubmitFailure {
  /** Human-readable, safe to show in a toast and an inline alert. */
  message: string;
  /** From a 422 — field name to its first message, ready for RHF setError. */
  fields?: Record<string, string>;
  /** True for a 429, so the caller can suppress a retry prompt. */
  rateLimited?: boolean;
}

export type SubmitResult = { ok: true } | { ok: false; failure: SubmitFailure };

const GENERIC = 'Something went wrong. Please try again.';

/** "in 4 minutes" reads better than "in 214 seconds" and is what people need. */
function formatRetryAfter(seconds: number): string {
  if (seconds <= 90) return `${seconds} seconds`;
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes === 1 ? '' : 's'}`;
}

/** `{ fullName: ['too short', ...] }` → `{ fullName: 'too short' }`. */
function firstMessagePerField(raw: unknown): Record<string, string> | undefined {
  if (typeof raw !== 'object' || raw === null) return undefined;

  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const message = Array.isArray(value) ? value[0] : value;
    if (typeof message === 'string' && message.length > 0) out[key] = message;
  }

  return Object.keys(out).length > 0 ? out : undefined;
}

export async function submitForm(
  endpoint: string,
  payload: Record<string, string>
): Promise<SubmitResult> {
  let res: Response;

  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Offline, DNS failure, blocked request — never a server message.
    return {
      ok: false,
      failure: { message: 'Could not reach the server. Check your connection and try again.' },
    };
  }

  // A 200 with no body is still a success: the server answers 200 to a filled
  // honeypot deliberately, so bots learn nothing from the response.
  let json: Record<string, unknown> = {};
  try {
    json = (await res.json()) as Record<string, unknown>;
  } catch {
    /* empty or non-JSON body */
  }

  if (res.ok) return { ok: true };

  if (res.status === 429) {
    const header = Number(res.headers.get('Retry-After'));
    const wait = Number.isFinite(header) && header > 0 ? formatRetryAfter(header) : 'a few minutes';
    return {
      ok: false,
      failure: {
        message: `Too many submissions from this network. Please try again in ${wait}.`,
        rateLimited: true,
      },
    };
  }

  if (res.status === 422) {
    const fields = firstMessagePerField(json.fields);
    return {
      ok: false,
      failure: {
        message: fields
          ? 'Please correct the highlighted fields.'
          : typeof json.error === 'string'
            ? json.error
            : GENERIC,
        fields,
      },
    };
  }

  return {
    ok: false,
    failure: { message: typeof json.error === 'string' ? json.error : GENERIC },
  };
}
