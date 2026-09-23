import { canonicalPage } from './catalog';
import type { AnalyticsConfig, AnalyticsEvent } from './events';

let config: AnalyticsConfig = { enabled: false };
let configurationVersion = 0;
export function configureAnalytics(value: AnalyticsConfig) {
  configurationVersion++;
  config = value.enabled === true && value.domain === 'docrack.ai' ? value : { enabled: false };
}
export async function track(event: AnalyticsEvent) {
  try {
    if (
      !config.enabled ||
      typeof window === 'undefined' ||
      navigator.doNotTrack === '1' ||
      (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl
    )
      return;
    const page = canonicalPage(window.location.pathname);
    if (!page) return;
    const version = configurationVersion;
    // Disabled analytics never needs to download the validation library.
    // Keep the exact strict schema and recheck consent/config after loading it.
    const { eventSchema } = await import('./events');
    if (
      version !== configurationVersion ||
      !config.enabled ||
      navigator.doNotTrack === '1' ||
      (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl
    )
      return;
    const parsed = eventSchema.safeParse(event);
    if (!parsed.success) return;
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
