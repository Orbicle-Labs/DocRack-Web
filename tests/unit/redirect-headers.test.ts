import { expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { config, proxy } from '@/proxy';
import { activeRedirects } from '@/content/routes';
it('keeps proxy matchers aligned with exact redirects and retains query and anti-framing headers', () => {
  expect([...config.matcher].sort()).toEqual(activeRedirects.map((r) => r.source).sort());
  for (const entry of activeRedirects) {
    const response = proxy(
      new NextRequest(`https://docrack.ai${entry.source}?source=synthetic`, {
        headers: { 'x-forwarded-host': 'untrusted.example' },
      })
    );
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(
      `https://docrack.ai${entry.destination}?source=synthetic`
    );
    expect(response.headers.get('x-frame-options')).toBe('DENY');
    expect(response.headers.get('content-security-policy')).toContain("frame-ancestors 'none'");
  }
});
