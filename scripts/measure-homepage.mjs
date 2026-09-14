/** Credential-free local homepage measurements. No form submissions or remote requests. */
import { chromium } from '@playwright/test';
import { mkdir, writeFile, readdir, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3100';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local QA only');
const browser = await chromium.launch();
const result = {
  date: new Date().toISOString(),
  base,
  browser: browser.version(),
  methodology:
    'Cold browser contexts; local production server; no CPU/network throttling. Gzip estimates from response bodies, resource transferSize separately. All external requests and API writes blocked; analytics stubbed. Not field Core Web Vitals.',
  viewports: [],
  fonts: {},
};
try {
  for (const [width, height] of [
    [1440, 1000],
    [768, 900],
    [390, 844],
    [320, 740],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: 'reduce',
    });
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (!['localhost', '127.0.0.1'].includes(url.hostname) || url.pathname.startsWith('/api/'))
        return route.abort();
      if (url.pathname.startsWith('/_vercel/'))
        return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
      return route.continue();
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.homeMetrics = { cls: 0, lcp: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.homeMetrics.cls += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.homeMetrics.lcp = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    const bodies = [];
    page.on('response', (response) => {
      const request = response.request();
      if (!['document', 'stylesheet', 'script', 'font', 'image'].includes(request.resourceType()))
        return;
      bodies.push(
        (async () => {
          const body = await response.body();
          return {
            path: new URL(response.url()).pathname,
            type: request.resourceType(),
            bytes: body.length,
            gzipBytes: ['document', 'stylesheet', 'script'].includes(request.resourceType())
              ? gzipSync(body).length
              : body.length,
          };
        })()
      );
    });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState('networkidle');
    await page.screenshot();
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    );
    const initial = await page.evaluate(() => ({
      ...window.homeMetrics,
      transferBytes: performance
        .getEntriesByType('resource')
        .reduce(
          (n, r) => n + r.transferSize,
          performance.getEntriesByType('navigation')[0].transferSize
        ),
    }));
    const resources = (await Promise.all(bodies)).filter((r) => !r.path.startsWith('/_vercel/'));
    for (const step of ['Documents', 'Tests', 'Runs', 'Findings', 'Working Papers', 'Review'])
      await page.getByRole('tab', { name: new RegExp(step + '$') }).click();
    await page.getByRole('button', { name: 'PO · Orders!H43', exact: true }).click();
    const evidence = await page.locator('.source-evidence').evaluate((node) => ({
      bounds: node.getBoundingClientRect().toJSON(),
      font: getComputedStyle(node.querySelector('.caption')).fontSize,
      contentOverflow: [...node.querySelectorAll('*')]
        .filter((n) => n.clientWidth > 0 && n.scrollWidth > n.clientWidth + 1)
        .map((n) => n.className),
    }));
    await page.getByRole('button', { name: 'Return to result', exact: true }).click();
    const focus = await page.evaluate(() => {
      const r = document.activeElement.getBoundingClientRect();
      return {
        top: r.top,
        bottom: r.bottom,
        headerBottom: document.querySelector('.site-header').getBoundingClientRect().bottom,
        viewport: innerHeight,
      };
    });
    const journey = await page.evaluate(() => ({
      ...window.homeMetrics,
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    result.viewports.push({
      width,
      height,
      initial,
      initialGzipBytes: resources.reduce((n, r) => n + r.gzipBytes, 0),
      initialJsGzipBytes: resources
        .filter((r) => r.type === 'script')
        .reduce((n, r) => n + r.gzipBytes, 0),
      journey,
      evidence,
      focus,
      resources,
    });
    await context.close();
  }
  const fontFiles = (await readdir('public/fonts', { recursive: true })).filter((f) =>
    f.endsWith('.woff2')
  );
  for (const file of fontFiles) result.fonts[file] = (await stat(`public/fonts/${file}`)).size;
  await mkdir('docs/qa', { recursive: true });
  await writeFile('docs/qa/phase-4-measurements.json', JSON.stringify(result, null, 2) + '\n');
  console.log(
    JSON.stringify(
      result.viewports.map(
        ({ width, initial, initialGzipBytes, initialJsGzipBytes, journey, evidence, focus }) => ({
          width,
          initial,
          initialGzipBytes,
          initialJsGzipBytes,
          journey,
          evidence,
          focus,
        })
      ),
      null,
      2
    )
  );
} finally {
  await browser.close();
}
