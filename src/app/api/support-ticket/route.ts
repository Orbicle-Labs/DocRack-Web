import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getRateLimitReset } from '@/lib/server/rate-limit';
import { appendRow } from '@/lib/server/sheets';
import { sendEmail, supportTicketEmailHtml } from '@/lib/server/notify';

// Server-side schema
const schema = z.object({
  fullName: z
    .string()
    .min(2, 'Name too short')
    .max(100, 'Name too long')
    .regex(/^[\p{L}\s'\-\.]+$/u, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email too long')
    .transform((v) => v.toLowerCase().trim()),
  message: z.string().min(10, 'Message too short').max(5000, 'Message too long'),
  _hp: z.string().max(0).optional(), // honeypot — must be empty
});

export async function POST(req: NextRequest) {
  // ── 1. Rate limiting (5 requests per 30 minutes per IP) ──────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const allowed = rateLimit(`support:${ip}`, { windowMs: 30 * 60 * 1000, max: 5 });
  if (!allowed) {
    const retryAfter = getRateLimitReset(`support:${ip}`);
    return NextResponse.json(
      { error: `Too many requests. Please try again in ${retryAfter} seconds.` },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  // ── 2. Parse body ─────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // ── 3. Honeypot check (server-side) ───────────────────────────────────────
  if (typeof body === 'object' && body !== null && '_hp' in body) {
    const hp = (body as Record<string, unknown>)._hp;
    if (typeof hp === 'string' && hp.length > 0) {
      return NextResponse.json({ success: true });
    }
  }

  // ── 4. Validate ───────────────────────────────────────────────────────────
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid form data.', fields: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { fullName, email, message } = result.data;
  const submittedAt = new Date();
  const timestamp = `${submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  // ── 5. Append to Google Sheet (system of record) ──────────────────────────
  try {
    await appendRow('Support Tickets', [timestamp, fullName.trim(), email, message.trim()]);
  } catch (err) {
    console.error('[api/support-ticket] sheets append error:', err);
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again.' },
      { status: 500 }
    );
  }

  // ── 6. Email notification — best-effort, but awaited (Cloud Run throttles
  //       CPU after the response is sent, so fire-and-forget would be dropped)
  try {
    await sendEmail({
      from: 'DocRack Support <onboarding@resend.dev>',
      subject: `💬 New Support Message — ${fullName}`,
      html: supportTicketEmailHtml({
        fullName: fullName.trim(),
        email,
        message: message.trim(),
        submittedAt,
      }),
    });
  } catch (err) {
    console.error('[api/support-ticket] email notify failed (non-fatal):', err);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
