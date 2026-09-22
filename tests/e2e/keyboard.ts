import { type Locator, type Page, test } from '@playwright/test';

// Windows WebKit skips native anchors with Tab in this runner. Keep the
// dedicated native-traversal test red; let independent activation checks run.
export async function advanceToLink(page: Page, link: Locator, browserName: string) {
  if (browserName === 'webkit' && process.platform === 'win32') {
    test.info().annotations.push({
      type: 'platform-limitation',
      description:
        'Direct focus for activation coverage; native link Tab traversal is a separate unresolved test.',
    });
    await link.focus();
  } else await page.keyboard.press('Tab');
}
