import { expect, it, vi } from 'vitest';
import { GET } from '@/app/api/analytics-config/route';
it.each(['development', 'test', 'production'])(
  'stays disabled with no owner activation in %s',
  async (environment) => {
    vi.stubEnv('NODE_ENV', environment);
    expect(await (await GET()).json()).toEqual({ enabled: false });
  }
);
it('requires public production and explicit processing approval at runtime', async () => {
  vi.stubEnv('NODE_ENV', 'production');
  vi.stubEnv('ANALYTICS_ENABLED', 'true');
  vi.stubEnv('PLAUSIBLE_DOMAIN', 'docrack.ai');
  vi.stubEnv('SITE_ENVIRONMENT', 'private-preview');
  vi.stubEnv('ANALYTICS_PROCESSING_APPROVED', 'true');
  expect(await (await GET()).json()).toEqual({ enabled: false });
  vi.stubEnv('SITE_ENVIRONMENT', 'public-production');
  vi.stubEnv('ANALYTICS_PROCESSING_APPROVED', 'false');
  expect(await (await GET()).json()).toEqual({ enabled: false });
  vi.stubEnv('ANALYTICS_PROCESSING_APPROVED', 'true');
  const response = await GET();
  expect(await response.json()).toEqual({ enabled: true, domain: 'docrack.ai' });
  expect(response.headers.get('cache-control')).toBe('no-store');
});
