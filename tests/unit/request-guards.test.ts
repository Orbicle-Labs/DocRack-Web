import { expect, it, vi } from 'vitest';
import { BODY_LIMIT, clientIdentity, guardHeaders, readJson } from '@/lib/server/request-guards';

function request(headers: Record<string, string> = {}, body = '{}') {
  return new Request('https://docrack.ai/api/demo-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body,
  });
}
it('requires configured exact origins, never Host or a forwarded-host', () => {
  vi.stubEnv('FORM_ALLOWED_ORIGINS', 'https://docrack.ai,https://staging.example.com');
  for (const origin of ['https://docrack.ai', 'https://staging.example.com'])
    expect(() => guardHeaders(request({ origin }))).not.toThrow();
  for (const origin of [
    'null',
    'https://docrack.ai.evil.example',
    'https://docrack.ai/',
    'http://docrack.ai',
  ])
    expect(() => guardHeaders(request({ origin, 'x-forwarded-host': 'docrack.ai' }))).toThrow(
      'origin'
    );
});
it('makes nonbrowser missing-Origin support explicit and keeps fetch-site cross-site rejected', () => {
  expect(() => guardHeaders(request())).toThrow('origin');
  vi.stubEnv('ALLOW_MISSING_ORIGIN', 'true');
  expect(() => guardHeaders(request())).not.toThrow();
  expect(() => guardHeaders(request({ 'sec-fetch-site': 'cross-site' }))).toThrow('origin');
});
it.each(['text/plain', 'application/x-www-form-urlencoded', 'multipart/form-data'])(
  'rejects %s bodies',
  (type) => {
    expect(() => guardHeaders(request({ 'content-type': type }))).toThrow('JSON');
  }
);
it('ignores arbitrary forwarded identities unless the dedicated ingress mode is configured', () => {
  const a = clientIdentity(
    request({
      'x-forwarded-for': '192.0.2.1',
      'x-real-ip': '192.0.2.2',
      'x-docrack-client-ip': '192.0.2.3',
    })
  );
  const b = clientIdentity(request({ 'x-forwarded-for': '192.0.2.9' }));
  expect(a).toEqual(b);
  expect(a.verified).toBe(false);
  vi.stubEnv('FORM_INGRESS_MODE', 'verified-header');
  expect(clientIdentity(request({ 'x-docrack-client-ip': '192.0.2.3' }))).toEqual({
    identity: '192.0.2.3',
    verified: true,
  });
  expect(clientIdentity(request({ 'x-docrack-client-ip': '192.0.2.3, 192.0.2.4' })).verified).toBe(
    false
  );
  expect(clientIdentity(request({ 'x-docrack-client-ip': '2001:db8:0:0:0:0:0:1' }))).toEqual(
    clientIdentity(request({ 'x-docrack-client-ip': '2001:db8::1' }))
  );
});
it('accepts the exact byte bound and rejects one extra byte, including a false Content-Length', async () => {
  expect(await readJson(request({}, JSON.stringify('a'.repeat(BODY_LIMIT - 2))))).toHaveLength(
    BODY_LIMIT - 2
  );
  await expect(
    readJson(request({ 'content-length': '1' }, JSON.stringify('a'.repeat(BODY_LIMIT))))
  ).rejects.toMatchObject({ status: 413 });
  await expect(
    readJson(request({ 'content-length': String(BODY_LIMIT + 1) }))
  ).rejects.toMatchObject({ status: 413 });
});
it('stops reading chunked multibyte bodies as soon as the byte limit is exceeded', async () => {
  const cancel = vi.fn();
  let pulls = 0;
  const stream = new ReadableStream({
    pull(c) {
      pulls++;
      c.enqueue(new TextEncoder().encode('₹'.repeat(3000)));
    },
    cancel,
  });
  const req = new Request('https://docrack.ai', {
    method: 'POST',
    body: stream,
    duplex: 'half',
  } as RequestInit);
  await expect(readJson(req)).rejects.toMatchObject({ status: 413 });
  expect(cancel).toHaveBeenCalledOnce();
  expect(pulls).toBeLessThanOrEqual(3);
});
it('bounds a stalled body read and cancels the stream', async () => {
  vi.useFakeTimers();
  const cancel = vi.fn();
  const req = new Request('https://docrack.ai', {
    method: 'POST',
    body: new ReadableStream({ cancel }),
    duplex: 'half',
  } as RequestInit);
  const pending = expect(readJson(req)).rejects.toMatchObject({ status: 400 });
  await vi.advanceTimersByTimeAsync(5000);
  await pending;
  expect(cancel).toHaveBeenCalledOnce();
});
it('rejects interrupted bodies without reflecting error text', async () => {
  const req = new Request('https://docrack.ai', {
    method: 'POST',
    body: new ReadableStream({
      start(c) {
        c.error(new Error('private'));
      },
    }),
    duplex: 'half',
  } as RequestInit);
  await expect(readJson(req)).rejects.toThrow('Invalid request body.');
});
