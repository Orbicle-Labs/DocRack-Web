import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { fixtures } from '../../src/content/demos/fixtures';
import { assets } from '../../src/content/assets';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.protocol === 'file:') return route.continue();
    if (!['localhost', '127.0.0.1'].includes(url.hostname)) return route.abort();
    if (url.pathname.startsWith('/api/')) return route.abort();
    if (url.pathname.startsWith('/_vercel/'))
      return route.fulfill({ contentType: 'text/javascript', body: '' });
    return route.continue();
  });
});
for (const width of [1440, 768, 390, 320]) {
  test(`Phase 3 illustrative evidence, reflow and access at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(pathToFileURL(resolve('docs/design/phase-3/index.html')).href);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    for (const f of Object.values(fixtures)) {
      const scene = page.locator(`#${f.id}-review`);
      await expect(scene).toContainText(f.expected);
      await expect(scene).toContainText(f.actual);
      await expect(scene).toContainText(f.run);
      await expect(scene).toContainText(f.workingPaper);
      for (const t of f.traces) await expect(scene).toContainText(t.location);
    }
    for (const scene of assets.filter((a) => 'fixture' in a)) {
      await page
        .locator(`#${scene.id}`)
        .screenshot({ path: info.outputPath(`${scene.id}-${width}.png`) });
    }
    await page.getByRole('link', { name: 'p2p-review', exact: true }).focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'credit-review', exact: true })).toBeFocused();
    expect(
      await page
        .getByRole('link', { name: 'credit-review', exact: true })
        .evaluate((el) => getComputedStyle(el).outlineStyle)
    ).toBe('solid');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#credit-review$/);
    await expect(page.locator('#credit-review')).toBeFocused();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
test('new assets and social image resolve on the production website', async ({ page, request }) => {
  for (const asset of assets) {
    for (const file of 'variants' in asset ? asset.variants : [asset]) {
      const response = await request.get(file.src);
      expect(response.status()).toBe(200);
      if ('bytes' in file) expect((await response.body()).byteLength).toBe(file.bytes);
    }
  }
  const og = await request.get('/opengraph-image');
  expect(og.status()).toBe(200);
  expect(og.headers()['content-type']).toContain('image/png');
  await page.goto('/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /opengraph-image/
  );
});
