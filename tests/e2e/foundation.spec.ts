import { expect, test } from '@playwright/test';
import { publishedRoutes, activeRedirects } from '../../src/content/routes';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) return route.abort();
    if (url.pathname.startsWith('/api/') && route.request().method() !== 'GET') {
      // Never allow browser form checks to reach providers, even on localhost.
      return route.fulfill({ status: 201, json: { success: true } });
    }
    // Existing analytics replacement is Phase 6; keep baseline checks offline.
    if (url.pathname.startsWith('/_vercel/'))
      return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
    await route.continue();
  });
});

for (const { path } of publishedRoutes) {
  test(`existing page ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('existing redirects preserve queries; APIs and missing pages retain status codes', async ({
  request,
  page,
}) => {
  for (const redirect of activeRedirects) {
    const response = await request.get(`${redirect.source}?source=synthetic`, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(`${redirect.destination}?source=synthetic`);
  }
  for (const endpoint of ['/api/demo-booking', '/api/support-ticket'])
    expect((await request.get(endpoint)).status()).toBe(405);
  expect((await page.goto('/synthetic-missing-page'))?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible();
});

for (const width of [320, 390, 768, 1440]) {
  test(`responsive shell and forms at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of ['/', '/product', '/book-demo', '/support']) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      // Full-page screenshots do not trigger below-the-fold lazy loading.
      for (const img of await page.locator('main img').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty('complete', true);
        expect(await img.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(
          0
        );
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
        )
      ).toBe(true);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.screenshot({
        path: info.outputPath(`${path.replaceAll('/', '-') || 'home'}-${width}.png`),
        fullPage: true,
      });
      await page.screenshot({
        path: info.outputPath(`opening-${path.replaceAll('/', '-')}-${width}.png`),
      });
    }
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    if (width < 1024) {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page.getByRole('dialog').getByRole('link', { name: 'Product', exact: true }).click();
      await expect(page).toHaveURL(/\/product$/);
      await expect(page.getByRole('dialog')).toHaveCount(0);
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
    }
  });
}

test('both hydrated forms submit the existing contracts with a mocked response', async ({
  page,
}) => {
  for (const [path, button, success] of [
    ['/book-demo', 'Request a demo', 'Request received.'],
    ['/support', 'Send message', 'Message sent.'],
  ]) {
    await page.goto(path);
    await page.getByLabel('Full name').fill('Asha Rao');
    await page.getByLabel(/^(Work email|Email)$/).fill('asha@example.com');
    if (path === '/book-demo') {
      await page.getByLabel('Organisation').fill('Synthetic Example');
      await page.getByLabel('Audits run each year').selectOption('10-50');
    } else await page.getByLabel('Your question').fill('Synthetic support question');
    const request = page.waitForRequest(
      (req) => req.url().includes('/api/') && req.method() === 'POST'
    );
    await page.getByRole('button', { name: button, exact: true }).click();
    expect((await request).postDataJSON()).toMatchObject({
      fullName: 'Asha Rao',
      email: 'asha@example.com',
      _hp: '',
    });
    await expect(page.getByRole('heading', { name: success, exact: true })).toBeVisible();
  }
});

// Source/state keyboard behaviour replaces the retired workflow tabs in phase-2.spec.ts.
