import { beforeEach, expect, it, vi } from 'vitest';
import { appendRow } from '@/lib/server/sheets';
import { sendEmail, supportTicketEmailHtml } from '@/lib/server/notify';

const { request, getClient } = vi.hoisted(() => ({ request: vi.fn(), getClient: vi.fn() }));
vi.mock('google-auth-library', () => ({
  GoogleAuth: class {
    getClient = getClient;
  },
}));
beforeEach(() => {
  request.mockResolvedValue({});
  getClient.mockResolvedValue({ request });
});

it('does not obtain credentials when storage is unconfigured', async () => {
  await expect(appendRow('Demo Bookings', [])).rejects.toThrow('GOOGLE_SHEET_ID is not set');
  expect(getClient).not.toHaveBeenCalled();
});

it.each(['Demo Bookings', 'Support Tickets'])(
  'preserves RAW append and quoted tab contract for %s',
  async (tab) => {
    vi.stubEnv('GOOGLE_SHEET_ID', 'synthetic-sheet');
    const row = ['synthetic timestamp', 'Asha Rao', 'asha@example.com'];
    await appendRow(tab, row);
    expect(request).toHaveBeenCalledExactlyOnceWith({
      url: `https://sheets.googleapis.com/v4/spreadsheets/synthetic-sheet/values/${encodeURIComponent(`'${tab}'!A1`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      method: 'POST',
      data: { values: [row] },
    });
    expect(fetch).not.toHaveBeenCalled();
  }
);

it('skips unconfigured notification without contacting Resend', async () => {
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  await sendEmail({ from: 'synthetic@example.com', subject: 'Synthetic test', html: 'Synthetic' });
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
