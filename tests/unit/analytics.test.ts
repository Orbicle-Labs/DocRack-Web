// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';
import { configureAnalytics, track } from '@/lib/analytics/client';
import type { AnalyticsEvent } from '@/lib/analytics/events';
import { submitForm } from '@/lib/forms/submit';
afterEach(() => configureAnalytics({ enabled: false }));
const event: AnalyticsEvent = { name: 'demo_form_start', props: { page: '/book-demo' } };
it('is disabled by default and rejects unapproved domains', async () => {
  await track(event);
  configureAnalytics({ enabled: true, domain: 'private.example' });
  await track(event);
  expect(fetch).not.toHaveBeenCalled();
});
it('sends a fixed allowlisted payload without query, fragment, referrer, cookies or form values', async () => {
  window.history.replaceState({}, '', '/book-demo?email=private@example.com#secret');
  configureAnalytics({ enabled: true, domain: 'docrack.ai' });
  vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 202 }));
  await track(event);
  const [url, options] = vi.mocked(fetch).mock.calls[0];
  expect(url).toBe('https://plausible.io/api/event');
  expect(options).toMatchObject({ credentials: 'omit', referrerPolicy: 'no-referrer' });
  expect(JSON.parse(options!.body as string)).toEqual({
    name: 'demo_form_start',
    domain: 'docrack.ai',
    url: 'https://docrack.ai/book-demo',
    props: { page: '/book-demo' },
  });
});
it('rejects unknown events, arbitrary properties, unknown pages and unavailable samples', async () => {
  window.history.replaceState({}, '', '/book-demo');
  configureAnalytics({ enabled: true, domain: 'docrack.ai' });
  for (const value of [
    { ...event, props: { page: '/book-demo', email: 'private@example.com' } },
    { name: 'sample_download', props: { assetId: 'invented' } },
    { ...event, props: { page: '/private' } },
  ])
    await track(value as AnalyticsEvent);
  window.history.replaceState({}, '', '/private-person-name');
  await track(event);
  expect(fetch).not.toHaveBeenCalled();
});
it('contains both synchronous blockers and asynchronous provider failures', async () => {
  window.history.replaceState({}, '', '/book-demo');
  configureAnalytics({ enabled: true, domain: 'docrack.ai' });
  vi.mocked(fetch)
    .mockImplementationOnce(() => {
      throw Error('blocked');
    })
    .mockRejectedValueOnce(Error('offline'));
  await expect(track(event)).resolves.toBeUndefined();
  await expect(track(event)).resolves.toBeUndefined();
  await Promise.resolve();
});
it.each([200, 201, 500])(
  'emits conversion only for persisted 201, response status %i',
  async (status) => {
    window.history.replaceState({}, '', '/book-demo');
    configureAnalytics({ enabled: true, domain: 'docrack.ai' });
    vi.mocked(fetch).mockImplementation(async (url) =>
      typeof url === 'string' && url.startsWith('/api/')
        ? Response.json({ success: true }, { status })
        : new Response(null, { status: 202 })
    );
    const result = await submitForm('/api/demo-booking', { fullName: 'Private Person' });
    // Optional telemetry loads independently; it never delays the form result.
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    const events = vi
      .mocked(fetch)
      .mock.calls.filter(([url]) => url === 'https://plausible.io/api/event')
      .map(([, options]) => JSON.parse(options!.body as string));
    expect(result.ok).toBe(status === 201);
    expect(events.some((e) => e.name === 'demo_request_success')).toBe(status === 201);
    expect(JSON.stringify(events)).not.toContain('Private Person');
  }
);
it('cancels a pending event if analytics is disabled during validator loading', async () => {
  window.history.replaceState({}, '', '/book-demo');
  configureAnalytics({ enabled: true, domain: 'docrack.ai' });
  const pending = track(event);
  configureAnalytics({ enabled: false });
  await pending;
  expect(fetch).not.toHaveBeenCalled();
});
it('rechecks privacy preference changes before sending a pending event', async () => {
  window.history.replaceState({}, '', '/book-demo');
  configureAnalytics({ enabled: true, domain: 'docrack.ai' });
  const pending = track(event);
  vi.stubGlobal('navigator', { doNotTrack: '1' });
  await pending;
  expect(fetch).not.toHaveBeenCalled();
});
it('does not reflect untrusted response values as field errors or alerts', async () => {
  vi.mocked(fetch).mockResolvedValue(
    Response.json(
      {
        error: 'private provider body',
        fields: { email: ['private@example.com'], unknown: ['private'] },
      },
      { status: 422 }
    )
  );
  expect(await submitForm('/api/demo-booking', {})).toEqual({
    ok: false,
    failure: {
      message: 'Please correct the highlighted fields.',
      fields: { email: 'Check your email address.' },
    },
  });
});
