/** Local production measurements. No form submissions, product calls or remote traffic. */
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { routes } from '../src/content/routes.ts';
const phase = process.env.QA_PHASE ?? '5';
if (!['5', '6'].includes(phase)) throw Error('QA_PHASE must be 5 or 6');
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3100';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw Error('Local QA only');
const browser = await chromium.launch();
const report = {
  date: new Date().toISOString(),
  browser: browser.version(),
  methodology:
    'Cold contexts; local production, no CPU/network throttling. External requests and API writes blocked; analytics disabled. Initial response gzip estimates and measured transfer separately; not field CWV.',
  pages: [],
};
try {
  for (const entry of routes) {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 1440 ? 1000 : 844 },
      });
      await context.route('**/*', (r) => {
        const u = new URL(r.request().url());
        if (
          !['localhost', '127.0.0.1'].includes(u.hostname) ||
          (u.pathname.startsWith('/api/') && r.request().method() !== 'GET')
        )
          return r.abort();
        if (u.pathname.startsWith('/_vercel/'))
          return r.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
        return r.continue();
      });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.pageMetrics = { cls: 0, lcp: 0 };
        new PerformanceObserver((list) => {
          for (const e of list.getEntries())
            if (!e.hadRecentInput) window.pageMetrics.cls += e.value;
        }).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) window.pageMetrics.lcp = e.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      });
      const bodies = [];
      page.on('response', (r) => {
        const type = r.request().resourceType();
        if (['document', 'stylesheet', 'script', 'font', 'image'].includes(type))
          bodies.push(
            (async () => {
              const b = await r.body();
              return {
                type,
                bytes: b.length,
                gzipBytes: ['document', 'stylesheet', 'script'].includes(type)
                  ? gzipSync(b).length
                  : b.length,
              };
            })()
          );
      });
      await page.goto(base + entry.path);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForLoadState('networkidle');
      const resources = await Promise.all(bodies);
      const measurements = await page.evaluate(() => ({
        ...window.pageMetrics,
        transfer: performance
          .getEntriesByType('resource')
          .reduce(
            (n, r) => n + r.transferSize,
            performance.getEntriesByType('navigation')[0].transferSize
          ),
      }));
      report.pages.push({
        path: entry.path,
        width,
        ...measurements,
        jsGzip: resources.filter((r) => r.type === 'script').reduce((n, r) => n + r.gzipBytes, 0),
        totalGzip: resources.reduce((n, r) => n + r.gzipBytes, 0),
      });
      await context.close();
    }
    console.log(`Measured ${entry.path}`);
  }
  await writeFile(
    `docs/qa/phase-${phase}-measurements.json`,
    JSON.stringify(report, null, 2) + '\n'
  );
} finally {
  await browser.close();
}
