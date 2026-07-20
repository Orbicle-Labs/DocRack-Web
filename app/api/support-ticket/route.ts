import { NextRequest, NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { rateLimit, getRateLimitReset } from '@/lib/rate-limit';

// Server-side Supabase client — created lazily so builds don't require env vars
let supabaseClient: SupabaseClient | null = null;
function getSupabase() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}

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
  const supabase = getSupabase();

  // ── 5. Duplicate check (same email in last 1 hour) ────────────────────────
  try {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from('support_tickets')
      .select('id')
      .eq('email', email)
      .gte('created_at', since)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'A support message from this email was already submitted in the last hour.' },
        { status: 409 }
      );
    }
  } catch {
    // If duplicate check fails, proceed anyway
  }

  // ── 6. Insert ─────────────────────────────────────────────────────────────
  const { error: dbError } = await supabase.from('support_tickets').insert({
    full_name: fullName.trim(),
    email,
    message: message.trim(),
  });

  if (dbError) {
    console.error('[api/support-ticket] insert error:', dbError.message);
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
