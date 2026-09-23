import { mkdirSync, writeFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { publishedRoutes, activeRedirects, sitemapRoutes } from '../../src/content/routes';
import { qaLabel } from '../../scripts/qa-artifacts.mjs';

const captureDirectory = `docs/design/${qaLabel(7)}`;

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== 'http://127.0.0.1:3100') return route.abort();
    if (route.request().method() !== 'GET') return route.abort();
    return route.continue();
  });
});

test('release crawl: canonical pages, links, fragments, structured data, media and network', async ({
  page,
  request,
}, info) => {
  test.setTimeout(240000);
  const records: unknown[] = [];
  const links = new Set<string>();
  const ids = new Map<string, string[]>();
  const external = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (r) => {
    if (new URL(r.url()).origin !== 'http://127.0.0.1:3100') external.add(r.url());
  });
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const route of publishedRoutes) {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState('networkidle');
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(descriptions.has(description!)).toBe(false);
    descriptions.add(description!);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical!).pathname).toBe(route.path);
    expect(new URL(canonical!).origin).toBe('https://docrack.ai');
    const structured = await page.locator('script[type="application/ld+json"]').allTextContents();
    for (const value of structured) {
      const parsed: unknown = JSON.parse(value);
      expect(parsed).toBeTruthy();
      expect(value).not.toMatch(/AggregateRating|ReviewAction|priceCurrency/);
    }
    ids.set(route.path, await page.locator('[id]').evaluateAll((nodes) => nodes.map((n) => n.id)));
    for (const href of await page
      .locator('a[href]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href')!))) {
      const target = new URL(href, `http://127.0.0.1:3100${route.path}`);
      expect(target.origin).toBe('http://127.0.0.1:3100');
      links.add(target.pathname + target.hash);
    }
    expect(await page.locator('a[download], a[href="#"]').count()).toBe(0);
    const imageUrl = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute('content');
    const image = await request.get(new URL(imageUrl!).pathname);
    expect(image.status()).toBe(200);
    expect(image.headers()['content-type']).toContain('image/');
    const imageBytes = await image.body();
    // PNG IHDR dimensions of the actual served social image.
    expect(imageBytes.readUInt32BE(16)).toBe(1200);
    expect(imageBytes.readUInt32BE(20)).toBe(630);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
          )
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      if (info.project.name === 'chromium') {
        mkdirSync(captureDirectory, { recursive: true });
        await page.screenshot({
          path: `${captureDirectory}/${route.path === '/' ? 'home' : route.path.slice(1).replaceAll('/', '-')}-${width}.png`,
          fullPage: true,
        });
      }
    }
    records.push({
      path: route.path,
      title,
      description,
      canonical,
      structuredDataBlocks: structured.length,
      headers: response!.headers(),
      resources: await page.evaluate(() =>
        performance.getEntriesByType('resource').map((r) => r.name)
      ),
    });
  }
  for (const href of links) {
    const target = new URL(href, 'http://127.0.0.1:3100');
    expect(ids.has(target.pathname), href).toBe(true);
    if (target.hash)
      expect(ids.get(target.pathname), href).toContain(decodeURIComponent(target.hash.slice(1)));
  }
  expect([...external]).toEqual([]);
  expect(errors).toEqual([]);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect((sitemap.match(/<loc>/g) ?? []).length).toBe(sitemapRoutes.length);
  expect(sitemap).not.toMatch(/https:\/\/docrack.ai\/(privacy|terms|api)\b/);
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('https://docrack.ai/sitemap.xml');
  const analytics = await request.get('/api/analytics-config');
  expect(await analytics.json()).toEqual({ enabled: false });
  expect(analytics.headers()['cache-control']).toContain('no-store');
  for (const redirect of activeRedirects) {
    const query = '?source=synthetic&campaign=phase7';
    const response = await request.get(redirect.source + query, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(new URL(response.headers().location, 'http://127.0.0.1:3100').pathname).toBe(
      redirect.destination
    );
    await page.goto(`${redirect.source}${query}#main-content`);
    await expect(page).toHaveURL(
      `http://127.0.0.1:3100${redirect.destination}${query}#main-content`
    );
    await expect(page.locator('#main-content')).toHaveCount(1);
  }
  for (const absent of [
    '/downloads/sample-working-paper.pdf',
    '/logos/nvidia-inception.png',
    '/logos/iit-bombay.png',
  ]) {
    expect((await request.get(absent)).status()).toBe(404);
  }
  for (const path of [
    '/',
    '/api/demo-booking',
    '/api/support-ticket',
    '/synthetic-release-missing',
    ...activeRedirects.map((r) => r.source),
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    const headers = response.headers();
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(headers['content-security-policy']).not.toMatch(/vercel|youtube|unsafe-eval/);
  }
  if (info.project.name === 'chromium')
    writeFileSync(
      `docs/qa/${qaLabel(7)}-crawl.json`,
      JSON.stringify(
        {
          pages: records,
          checkedLinks: [...links],
          externalRequests: [...external],
          pageErrors: errors,
        },
        null,
        2
      ) + '\n'
    );
});

