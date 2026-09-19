import { mkdirSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { publishedRoutes, activeRedirects, sitemapRoutes } from '../../src/content/routes';
import { fixtures, resultStates } from '../../src/content/demos/fixtures';
import { glossaryTerms } from '../../src/content/pages/glossary';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (!['localhost', '127.0.0.1'].includes(url.hostname)) return route.abort();
    if (url.pathname.startsWith('/api/') && route.request().method() !== 'GET')
      return route.fulfill({ status: 201, json: { success: true } });
    if (url.pathname.startsWith('/_vercel/'))
      return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
    return route.continue();
  });
});

for (const entry of publishedRoutes.filter((r) => r.path !== '/')) {
  test(`Phase 5 content, metadata and responsive access: ${entry.path}`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://docrack.ai${entry.path}`
    );
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
      'content',
      /\/opengraph-image/
    );
    if (!entry.indexable) {
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await expect(page.locator('main')).toContainText('awaiting owner and legal review');
      expect(await response!.text()).not.toContain('Retention and requests');
    }
    for (const [width, height] of [
      [1440, 1000],
      [1280, 720],
      [1024, 768],
      [768, 900],
      [390, 844],
      [320, 740],
    ]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => scrollTo(0, 0));
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${entry.path} at ${width}`
      ).toBe(true);
      await expect(page.locator('h1')).toBeVisible();
      const clipped = await page
        .locator('.trace-list, .evidence-comparison, .recipe-anatomy, .paper-contents')
        .evaluateAll((nodes) =>
          nodes.flatMap((node) =>
            [...node.querySelectorAll('*')]
              .filter((n) => n.clientWidth > 0 && n.scrollWidth > n.clientWidth + 2)
              .map((n) => n.textContent)
          )
        );
      expect(clipped).toEqual([]);
      if ([1440, 768, 390, 320].includes(width) && info.project.name === 'chromium') {
        mkdirSync('docs/design/screenshots/phase-5', { recursive: true });
        await page.screenshot({
          path: `docs/design/screenshots/phase-5/${entry.path.slice(1).replaceAll('/', '-')}-${width}.png`,
          fullPage: true,
        });
      }
      if (width === 320 || width === 1440) {
        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(axe.violations).toEqual([]);
      }
    }
    const links = await page
      .locator('main a, header a, footer a')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href')!));
    for (const href of links) {
      const target = new URL(href, `http://127.0.0.1:3100${entry.path}`);
      expect(
        publishedRoutes.some((route) => route.path === target.pathname),
        href
      ).toBe(true);
      if (target.hash && target.pathname === entry.path)
        await expect(page.locator(`[id="${target.hash.slice(1)}"]`)).toHaveCount(1);
    }
    await expect(page.locator('main a[download], main a[href="#"]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('seven single-hop redirects preserve queries and relevant fragments', async ({
  request,
  page,
}) => {
  for (const redirect of activeRedirects) {
    const response = await request.get(`${redirect.source}?source=synthetic&campaign=phase5`, {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(
      `${redirect.destination}?source=synthetic&campaign=phase5`
    );
    expect((await request.get(response.headers().location, { maxRedirects: 0 })).status()).toBe(
      200
    );
  }
  for (const [source, destination, anchor] of [
    ['/review-and-findings', '/product/review-and-findings', 'evidence-trace'],
    ['/working-papers', '/product/working-papers', 'exception-handoff'],
    ['/documents', '/product/documents', 'trace'],
    ['/reconciliation-and-checks', '/product/reconciliation-and-checks', 'checks'],
    ['/product', '/product', 'copilot'],
    ['/product/audit-test-recipes', '/product/audit-test-recipes', 'recipe-run'],
  ]) {
    await page.goto(`${source}?source=synthetic#${anchor}`);
    await expect(page).toHaveURL(`http://127.0.0.1:3100${destination}?source=synthetic#${anchor}`);
    await expect(page.locator(`#${anchor}`)).toBeInViewport();
    expect(
      await page.locator(`#${anchor}`).evaluate((n) => n.getBoundingClientRect().top)
    ).toBeGreaterThanOrEqual(88);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const r of sitemapRoutes)
    expect(sitemap).toContain(`<loc>https://docrack.ai${r.path === '/' ? '' : r.path}</loc>`);
  for (const r of activeRedirects)
    expect(sitemap).not.toContain(`<loc>https://docrack.ai${r.source}</loc>`);
  expect(sitemap).not.toContain('https://docrack.ai/privacy');
  expect(sitemap).not.toContain('https://docrack.ai/terms');
});

test('Recipes, source roles, Run identities and approval boundaries agree', async ({ page }) => {
  await page.goto('/product/audit-test-recipes');
  await expect(page.locator('.recipe-anatomy li')).toHaveCount(14);
  await expect(page.locator('.source-roles dt')).toHaveCount(6);
  for (const [path, f] of [
    ['/solutions/internal-audit', fixtures.p2p],
    ['/solutions/credit-loan-audit', fixtures.credit],
    ['/solutions/ifc-sox', fixtures.ifc],
  ] as const) {
    await page.goto(path);
    await expect(page.locator('.evidence-scene')).toContainText(f.record);
    await expect(page.locator('.evidence-scene')).toContainText(f.expected);
    await expect(page.locator('.evidence-scene')).toContainText(f.actual);
    await expect(page.locator('.run-record')).toContainText(f.run);
    for (const state of resultStates)
      await expect(page.locator('.state-counts')).toContainText(state);
    await expect(page.locator('.run-record')).toContainText('Draft / review incomplete');
    await expect(page.getByRole('button', { name: /^Approve|^Confirm/ })).toHaveCount(0);
  }
  await page.goto('/glossary');
  const data = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}'
  );
  expect(data.hasDefinedTerm).toHaveLength(glossaryTerms.length);
  for (const term of glossaryTerms) {
    await expect(page.locator(`#${term.slug}`)).toContainText(term.definition);
    expect(
      data.hasDefinedTerm.find((t: { name: string }) => t.name === term.term).description
    ).toBe(term.definition);
  }
});

