import { canonicalPage, eventSchema, type AnalyticsConfig, type AnalyticsEvent } from './events';

let config: AnalyticsConfig = { enabled: false };
export function configureAnalytics(value: AnalyticsConfig) {
  config = value.enabled === true && value.domain === 'docrack.ai' ? value : { enabled: false };
}
export function track(event: AnalyticsEvent) {
  try {
    if (
      !config.enabled ||
      typeof window === 'undefined' ||
      navigator.doNotTrack === '1' ||
      (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl
    )
      return;
    const parsed = eventSchema.safeParse(event);
    const page = canonicalPage(window.location.pathname);
    if (!parsed.success || !page) return;
    // No auto pageviews, referrer, query, fragment, UTM, cookie or field capture.
    // Fixed canonical URL, including during mocked localhost transport tests.
    void fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        name: parsed.data.name,
        domain: config.domain,
        url: `https://docrack.ai${page}`,
        props: parsed.data.props,
      }),
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      keepalive: true,
      signal: AbortSignal.timeout(2000),
    }).catch(() => {});
  } catch {
    /* Analytics never affects a visitor action, including blocked APIs. */
  }
}
