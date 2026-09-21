import { NextResponse } from 'next/server';
import { handleEnquiry } from '@/lib/server/enquiry';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  return handleEnquiry(req, 'demo');
}
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