test('native link Tab traversal reaches skip content', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test.describe('native bypass before hydration', () => {
  test.use({ javaScriptEnabled: false });
  test('Tab and Enter reach main content without JavaScript', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });
});

test('slow fonts leave readable, stable headings and reachable forms', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/*.woff2', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await route.continue();
  });
  await page.goto('/book-demo', { waitUntil: 'domcontentloaded' });
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
  // Observe settled fallback after the short optional-font block period, while
  // the font response is still delayed, then ensure arrival does not reflow it.
  await page.waitForTimeout(250);
  const before = await heading.boundingBox();
  await page.evaluate(() => document.fonts.ready);
  const after = await heading.boundingBox();
  expect(after?.width).toBeCloseTo(before!.width, 0);
  expect(after?.height).toBeCloseTo(before!.height, 0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('link', { name: 'Go to the request form' }).click();
  await expect(page.getByLabel('Full name', { exact: true })).toBeVisible();
});

test('header reserves the logo slot while its image loads across breakpoints', async ({ page }) => {
  let releaseLogo!: () => void;
  const logoReady = new Promise<void>((resolve) => (releaseLogo = resolve));
  await page.route('**/_next/image?**', async (route) => {
    await logoReady;
    await route.continue();
  });
  try {
    await page.goto('/book-demo', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true');
    for (const width of [1440, 320, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      if (width < 1024) {
        const menu = page.getByRole('button', { name: 'Open navigation' });
        await expect(menu).toBeInViewport();
        await menu.click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(menu).toBeFocused();
      }
    }
  } finally {
    releaseLogo();
  }
  await page.waitForLoadState('networkidle');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('client navigation keeps destination typography and form styling', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/book-demo');
  await page.evaluate(() => document.fonts.ready);
  const appearance = () =>
    page.getByRole('heading', { level: 1 }).evaluate((heading) => {
      const style = getComputedStyle(heading);
      return { fontSize: style.fontSize, lineHeight: style.lineHeight, color: style.color };
    });
  const direct = await appearance();
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => {
    document.documentElement.dataset.navigationProbe = 'retained';
  });
  await page.locator('header').getByRole('link', { name: 'Book a demo' }).click();
  await expect(page).toHaveURL(/\/book-demo$/);
  await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true');
  expect(await page.evaluate(() => document.documentElement.dataset.navigationProbe)).toBe(
    'retained'
  );
  expect(await appearance()).toEqual(direct);
  await page.getByRole('button', { name: 'Request a demo', exact: true }).click();
  await expect(page.getByLabel('Full name', { exact: true })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL('http://127.0.0.1:3100/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('From audit evidence');
});

for (const width of [320, 390, 768, 1024, 1280, 1440]) {
  test(`release interactive components at ${width}px`, async ({ page }) => {
    await page.setViewportSize({
      width,
      height:
        width === 320
          ? 740
          : width === 390
            ? 844
            : width === 768
              ? 900
              : width === 1440
                ? 1000
                : width === 1280
                  ? 720
                  : 768,
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    if (width < 1024) {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
    } else {
      const summary = page.locator('.nav-disclosure summary').first();
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(summary.locator('..')).toHaveAttribute('open');
      await page.keyboard.press('Escape');
      await expect(summary).toBeFocused();
      await expect(summary.locator('..')).not.toHaveAttribute('open');
    }
    for (const control of await page
      .getByRole('group', { name: 'Explore result states' })
      .getByRole('button')
      .all()) {
      await control.click();
      await expect(control).toHaveAttribute('aria-pressed', 'true');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
    await page
      .getByRole('group', { name: 'Explore result states' })
      .getByRole('button', { name: 'Fail', exact: true })
      .click();
    for (const citation of await page.locator('.source-actions button').all()) {
      await citation.focus();
      await page.keyboard.press('Enter');
      await expect(
        page.getByRole('region', { name: 'Source evidence', exact: true })
      ).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(citation).toBeFocused();
    }
    for (const source of await page
      .getByRole('group', { name: 'Evidence documents' })
      .getByRole('button')
      .all()) {
      await source.click();
      await expect(source).toHaveAttribute('aria-pressed', 'true');
    }
    for (const summary of await page.locator('main summary').all()) {
      await summary.focus();
      const wasOpen = await summary.locator('..').getAttribute('open');
      await page.keyboard.press('Enter');
      expect(await summary.locator('..').getAttribute('open')).not.toBe(wasOpen);
    }
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(axe.violations).toEqual([]);
    for (const path of ['/book-demo', '/support']) {
      await page.goto(path);
      await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true', {
        timeout: 20000,
      });
      await page.locator('button[type="submit"]').click();
      await expect(page.getByLabel('Full name', { exact: true })).toBeFocused();
      await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
    const missing = await page.goto('/synthetic-release-missing');
    expect(missing?.status()).toBe(404);
    await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations
    ).toEqual([]);
  });
}
