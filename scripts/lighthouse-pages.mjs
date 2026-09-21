/** Optional Lighthouse 13.4.1 QA installation lives outside the app dependency tree. */
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const modulePath =
  process.env.LIGHTHOUSE_MODULE ?? '.local-tools/performance/node_modules/lighthouse/core/index.js';
const { default: lighthouse } = await import(pathToFileURL(resolve(modulePath)).href);
const phase = process.env.QA_PHASE ?? '5';
if (!['5', '6'].includes(phase)) throw Error('QA_PHASE must be 5 or 6');
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3100';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw Error('Local QA only');
for (const path of ['/', '/product', '/product/documents', '/book-demo']) {
  for (let run = 1; run <= 3; run++) {
    const browser = await chromium.launch({ args: ['--remote-debugging-port=9224'] });
    try {
      const result = await lighthouse(base + path, {
        port: 9224,
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'seo'],
        blockedUrlPatterns: ['*/_vercel/*', 'https://*'],
        logLevel: 'error',
      });
      if (result.lhr.runtimeError) throw Error(JSON.stringify(result.lhr.runtimeError));
      await writeFile(
        `docs/qa/phase-${phase}-lighthouse-${path === '/' ? 'home' : path.slice(1).replaceAll('/', '-')}-${run}.json`,
        result.report
      );
      console.log(
        JSON.stringify({
          path,
          run,
          scores: Object.fromEntries(
            Object.entries(result.lhr.categories).map(([k, v]) => [k, v.score])
          ),
          lcp: result.lhr.audits['largest-contentful-paint'].numericValue,
          cls: result.lhr.audits['cumulative-layout-shift'].numericValue,
          warnings: result.lhr.runWarnings,
        })
      );
    } finally {
      await browser.close();
    }
  }
}
