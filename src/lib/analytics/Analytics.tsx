'use client';
import { useEffect } from 'react';
import { canonicalPage } from './events';
import { configureAnalytics, track } from './client';

export function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    const controller = new AbortController();
    void fetch('/api/analytics-config', { cache: 'no-store', signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { enabled: false }))
      .then((value) => {
        if (!controller.signal.aborted) configureAnalytics(value);
      })
      .catch(() => {});
    function activate(event: MouseEvent) {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null;
      if (!anchor || anchor.getAttribute('href') !== '/book-demo') return;
      const page = canonicalPage(window.location.pathname);
      if (!page) return;
      track({
        name: 'demo_cta_click',
        props: {
          page,
          placement: anchor.closest('header')
            ? 'header'
            : anchor.closest('footer')
              ? 'footer'
              : 'main',
          ctaId: 'book-demo',
        },
      });
    }
    document.addEventListener('click', activate);
    return () => {
      controller.abort();
      configureAnalytics({ enabled: false });
      document.removeEventListener('click', activate);
    };
  }, []);
  return null;
}
