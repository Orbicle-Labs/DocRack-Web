import { mkdirSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (!['localhost', '127.0.0.1'].includes(url.hostname)) return route.abort();
    if (route.request().method() !== 'GET') return route.abort();
    return route.continue();
  });
});

const forms = [
  {
    kind: 'demo',
    path: '/book-demo',
    endpoint: '/api/demo-booking',
    button: 'Request a demo',
    receipt: 'Request received.',
  },
  {
    kind: 'support',
    path: '/support',
    endpoint: '/api/support-ticket',
    button: 'Send message',
    receipt: 'Message sent.',
  },
] as const;
async function fill(page: Page, kind: 'demo' | 'support') {
  await page.getByLabel('Full name', { exact: true }).fill('Asha Rao');
  await page.getByLabel(/^(Work email|Email)$/).fill('asha@example.com');
  if (kind === 'demo') {
    await page.getByLabel('Organisation', { exact: true }).fill('Synthetic Example');
    await page.getByLabel('Audits run each year').selectOption('10-50');
  } else await page.getByLabel('Your question', { exact: true }).fill('Synthetic support question');
}

for (const form of forms) {
  test(`${form.kind}: retains a complete draft typed before hydration and submits the same values once`, async ({
    page,
  }) => {
    let release!: () => void;
    const scripts = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route('**/_next/**/*.js', async (route) => {
      await scripts;
      await route.continue();
    });
    const payloads: unknown[] = [];
    await page.route(`**${form.endpoint}`, async (route) => {
      payloads.push(route.request().postDataJSON());
      await route.fulfill({ status: 201, json: { success: true } });
    });
    await page.goto(form.path, { waitUntil: 'commit' });
    await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'false');
    await fill(page, form.kind);
    release();
    // This is a draft-integrity test, not a hydration speed budget. Allow cold
    // Firefox script startup on shared QA hosts; Lighthouse measures performance.
    await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true', { timeout: 20000 });
    await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('Asha Rao');
    await expect(page.getByLabel(/^(Work email|Email)$/)).toHaveValue('asha@example.com');
    await page.getByRole('button', { name: form.button, exact: true }).click();
    await expect(page.getByRole('heading', { name: form.receipt, exact: true })).toBeFocused();
    expect(payloads).toEqual([
      {
        fullName: 'Asha Rao',
        email: 'asha@example.com',
        _hp: '',
        ...(form.kind === 'demo'
          ? { companyName: 'Synthetic Example', auditCount: '10-50' }
          : { message: 'Synthetic support question' }),
      },
    ]);
  });

  test(`${form.kind}: validation, keyboard focus, storage/network failures and duplicate clicks`, async ({
    page,
  }) => {
    let status = 500;
    let count = 0;
    let release!: () => void;
    await page.route(`**${form.endpoint}`, async (route) => {
      count++;
      if (status === 0) return route.abort();
      if (status === 201)
        await new Promise<void>((resolve) => {
          release = resolve;
        });
      await route.fulfill({
        status,
        json:
          status === 422
            ? { fields: { email: ['private provider value'] } }
            : { success: status === 201 },
      });
    });
    await page.goto(form.path);
    await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true', { timeout: 20000 });
    await page.getByRole('button', { name: form.button, exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByLabel('Full name', { exact: true })).toBeFocused();
    expect(count).toBe(0);
    await fill(page, form.kind);
    for (const failure of [500, 0, 422]) {
      status = failure;
      await page.getByRole('button', { name: form.button, exact: true }).click();
      await expect(page.locator('form')).toHaveAttribute('aria-busy', 'false');
      await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('Asha Rao');
      if (failure === 422) {
        await expect(page.getByLabel(/^(Work email|Email)$/)).toBeFocused();
        await expect(page.locator('form')).not.toContainText('private provider value');
        await page.getByLabel(/^(Work email|Email)$/).fill('asha@example.com');
      } else
        await expect(page.locator('form').getByRole('alert')).toContainText(
          failure === 0 ? 'Could not reach' : 'could not confirm'
        );
    }
    status = 201;
    await page.getByRole('button', { name: form.button, exact: true }).dblclick();
    await expect(page.getByRole('button', { name: 'Sending…', exact: true })).toBeDisabled();
    expect(count).toBe(4);
    release();
    await expect(page.getByRole('heading', { name: form.receipt, exact: true })).toBeFocused();
  });

  test(`${form.kind}: mobile/tablet reflow, reduced motion and accessible feedback`, async ({
    page,
  }, info) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(form.path);
    await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true', { timeout: 20000 });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      if (info.project.name === 'chromium') {
        mkdirSync('docs/design/phase-6', { recursive: true });
        await page.screenshot({
          path: `docs/design/phase-6/${form.kind}-${width}.png`,
          fullPage: true,
        });
      }
    }
    await page.getByRole('button', { name: form.button, exact: true }).click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}

