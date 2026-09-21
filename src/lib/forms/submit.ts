import { track } from '@/lib/analytics/client';

export interface SubmitFailure {
  message: string;
  fields?: Record<string, string>;
  rateLimited?: boolean;
}
export type SubmitResult = { ok: true } | { ok: false; failure: SubmitFailure };
const fieldMessages: Record<string, string> = {
  fullName: 'Check your full name.',
  email: 'Check your email address.',
  companyName: 'Check your organisation name.',
  auditCount: 'Select a range.',
  message: 'Check your message (10–5000 characters).',
};

export async function submitForm(
  endpoint: '/api/demo-booking' | '/api/support-ticket',
  payload: Record<string, string>
): Promise<SubmitResult> {
  const form = endpoint === '/api/demo-booking' ? 'demo' : 'support';
  function fail(
    errorClass: 'validation' | 'network' | 'storage' | 'rate-limit' | 'request',
    failure: SubmitFailure
  ): SubmitResult {
    track({ name: 'form_error', props: { form, errorClass } });
    return { ok: false, failure };
  }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    });
    let json: Record<string, unknown> = {};
    try {
      const value: unknown = await res.json();
      if (value && typeof value === 'object') json = value as Record<string, unknown>;
    } catch {
      /* safe generic failure below */
    }
    if (res.status === 201 && json.success === true) {
      if (form === 'demo') track({ name: 'demo_request_success', props: { page: '/book-demo' } });
      else track({ name: 'support_request_success', props: { page: '/support' } });
      return { ok: true };
    }
    if (res.status === 429) {
      const seconds = Number(res.headers.get('Retry-After'));
      const minutes = Math.ceil(seconds / 60);
      const wait =
        seconds > 0 && seconds <= 1800
          ? seconds <= 90
            ? `${seconds} seconds`
            : `${minutes} minute${minutes === 1 ? '' : 's'}`
          : 'a few minutes';
      return fail('rate-limit', {
        message: `Too many submissions from this network. Please try again in ${wait}.`,
        rateLimited: true,
      });
    }
    if (res.status === 422) {
      const fields: Record<string, string> = {};
      if (json.fields && typeof json.fields === 'object')
        for (const name of Object.keys(json.fields))
          if (Object.hasOwn(fieldMessages, name)) fields[name] = fieldMessages[name];
      return fail('validation', { message: 'Please correct the highlighted fields.', fields });
    }
    if (res.status === 413)
      return fail('request', {
        message: 'This request is too large. Shorten your message and try again.',
      });
    if (res.status === 403 || res.status === 415)
      return fail('request', {
        message: 'This request could not be accepted. Reload this page and try again.',
      });
    return fail('storage', {
      message:
        'We could not confirm receipt. Your details are still here. A retry may send a duplicate.',
    });
  } catch {
    return fail('network', {
      message:
        'Could not reach the server. Check your connection. Your details are still here; a retry may send a duplicate.',
    });
  }
}
