import { beforeEach, expect, it, vi } from 'vitest';
import { appendRow } from '@/lib/server/sheets';
import { sendEmail, supportTicketEmailHtml } from '@/lib/server/notify';
const { getClient, getRequestHeaders } = vi.hoisted(() => ({
  getClient: vi.fn(),
  getRequestHeaders: vi.fn(),
}));
vi.mock('google-auth-library', () => ({
  GoogleAuth: class {
    getClient = getClient;
  },
}));
beforeEach(() => {
  getClient.mockResolvedValue({ getRequestHeaders });
  getRequestHeaders.mockResolvedValue(new Headers({ Authorization: 'Bearer synthetic-token' }));
});
it('does not obtain credentials when storage is unconfigured', async () => {
  await expect(appendRow('Demo Bookings', [])).rejects.toThrow('configuration');
  expect(getClient).not.toHaveBeenCalled();
});
it.each(['Demo Bookings', 'Support Tickets'])(
  'preserves RAW append and fixed row for %s without retries',
  async (tab) => {
    vi.stubEnv('GOOGLE_SHEET_ID', 'synthetic-sheet');
    vi.mocked(fetch).mockResolvedValue(Response.json({}));
    const row = ['synthetic timestamp', '=example', 'asha@example.com'];
    await appendRow(tab, row);
    expect(fetch).toHaveBeenCalledExactlyOnceWith(
      `https://sheets.googleapis.com/v4/spreadsheets/synthetic-sheet/values/${encodeURIComponent(`'${tab}'!A1`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      expect.objectContaining({
        method: 'POST',
        redirect: 'error',
        signal: expect.any(AbortSignal),
        body: JSON.stringify({ values: [row] }),
      })
    );
  }
);
it('bounds credential acquisition and never appends after late credentials arrive', async () => {
  vi.useFakeTimers();
  vi.stubEnv('GOOGLE_SHEET_ID', 'synthetic-sheet');
  let resolve!: (value: unknown) => void;
  getClient.mockReturnValue(
    new Promise((done) => {
      resolve = done;
    })
  );
  const pending = expect(appendRow('Demo Bookings', [])).rejects.toThrow('timeout');
  await vi.advanceTimersByTimeAsync(8000);
  await pending;
  resolve({ getRequestHeaders });
  await Promise.resolve();
  expect(fetch).not.toHaveBeenCalled();
});
it.each(['sheets', 'notification'])(
  'aborts %s at the provider deadline and does not retry ambiguous writes',
  async (provider) => {
    vi.useFakeTimers();
    vi.stubEnv('GOOGLE_SHEET_ID', 'synthetic-sheet');
    vi.stubEnv('RESEND_API_KEY', 'synthetic-key');
    vi.stubEnv('NOTIFY_EMAIL', 'team@example.com');
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));
    const pending = expect(
      provider === 'sheets'
        ? appendRow('Demo Bookings', [])
        : sendEmail({ from: 'test@example.com', subject: 'test', html: 'test' })
    ).rejects.toThrow('timeout');
    await vi.advanceTimersByTimeAsync(provider === 'sheets' ? 8000 : 4000);
    await pending;
    expect(fetch).toHaveBeenCalledOnce();
    expect(vi.mocked(fetch).mock.calls[0][1]?.signal?.aborted).toBe(true);
  }
);
it('skips fully unconfigured notifications; rejects partial config without network', async () => {
  const email = { from: 'test@example.com', subject: 'test', html: 'test' };
  expect(await sendEmail(email)).toBe('skipped');
  vi.stubEnv('RESEND_API_KEY', 'synthetic-key');
  await expect(sendEmail(email)).rejects.toThrow('configuration');
  expect(fetch).not.toHaveBeenCalled();
});
it('sends only to the configured internal destination and honours sender override', async () => {
  vi.stubEnv('RESEND_API_KEY', 'synthetic-key');
  vi.stubEnv('NOTIFY_EMAIL', 'team@example.com');
  vi.stubEnv('EMAIL_FROM', 'website@example.com');
  vi.mocked(fetch).mockResolvedValue(Response.json({ id: 'synthetic' }));
  await sendEmail({ from: 'fallback@example.com', subject: 'Synthetic test', html: 'Synthetic' });
  expect(JSON.parse(vi.mocked(fetch).mock.calls[0][1]?.body as string)).toEqual({
    from: 'website@example.com',
    to: ['team@example.com'],
    subject: 'Synthetic test',
    html: 'Synthetic',
  });
});
it.each(['sheets', 'notification'])(
  'does not read or expose a %s failure body',
  async (provider) => {
    vi.stubEnv('GOOGLE_SHEET_ID', 'synthetic-sheet');
    vi.stubEnv('RESEND_API_KEY', 'synthetic-key');
    vi.stubEnv('NOTIFY_EMAIL', 'team@example.com');
    const response = Response.json({ secret: 'synthetic-private-value' }, { status: 503 });
    const read = vi.spyOn(response, 'text');
    vi.mocked(fetch).mockResolvedValue(response);
    const pending =
      provider === 'sheets'
        ? appendRow('Demo Bookings', [])
        : sendEmail({ from: 'test@example.com', subject: 'test', html: 'test' });
    await expect(pending).rejects.toThrow('provider');
    expect(read).not.toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledOnce();
  }
);
it('escapes visitor text in internal email HTML', () => {
  const html = supportTicketEmailHtml({
    fullName: '<script>example</script>',
    email: 'asha@example.com',
    message: '<img src=x> & "example"',
    submittedAt: new Date('2026-09-11T00:00:00Z'),
  });
  expect(html).not.toContain('<script>');
  expect(html).not.toContain('<img src=x>');
  expect(html).toContain('&lt;img src=x&gt;');
});
