import 'server-only';
import { isIP } from 'node:net';
import { deadline } from './deadline';

export class RequestFailure extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
  }
}
export const BODY_LIMIT = 16 * 1024;

export function guardHeaders(req: Request) {
  if (req.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json')
    throw new RequestFailure(415, 'Send this form as JSON.');
  const origin = req.headers.get('origin');
  // No Host/forwarded-host inference. Missing Origin is allowed only by explicit
  // operator policy for nonbrowser JSON clients; it is never authentication.
  if (!origin) {
    if (
      process.env.ALLOW_MISSING_ORIGIN !== 'true' ||
      ['cross-site', 'same-site'].includes(req.headers.get('sec-fetch-site') ?? '')
    )
      throw new RequestFailure(403, 'This request origin is not allowed.');
  } else {
    const allowed = (process.env.FORM_ALLOWED_ORIGINS ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    let canonical = '';
    try {
      canonical = new URL(origin).origin;
    } catch {
      /* reject */
    }
    if (canonical !== origin || !/^https?:\/\//.test(origin) || !allowed.includes(origin))
      throw new RequestFailure(403, 'This request origin is not allowed.');
  }
}

export async function readJson(req: Request): Promise<unknown> {
  const declared = req.headers.get('content-length');
  if (declared && Number(declared) > BODY_LIMIT)
    throw new RequestFailure(413, 'This request is too large.');
  const reader = req.body?.getReader();
  if (!reader) throw new RequestFailure(400, 'Invalid request body.');
  let complete = false;
  try {
    return await deadline(5000, async (signal) => {
      signal.addEventListener(
        'abort',
        () => {
          void reader.cancel().catch(() => {});
        },
        { once: true }
      );
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        signal.throwIfAborted();
        if (done) break;
        size += value.byteLength;
        if (size > BODY_LIMIT) throw new RequestFailure(413, 'This request is too large.');
        chunks.push(value);
      }
      complete = true;
      return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
    });
  } catch (error) {
    if (error instanceof RequestFailure) throw error;
    throw new RequestFailure(400, 'Invalid request body.');
  } finally {
    if (!complete) void reader.cancel().catch(() => {});
  }
}

export function clientIdentity(req: Request): { identity: string; verified: boolean } {
  // This header must be overwritten by a verified ingress that is the ONLY path
  // to the service. X-Forwarded-For / X-Real-IP are deliberately never consumed.
  if (process.env.FORM_INGRESS_MODE === 'verified-header') {
    const ip = req.headers.get('x-docrack-client-ip')?.trim();
    if (ip && isIP(ip)) {
      const canonical = ip.includes(':') ? new URL(`http://[${ip}]/`).hostname.toLowerCase() : ip;
      return { identity: canonical, verified: true };
    }
  }
  return { identity: 'shared-unverified-ingress', verified: false };
}