test('optional analytics sends allowlisted events through mocked transport, failures leave navigation usable', async ({
  page,
}) => {
  const events: Record<string, unknown>[] = [];
  await page.route('**/api/analytics-config', (route) =>
    route.fulfill({ json: { enabled: true, domain: 'docrack.ai' } })
  );
  await page.route('https://plausible.io/api/event', (route) => {
    expect(route.request().headers().referer).toBeUndefined();
    expect(route.request().headers().cookie).toBeUndefined();
    events.push(route.request().postDataJSON());
    return route.fulfill({ status: 202, body: '' });
  });
  const configResponse = page.waitForResponse('**/api/analytics-config');
  await page.goto('/?email=private@example.com#private');
  await configResponse;
  await page.getByRole('tab', { name: /Documents/ }).click();
  await page.getByRole('tab', { name: /Review/ }).click();
  await page.getByRole('button', { name: 'PO · Orders!H43', exact: true }).click();
  await page.locator('main a[href="/book-demo"]').first().click();
  await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true', { timeout: 20000 });
  await fill(page, 'demo');
  await page.route('**/api/demo-booking', (route) =>
    route.fulfill({ status: 201, json: { success: true } })
  );
  await page.getByRole('button', { name: 'Request a demo', exact: true }).click();
  await expect
    .poll(() => events.map((e) => e.name))
    .toEqual(
      expect.arrayContaining([
        'workflow_step_view',
        'source_open',
        'demo_cta_click',
        'demo_form_start',
        'demo_request_success',
      ])
    );
  expect(JSON.stringify(events)).not.toMatch(/private|Asha|asha|Synthetic|query|referrer/);
  await page.route('https://plausible.io/api/event', (route) => route.abort());
  await page.locator('header a[href="/book-demo"]').first().click();
  await expect(page).toHaveURL(/book-demo/);
  await page.goto('/support');
  await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true', { timeout: 20000 });
  await fill(page, 'support');
  await page.route('**/api/support-ticket', (route) =>
    route.fulfill({ status: 201, json: { success: true } })
  );
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Message sent.', exact: true })).toBeFocused();
});

test('touch and offline form journeys retain drafts and recover on both pages', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) return route.abort();
    if (route.request().method() === 'POST')
      return route.fulfill({ status: 201, json: { success: true } });
    return route.continue();
  });
  const page = await context.newPage();
  for (const form of forms) {
    await page.goto(`http://127.0.0.1:3100${form.path}`);
    await expect(page.locator('form')).toHaveAttribute('data-hydrated', 'true', { timeout: 20000 });
    await fill(page, form.kind);
    await page.route(`**${form.endpoint}`, (route) => route.abort());
    await context.setOffline(true);
    await page.getByRole('button', { name: form.button, exact: true }).tap();
    await expect(page.locator('form').getByRole('alert')).toContainText('Could not reach');
    await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('Asha Rao');
    await context.setOffline(false);
    await page.unroute(`**${form.endpoint}`);
    await page.getByRole('button', { name: form.button, exact: true }).tap();
    await expect(page.getByRole('heading', { name: form.receipt, exact: true })).toBeFocused();
  }
  await context.close();
});

test('analytics remains explicitly disabled and local headers protect HTML, redirects, API errors and 404', async ({
  page,
  request,
}) => {
  const provider: string[] = [];
  page.on('request', (req) => {
    if (req.url().includes('plausible.io')) provider.push(req.url());
  });
  await page.goto('/book-demo');
  await fill(page, 'demo');
  expect(provider).toEqual([]);
  const config = await request.get('/api/analytics-config');
  expect(await config.json()).toEqual({ enabled: false });
  for (const path of [
    '/',
    '/about',
    '/api/demo-booking',
    '/api/support-ticket',
    '/not-a-real-page',
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.headers()['x-frame-options']).toBe('DENY');
    expect(response.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(response.headers()['content-security-policy']).not.toMatch(/vercel|youtube/);
  }
});
