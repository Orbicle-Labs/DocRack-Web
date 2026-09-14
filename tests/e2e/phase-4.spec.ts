import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { workflowSteps } from '../../src/content/pages/home';
import { publishedRoutes } from '../../src/content/routes';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (!['localhost', '127.0.0.1'].includes(url.hostname)) return route.abort();
    if (url.pathname.startsWith('/api/') && route.request().method() !== 'GET')
      return route.abort();
    if (url.pathname.startsWith('/_vercel/'))
      return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
    return route.continue();
  });
});

for (const [width, height] of [
  [1440, 1000],
  [1280, 720],
  [1024, 768],
  [768, 900],
  [390, 844],
  [320, 740],
]) {
  test(`Phase 4 complete homepage and walkthrough at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('tab', { name: '04 Review' })).toBeEnabled();
    expect(
      await page
        .locator('[data-chapter]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-chapter')))
    ).toEqual([
      'opening',
      'workflow',
      'recipe',
      'coverage',
      'use-cases',
      'output',
      'governance',
      'action',
    ]);
    await page.screenshot({ path: info.outputPath(`opening-${width}.png`) });
    if (width === 390 || width === 1280) {
      const cta = await page
        .locator('.opening-actions')
        .first()
        .getByRole('link', { name: 'Book a demo' })
        .boundingBox();
      expect(cta!.y + cta!.height).toBeLessThanOrEqual(height);
    }
    for (const step of workflowSteps) {
      const tab = page.getByRole('tab', { name: new RegExp(step.label + '$') });
      await tab.click();
      await expect(tab).toHaveAttribute('aria-selected', 'true');
      const panel = page.getByRole('tabpanel');
      await expect(panel).toHaveCount(1);
      if (step.label === 'Findings') await expect(panel).toContainText('0 confirmed exceptions');
      if (step.label === 'Working Papers')
        await expect(panel).toContainText('Draft / review incomplete');
      if (step.label === 'Review')
        await expect(panel).toContainText('Awaiting reviewer confirmation');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
    await page.getByRole('tab', { name: '04 Review' }).click();
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(axe.violations).toEqual([]);
    await page.screenshot({ path: info.outputPath(`home-${width}.png`), fullPage: true });
    for (const chapter of [
      'workflow',
      'recipe',
      'coverage',
      'use-cases',
      'output',
      'governance',
      'action',
    ]) {
      await page.locator(`[data-chapter="${chapter}"]`).screenshot({
        path: info.outputPath(`${chapter}-${width}.png`),
        style: '.site-header { visibility: hidden !important; }',
      });
    }
    const links = await page
      .locator('main a')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')!));
    for (const href of links) {
      if (href.startsWith('#')) await expect(page.locator(href)).toHaveCount(1);
      else expect(publishedRoutes.some((route) => route.path === href)).toBe(true);
    }
    await expect(page.locator('main a[download]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^Approve|^Confirm|Download/ })).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('walkthrough keyboard order, preserved record, source return and annotations', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('tab', { name: '04 Review' })).toBeEnabled();
  await page.getByRole('tab', { name: '04 Review' }).focus();
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: '01 Documents' })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: '06 Working Papers' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Draft / review incomplete');
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tabpanel')).toContainText('Not raised');
  await page.keyboard.press('ArrowLeft');
  const order = page.getByRole('button', { name: 'PO · Orders!H43', exact: true });
  await order.focus();
  await page.keyboard.press('Enter');
  const source = page.getByRole('region', { name: 'Source evidence', exact: true });
  await expect(source).toBeFocused();
  await expect(source).toContainText('₹1,20,000');
  await page.keyboard.press('Escape');
  await expect(order).toBeFocused();
  await page.getByRole('tab', { name: '01 Documents' }).click();
  await page.getByRole('tab', { name: '04 Review' }).click();
  await expect(source).toContainText('Orders!H43');
  await expect(page.locator('.review-boundary')).toContainText('Awaiting reviewer confirmation');
  const annotation = page.locator('.paper-annotation summary').nth(3);
  await annotation.focus();
  await page.keyboard.press('Space');
  await expect(page.locator('.paper-annotation').nth(3)).toHaveAttribute('open', '');
  await expect(page.locator('.paper-annotation').nth(3)).toContainText('Orders!H43');
  await page.locator('.judgement-layout summary').click();
  await expect(page.locator('.judgement-layout')).toContainText('No override has been applied');
});

test('touch source inspection and return on a phone', async ({ browser, browserName }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: browserName !== 'firefox',
  });
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return !['127.0.0.1', 'localhost'].includes(url.hostname) ||
      url.pathname.startsWith('/_vercel/')
      ? route.abort()
      : route.continue();
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/');
  const rule = page.getByRole('button', { name: 'Policy v3 · §4.2', exact: true });
  await rule.tap();
  await expect(page.locator('.policy-highlight')).toContainText('₹1');
  await page.getByRole('button', { name: 'Return to result', exact: true }).tap();
  await expect(rule).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test('all explanations survive no JavaScript, missing fonts and unavailable media', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 740 },
  });
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return !['127.0.0.1', 'localhost'].includes(url.hostname) ||
      /\.(woff2?|png|svg|jpg)$/.test(url.pathname)
      ? route.abort()
      : route.continue();
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/');
  await expect(page.locator('[data-chapter]')).toHaveCount(8);
  await page.locator('.workflow-transcript summary').click();
  for (const step of workflowSteps)
    await expect(page.locator('.workflow-transcript')).toContainText(step.text);
  await expect(page.locator('.workflow-transcript')).toContainText('Orders!H43');
  await expect(page.locator('.source-paper')).toContainText('₹1,25,000');
  await page.locator('.paper-annotation summary').nth(4).click();
  await expect(page.locator('.paper-annotation').nth(4)).toContainText('No confirmed finding');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test('reduced motion, forced colours, text zoom and short landscape reflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
  await page.setViewportSize({ width: 768, height: 390 });
  await page.goto('/');
  await page.getByRole('button', { name: 'PO · Orders!H43', exact: true }).click();
  await expect(page.locator('.source-evidence')).toBeFocused();
  await page.keyboard.press('Escape');
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  }
});
