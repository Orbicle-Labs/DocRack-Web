import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  const enabled =
    process.env.NODE_ENV === 'production' &&
    process.env.SITE_ENVIRONMENT === 'public-production' &&
    process.env.ANALYTICS_ENABLED === 'true' &&
    process.env.ANALYTICS_PROCESSING_APPROVED === 'true' &&
    process.env.PLAUSIBLE_DOMAIN === 'docrack.ai';
  return NextResponse.json(enabled ? { enabled, domain: 'docrack.ai' } : { enabled: false }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
