import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { outcomeExamples } from '../../src/content/demos/p2p';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) return route.abort();
    if (url.pathname.startsWith('/api/') && route.request().method() !== 'GET')
      return route.fulfill({ status: 201, json: { success: true } });
    if (url.pathname.startsWith('/_vercel/'))
      return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
    await route.continue();
  });
});

for (const width of [1440, 768, 390, 320]) {
  test(`Phase 2 reviewable layouts and access at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({
      width,
      height: width === 1440 ? 1000 : width === 768 ? 900 : width === 390 ? 844 : 740,
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const [name, path] of [
      ['home', '/'],
      ['product', '/product'],
      ['demo', '/book-demo'],
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      await expect(page.locator('h1')).toBeVisible();
      await page.screenshot({ path: info.outputPath(`${name}-${width}.png`), fullPage: true });
      await page.screenshot({ path: info.outputPath(`${name}-opening-${width}.png`) });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
      if (name === 'home') {
        await page.locator('#workflow').screenshot({
          path: info.outputPath(`source-review-${width}.png`),
          style: '.site-header, .site-header * { visibility: hidden !important; }',
        });
        for (const example of outcomeExamples) {
          const control = page
            .getByRole('group', { name: 'Explore result states' })
            .getByRole('button', { name: example.outcome, exact: true });
          await control.focus();
          await page.keyboard.press('Enter');
          await expect(control).toHaveAttribute('aria-pressed', 'true');
          await expect(control).toBeFocused();
          await expect(page.locator('.result-summary')).toContainText(example.reason);
          await expect(page.locator('.source-evidence')).toContainText(
            example.outcome === 'Fail' ? 'Aranya Office Supplies' : example.source
          );
          expect(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)
          ).toBe(true);
        }
      }
      if (name === 'demo') {
        if (width < 1024) await page.getByRole('link', { name: 'Go to the request form' }).click();
        await page.getByLabel('Full name').fill('Asha Rao');
        await page.getByLabel('Work email').fill('asha@example.com');
        await page.getByLabel('Organisation').fill('Synthetic Example');
        await page.getByLabel('Audits run each year').selectOption('100+');
        await page.getByRole('button', { name: 'Request a demo', exact: true }).click();
        await expect(page.getByRole('heading', { name: 'Request received.' })).toBeVisible();
      }
    }
  });
}

test('source citations, focus return and human review boundary', async ({ page }) => {
  await page.goto('/');
  const source = page.getByRole('region', { name: 'Source evidence', exact: true });
  const order = page.getByRole('button', { name: 'PO · Orders!H43', exact: true });
  await order.focus();
  await page.keyboard.press('Enter');
  await expect(source).toBeFocused();
  await expect(source).toContainText('H43 · Amount');
  await expect(source).toContainText('₹1,20,000');
  await expect(source).toContainText('Original: “120000”');
  await page.keyboard.press('Escape');
  await expect(order).toBeFocused();
  const rule = page.getByRole('button', { name: 'Policy v3 · §4.2', exact: true });
  await rule.click();
  await expect(source).toContainText('Effective 1 April 2026');
  await page.getByRole('button', { name: 'Return to result', exact: true }).click();
  await expect(rule).toBeFocused();
  await page.getByRole('button', { name: 'Invoice · page 1', exact: true }).click();
  await expect(source.locator('.paper-highlight')).toContainText('₹1,25,000');
  await expect(page.locator('.review-boundary')).toContainText('Awaiting reviewer confirmation');
  await expect(page.getByRole('button', { name: /^Approve|^Confirm/ })).toHaveCount(0);
});

test('new navigation contains focus, resets at desktop and supports disclosures', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 600 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close navigation' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Book a demo', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close navigation' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(dialog).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  const summary = page.locator('.desktop-nav summary').first();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.nav-disclosure').first()).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(
    page.locator('.nav-panel').first().getByRole('link', { name: 'Overview', exact: true })
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(summary).toBeFocused();
  await page.goto('/product');
  const disclosure = page.locator('.disclosure summary').first();
  await disclosure.focus();
  await page.keyboard.press('Space');
  await expect(page.locator('.disclosure').first()).toHaveAttribute('open', '');
});

test('the opening and first evidence state remain readable without JavaScript or fonts', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (!['localhost', '127.0.0.1'].includes(url.hostname) || /\.(woff2?|ttf)$/.test(url.pathname))
      return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/');
  await expect(page.locator('h1')).toContainText('From audit evidence');
  await expect(page.locator('.source-paper')).toContainText('₹1,25,000');
  await expect(page.locator('.trace-caption')).toContainText('Policy v3');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
