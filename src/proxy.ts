import { NextRequest, NextResponse } from 'next/server';
import { activeRedirects } from './content/routes';
import { securityHeaders } from './lib/security-headers';

// Next's configured redirects discarded configured headers in local production
// verification. Handle only the seven legacy paths here; canonical pages remain
// prerendered. Next requires an absolute redirect URL; only the fixed path changes.
export function proxy(request: NextRequest) {
  const redirect = activeRedirects.find((entry) => entry.source === request.nextUrl.pathname);
  if (!redirect) return NextResponse.next();
  const destination = request.nextUrl.clone();
  destination.pathname = redirect.destination;
  return new NextResponse(null, {
    status: 308,
    headers: {
      ...Object.fromEntries(securityHeaders.map(({ key, value }) => [key, value])),
      Location: destination.toString(),
    },
  });
}
export const config = {
  matcher: [
    '/intake',
    '/workflow',
    '/about',
    '/documents',
    '/reconciliation-and-checks',
    '/review-and-findings',
    '/working-papers',
  ],
};
