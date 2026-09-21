import 'server-only';
import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { demoSchema, supportSchema } from '@/lib/forms/schemas';
import { guardHeaders, readJson, clientIdentity, RequestFailure } from './request-guards';
import { checkRateLimit, type FormKind } from './rate-limit';
import { appendRow } from './sheets';
import { sendEmail, demoBookingEmailHtml, supportTicketEmailHtml } from './notify';
import { failureCode, logEvent } from './log';

export async function handleEnquiry(req: Request, kind: FormKind) {
  const correlationId = randomUUID();
  const started = Date.now();
  function respond(body: object, status: number, headers: Record<string, string> = {}) {
    logEvent('request', correlationId, status, started);
    return NextResponse.json(body, {
      status,
      headers: { ...headers, 'X-Request-ID': correlationId, 'Cache-Control': 'no-store' },
    });
  }
  let body: unknown;
  try {
    guardHeaders(req);
    const { identity, verified } = clientIdentity(req);
    if (!verified) logEvent('ingress_unverified', correlationId, 'configuration', started);
    const limit = await checkRateLimit(kind, identity, correlationId);
    if (!limit.allowed)
      return respond({ error: 'Too many requests.' }, 429, {
        'Retry-After': String(limit.retryAfter),
      });
    body = await readJson(req);
  } catch (error) {
    if (error instanceof RequestFailure) return respond({ error: error.message }, error.status);
    return respond({ error: 'Unable to process this request.' }, 500);
  }
  if (
    body &&
    typeof body === 'object' &&
    '_hp' in body &&
    typeof body._hp === 'string' &&
    body._hp.length
  )
    return respond({ success: true }, 200);
  const result = (kind === 'demo' ? demoSchema : supportSchema).safeParse(body);
  if (!result.success)
    return respond(
      { error: 'Invalid form data.', fields: result.error.flatten().fieldErrors },
      422
    );
  const data = result.data;
  const submittedAt = new Date();
  const timestamp = `${submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;
  const demo = 'companyName' in data;
  const storageStart = Date.now();
  try {
    await appendRow(
      demo ? 'Demo Bookings' : 'Support Tickets',
      demo
        ? [timestamp, data.fullName, data.email, data.companyName, data.auditCount]
        : [timestamp, data.fullName, data.email, data.message]
    );
    logEvent('sheets', correlationId, 'ok', storageStart);
  } catch (error) {
    logEvent('sheets', correlationId, failureCode(error), storageStart);
    return respond(
      {
        error:
          'We could not confirm receipt. Your details are still here. A retry may send a duplicate.',
      },
      500
    );
  }
  const notifyStart = Date.now();
  try {
    const status = await sendEmail({
      from: demo
        ? 'DocRack Leads <onboarding@resend.dev>'
        : 'DocRack Support <onboarding@resend.dev>',
      subject: demo ? 'New DocRack demo request' : 'New DocRack support message',
      html: demo
        ? demoBookingEmailHtml({ ...data, submittedAt })
        : supportTicketEmailHtml({ ...data, submittedAt }),
    });
    logEvent('notification', correlationId, status === 'skipped' ? 'skipped' : 'ok', notifyStart);
  } catch (error) {
    logEvent('notification', correlationId, failureCode(error), notifyStart);
  }
  return respond({ success: true }, 201);
}
