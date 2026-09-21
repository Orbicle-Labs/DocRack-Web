import 'server-only';
import { ServiceFailure } from './deadline';

type Event = 'request' | 'sheets' | 'notification' | 'limiter_degraded' | 'ingress_unverified';
// Do not accept Error objects, request headers, user values or arbitrary context.
export function logEvent(
  event: Event,
  correlationId: string,
  status: number | 'ok' | 'skipped' | 'configuration' | 'timeout' | 'provider',
  started: number
) {
  console.error(
    JSON.stringify({ event, correlationId, status, latencyMs: Math.max(0, Date.now() - started) })
  );
}
export function failureCode(error: unknown) {
  return error instanceof ServiceFailure ? (error.status ?? error.code) : 'provider';
}
