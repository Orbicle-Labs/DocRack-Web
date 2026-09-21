import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as demo from '@/app/api/demo-booking/route';
import * as support from '@/app/api/support-ticket/route';
import { appendRow } from '@/lib/server/sheets';
import { sendEmail } from '@/lib/server/notify';

vi.mock('@/lib/server/sheets', () => ({ appendRow: vi.fn() }));
vi.mock('@/lib/server/notify', async (original) => ({
  ...(await original<typeof import('@/lib/server/notify')>()),
  sendEmail: vi.fn(),
}));

let identity = 0;
const cases = [
  {
    name: 'demo',
    route: demo,
    endpoint: '/api/demo-booking',
    tab: 'Demo Bookings',
    max: 3,
    window: 1200,
    payload: {
      fullName: ' Asha Rao ',
      email: 'ASHA@EXAMPLE.COM',
      companyName: ' Synthetic Example ',
      auditCount: '10-50',
      _hp: '',
    },
    row: ['Asha Rao', 'asha@example.com', 'Synthetic Example', '10-50'],
  },
  {
    name: 'support',
    route: support,
    endpoint: '/api/support-ticket',
    tab: 'Support Tickets',
    max: 5,
    window: 1800,
    payload: {
      fullName: ' Asha Rao ',
      email: 'ASHA@EXAMPLE.COM',
      message: ' Synthetic support question ',
      _hp: '',
    },
    row: ['Asha Rao', 'asha@example.com', 'Synthetic support question'],
  },
];

beforeEach(() => {
  vi.stubEnv('ALLOW_MISSING_ORIGIN', 'true');
  vi.stubEnv('FORM_INGRESS_MODE', 'verified-header');
  vi.stubEnv('RATE_LIMIT_HMAC_SECRET', 'synthetic-secret-for-test-' + ++identity);
  vi.mocked(appendRow).mockReset().mockResolvedValue();
  vi.mocked(sendEmail).mockReset().mockResolvedValue('sent');
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe.each(cases)('$name endpoint', ({ route, endpoint, tab, max, window, payload, row }) => {
  const request = (body: unknown, ip = `192.0.2.${++identity % 250}`) =>
    new NextRequest(`http://localhost${endpoint}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-docrack-client-ip': ip },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });

  it('persists exact tab/columns and normalised fields before notifying the team', async () => {
    const response = await route.POST(request(payload));
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ success: true });
    expect(appendRow).toHaveBeenCalledExactlyOnceWith(tab, [
      expect.stringMatching(/ IST$/),
      ...row,
    ]);
    expect(sendEmail).toHaveBeenCalledOnce();
    expect(vi.mocked(appendRow).mock.invocationCallOrder[0]).toBeLessThan(
      vi.mocked(sendEmail).mock.invocationCallOrder[0]
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it('accepts a filled honeypot without storage or notifications', async () => {
    const response = await route.POST(request({ _hp: 'bot' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(appendRow).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it.each(['{', 'null', '[]'])('rejects malformed or invalid JSON: %s', async (body) => {
    expect((await route.POST(request(body))).status).toBe(body === '{' ? 400 : 422);
    expect(appendRow).not.toHaveBeenCalled();
  });

  it('maps validation errors and rejects invalid names and normalises email whitespace', async () => {
    const response = await route.POST(
      request({ ...payload, fullName: 'Asha123', email: ' asha@example.com ' })
    );
    expect(response.status).toBe(422);
    expect((await response.json()).fields).toEqual(
      expect.objectContaining({ fullName: expect.any(Array) })
    );
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('does not acknowledge storage failure or attempt email', async () => {
    vi.mocked(appendRow).mockRejectedValueOnce(new Error('synthetic storage failure'));
    const response = await route.POST(request(payload));
    expect(response.status).toBe(500);
    expect(await response.text()).not.toContain('synthetic storage failure');
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('still returns 201 when notification fails after persistence', async () => {
    vi.mocked(sendEmail).mockRejectedValueOnce(new Error('synthetic email failure'));
    expect((await route.POST(request(payload))).status).toBe(201);
    expect(appendRow).toHaveBeenCalledOnce();
  });

  it('awaits storage and notification before returning success', async () => {
    let saved!: () => void;
    let notified!: (value: 'sent') => void;
    vi.mocked(appendRow).mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          saved = resolve;
        })
    );
    vi.mocked(sendEmail).mockImplementationOnce(
      () =>
        new Promise<'sent'>((resolve) => {
          notified = resolve;
        })
    );
    let finished = false;
    const pending = route.POST(request(payload)).then((response) => {
      finished = true;
      return response;
    });
    await vi.waitFor(() => expect(appendRow).toHaveBeenCalledOnce());
    expect(sendEmail).not.toHaveBeenCalled();
    expect(finished).toBe(false);
    saved();
    await vi.waitFor(() => expect(sendEmail).toHaveBeenCalledOnce());
    expect(finished).toBe(false);
    notified('sent');
    expect((await pending).status).toBe(201);
  });

  it('enforces the existing per-IP threshold, Retry-After and reset', async () => {
    vi.useFakeTimers();
    const ip = `192.0.2.${++identity % 250}`;
    for (let count = 0; count < max; count++)
      expect((await route.POST(request({ _hp: 'bot' }, ip))).status).toBe(200);
    const blocked = await route.POST(request(payload, ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get('Retry-After')).toBe(String(window));
    vi.advanceTimersByTime(window * 1000 + 1);
    expect((await route.POST(request({ _hp: 'bot' }, ip))).status).toBe(200);
  });

  it.each([
    { headers: { 'content-type': 'text/plain' }, body: payload, status: 415 },
    { headers: { origin: 'https://unapproved.example' }, body: payload, status: 403 },
    { headers: {}, body: 'a'.repeat(16385), status: 413 },
  ])('applies request guard status $status before providers', async ({ headers, body, status }) => {
    const req = request(body);
    for (const [key, value] of Object.entries(headers)) if (value) req.headers.set(key, value);
    expect((await route.POST(req)).status).toBe(status);
    expect(appendRow).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('keeps form data, provider bodies and credentials out of routine logs and responses', async () => {
    vi.mocked(appendRow).mockRejectedValue(
      new Error('private-provider-token ' + JSON.stringify(payload))
    );
    const response = await route.POST(request(payload));
    const output = (await response.text()) + JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(output).not.toMatch(/Asha|ASHA|Synthetic|private-provider-token|192\.0\.2/);
    expect(response.headers.get('X-Request-ID')).toMatch(/^[a-f0-9-]{36}$/);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('returns 405 to GET', async () => {
    expect((await route.GET()).status).toBe(405);
  });
});

it.each(['1-10', '10-50', '50-100', '100+'])('preserves demo enum %s', async (auditCount) => {
  const req = new NextRequest('http://localhost/api/demo-booking', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-docrack-client-ip': `192.0.2.${++identity % 250}`,
    },
    body: JSON.stringify({ ...cases[0].payload, auditCount }),
  });
  expect((await demo.POST(req)).status).toBe(201);
});

it('rejects an unknown audit count', async () => {
  const req = new NextRequest('http://localhost/api/demo-booking', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-docrack-client-ip': `192.0.2.${++identity % 250}`,
    },
    body: JSON.stringify({ ...cases[0].payload, auditCount: '11-50' }),
  });
  expect((await demo.POST(req)).status).toBe(422);
  expect(appendRow).not.toHaveBeenCalled();
});
