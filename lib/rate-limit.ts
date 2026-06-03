/**
 * Simple in-memory rate limiter.
 * On serverless (Vercel), resets per cold start — good enough for burst protection.
 * For persistent cross-instance limiting, replace with Vercel KV / Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  /** Time window in milliseconds */
  windowMs: number;
  /** Max allowed requests per window */
  max: number;
}

/**
 * Returns true if the request is allowed, false if rate limited.
 */
export function rateLimit(key: string, options: RateLimitOptions): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + options.windowMs });
    return true;
  }

  if (entry.count >= options.max) {
    return false; // blocked
  }

  entry.count++;
  return true;
}

/**
 * Returns remaining time in seconds until the rate limit window resets.
 */
export function getRateLimitReset(key: string): number {
  const entry = store.get(key);
  if (!entry) return 0;
  return Math.ceil(Math.max(0, entry.resetAt - Date.now()) / 1000);
}
