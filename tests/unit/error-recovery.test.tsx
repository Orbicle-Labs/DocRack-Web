// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ErrorPage from '../../src/app/error';
import GlobalError from '../../src/app/global-error';

afterEach(cleanup);
for (const [name, Component, button] of [
  ['segment', ErrorPage, 'Try again'],
  ['root', GlobalError, 'Reload page'],
] as const) {
  it(`${name} error recovery hides private errors in production and retries only on activation`, () => {
    vi.stubEnv('NODE_ENV', 'production');
    const reset = vi.fn();
    render(
      <Component
        error={Object.assign(new Error('PRIVATE_PROVIDER_DETAIL'), {
          digest: 'synthetic-reference',
        })}
        reset={reset}
      />
    );
    expect(screen.queryByText('PRIVATE_PROVIDER_DETAIL')).not.toBeInTheDocument();
    expect(screen.getByText(/synthetic-reference/)).toBeVisible();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Contact the team' })).toHaveAttribute(
      'href',
      '/support'
    );
    expect(reset).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: button }));
    expect(reset).toHaveBeenCalledOnce();
  });
}
