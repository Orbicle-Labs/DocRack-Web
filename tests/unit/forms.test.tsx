// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { DemoForm } from '@/components/forms/DemoForm';
import { SupportForm } from '@/components/forms/SupportForm';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
afterEach(cleanup);

describe.each([
  {
    name: 'demo',
    Form: DemoForm,
    endpoint: '/api/demo-booking',
    button: 'Request a demo',
    success: 'Request received.',
  },
  {
    name: 'support',
    Form: SupportForm,
    endpoint: '/api/support-ticket',
    button: 'Send message',
    success: 'Message sent.',
  },
])('$name form', ({ name, Form, endpoint, button, success }) => {
  async function fill() {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Full name'), 'Asha Rao');
    await user.type(screen.getByLabelText(/^(Work email|Email)$/), 'asha@example.com');
    if (name === 'demo') {
      await user.type(screen.getByLabelText('Organisation'), 'Synthetic Example');
      await user.selectOptions(screen.getByLabelText('Audits run each year'), '10-50');
    } else await user.type(screen.getByLabelText('Your question'), 'Synthetic support question');
    return user;
  }

  it('focuses invalid fields and makes no request', async () => {
    render(<Form />);
    await userEvent.click(screen.getByRole('button', { name: button }));
    await waitFor(() => expect(screen.getByLabelText('Full name')).toHaveFocus());
    expect(fetch).not.toHaveBeenCalled();
  });

  it('posts the established payload, prevents duplicate clicks and shows success', async () => {
    let resolve!: (response: Response) => void;
    vi.mocked(fetch).mockImplementation(
      () =>
        new Promise<Response>((done) => {
          resolve = done;
        })
    );
    render(<Form />);
    const user = await fill();
    await user.dblClick(screen.getByRole('button', { name: button }));
    expect(fetch).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    const [url, options] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe(endpoint);
    expect(options?.method).toBe('POST');
    expect(JSON.parse(options?.body as string)).toEqual({
      fullName: 'Asha Rao',
      email: 'asha@example.com',
      _hp: '',
      ...(name === 'demo'
        ? { companyName: 'Synthetic Example', auditCount: '10-50' }
        : { message: 'Synthetic support question' }),
    });
    resolve(Response.json({ success: true }, { status: 201 }));
    expect(await screen.findByRole('heading', { name: success })).toBeVisible();
  });

  it('maps server field errors, focuses the field and retains the draft', async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json(
        { error: 'Invalid form data.', fields: { email: ['Synthetic email validation error'] } },
        { status: 422 }
      )
    );
    render(<Form />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: button }));
    expect(await screen.findByText('Synthetic email validation error')).toBeVisible();
    expect(screen.getByLabelText(/^(Work email|Email)$/)).toHaveFocus();
    expect(screen.getByLabelText('Full name')).toHaveValue('Asha Rao');
  });

  it('explains Retry-After and retains the draft', async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({}, { status: 429, headers: { 'Retry-After': '214' } })
    );
    render(<Form />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: button }));
    expect(await screen.findByRole('alert')).toHaveTextContent('in 4 minutes');
    expect(screen.getByLabelText('Full name')).toHaveValue('Asha Rao');
  });

  it('retains the draft after a network failure and allows retry', async () => {
    vi.mocked(fetch).mockRejectedValue(new TypeError('synthetic offline'));
    render(<Form />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: button }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not reach the server');
    expect(screen.getByLabelText('Full name')).toHaveValue('Asha Rao');
    expect(screen.getByRole('button', { name: button })).toBeEnabled();
  });
});