test('keyboard, reduced motion and text reflow on new pages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/product/documents');
  const summary = page.locator('.trace-list summary').first();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(summary.locator('..')).not.toHaveAttribute('open');
  await page.keyboard.press('Enter');
  await expect(summary.locator('..')).toHaveAttribute('open');
  await expect(summary).toBeFocused();
  for (const path of [
    '/product/audit-test-recipes',
    '/product/documents',
    '/product/working-papers',
    '/support',
    '/book-demo',
  ]) {
    await page.goto(path);
    await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  }
  await page.goto('/product/review-and-findings');
  const source = page.getByRole('button', { name: 'PO · Orders!H43', exact: true });
  await source.click();
  await expect(page.getByRole('region', { name: 'Source evidence', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(source).toBeFocused();
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('dialog').getByRole('link', { name: 'IFC/SOX controls' }).click();
  await expect(page).toHaveURL(/\/solutions\/ifc-sox$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('both forms retain drafts on a failed save and report a mocked saved enquiry', async ({
  page,
}) => {
  for (const [path, endpoint, button, success] of [
    ['/book-demo', '/api/demo-booking', 'Request a demo', 'Request received.'],
    ['/support', '/api/support-ticket', 'Send message', 'Message sent.'],
  ]) {
    let saved = false;
    await page.route(`**${endpoint}`, (route) =>
      route.fulfill(
        saved
          ? { status: 201, json: { success: true } }
          : { status: 500, json: { error: 'Unable to save. Please try again.' } }
      )
    );
    await page.goto(path);
    // Exercise the hydrated form; pre-hydration draft preservation belongs to reliability QA.
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Full name').fill('Asha Rao');
    await page.getByLabel(/^(Work email|Email)$/).fill('asha@example.com');
    if (path === '/book-demo') {
      await page.getByLabel('Organisation').fill('Synthetic Example');
      await page.getByLabel('Audits run each year').selectOption('50-100');
    } else
      await page
        .getByRole('textbox', { name: 'Your question' })
        .fill('Synthetic evaluation question');
    await page.getByRole('button', { name: button, exact: true }).click();
    await expect(page.getByRole('alert').first()).toBeVisible();
    await expect(page.getByLabel('Full name')).toHaveValue('Asha Rao');
    await expect(page.getByRole('heading', { name: success, exact: true })).toHaveCount(0);
    saved = true;
    await page.getByRole('button', { name: button, exact: true }).click();
    await expect(page.getByRole('heading', { name: success, exact: true })).toBeVisible();
    await expect(page.locator('main')).not.toContainText('within one working day');
  }
});

test('touch opens evidence and restores focus in short landscape', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 768, height: 390 },
    reducedMotion: 'reduce',
  });
  await context.route('**/*', (route) => {
    const u = new URL(route.request().url());
    if (!['localhost', '127.0.0.1'].includes(u.hostname) || u.pathname.startsWith('/api/'))
      return route.abort();
    if (u.pathname.startsWith('/_vercel/')) return route.fulfill({ status: 200, body: '' });
    return route.continue();
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/product/review-and-findings');
  const source = page.getByRole('button', { name: 'PO · Orders!H43', exact: true });
  await source.tap();
  await expect(page.getByRole('region', { name: 'Source evidence', exact: true })).toContainText(
    '₹1,20,000'
  );
  await page.getByRole('button', { name: 'Return to result', exact: true }).tap();
  await expect(source).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test('all editorial pages remain useful without scripts, fonts or images', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  await context.route('**/*', (route) => {
    const u = new URL(route.request().url());
    if (
      !['127.0.0.1', 'localhost'].includes(u.hostname) ||
      ['font', 'image', 'script'].includes(route.request().resourceType()) ||
      u.pathname.startsWith('/api/')
    )
      return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  for (const r of publishedRoutes.filter((r) => r.path !== '/')) {
    await page.goto(`http://127.0.0.1:3100${r.path}`);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    if (r.path.includes('/solutions/'))
      await expect(page.locator('.trace-list')).toContainText('Original → normalised');
    if (r.path === '/product/working-papers')
      await expect(page.locator('.paper-contents')).toContainText('Draft / review incomplete');
  }
  await context.close();
});
