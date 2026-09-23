import { type Locator, type Page, test } from '@playwright/test';

// Windows WebKit skips ordinary links in its default link-tab mode. The skip
// link is tested with real Tab; this helper covers other links' activation only.
export async function advanceToLink(page: Page, link: Locator, browserName: string) {
  if (browserName === 'webkit' && process.platform === 'win32') {
    test.info().annotations.push({
      type: 'platform-limitation',
      description:
        'Direct focus for ordinary-link activation in Windows WebKit; not native traversal coverage.',
    });
    await link.focus();
  } else await page.keyboard.press('Tab');
}
