import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getRateLimitReset } from '@/lib/rate-limit';
import { appendRow } from '@/lib/sheets';
import { sendEmail, demoBookingEmailHtml } from '@/lib/notify';

// Server-side schema — stricter than client
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
  companyName: z
    .string()
    .min(2, 'Organization name too short')
    .max(200, 'Organization name too long'),
  auditCount: z.enum(['1-10', '10-50', '50-100', '100+'], {
    errorMap: () => ({ message: 'Invalid audit count selection' }),
  }),
  _hp: z.string().max(0).optional(), // honeypot — must be empty
});

export async function POST(req: NextRequest) {
  // ── 1. Rate limiting (3 requests per 20 minutes per IP) ──────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const allowed = rateLimit(`demo:${ip}`, { windowMs: 20 * 60 * 1000, max: 3 });
  if (!allowed) {
    const retryAfter = getRateLimitReset(`demo:${ip}`);
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
      // Silently accept bots — return 200 to avoid giving away detection
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

  const { fullName, email, companyName, auditCount } = result.data;
  const submittedAt = new Date();
  const timestamp = `${submittedAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  // ── 5. Append to Google Sheet (system of record) ──────────────────────────
  try {
    await appendRow('Demo Bookings', [
      timestamp,
      fullName.trim(),
      email,
      companyName.trim(),
      auditCount,
    ]);
  } catch (err) {
    console.error('[api/demo-booking] sheets append error:', err);
    return NextResponse.json(
      { error: 'Failed to save your booking. Please try again.' },
      { status: 500 }
    );
  }

  // ── 6. Email notification — best-effort, but awaited (Cloud Run throttles
  //       CPU after the response is sent, so fire-and-forget would be dropped)
  try {
    await sendEmail({
      from: 'DocRack Leads <onboarding@resend.dev>',
      subject: `🎯 New Demo Booking — ${fullName} (${companyName})`,
      html: demoBookingEmailHtml({
        fullName: fullName.trim(),
        email,
        companyName: companyName.trim(),
        auditCount,
        submittedAt,
      }),
    });
  } catch (err) {
    console.error('[api/demo-booking] email notify failed (non-fatal):', err);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
