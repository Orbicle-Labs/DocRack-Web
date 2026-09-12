import { afterEach, beforeEach, vi } from 'vitest';

// Next enforces server-only in real builds; Vitest runs these modules in Node.
vi.mock('server-only', () => ({}));

beforeEach(() => {
  // Do not load Next env files. Even accidental unmocked provider calls fail closed.
  for (const name of [
    'GOOGLE_SHEET_ID',
    'GOOGLE_APPLICATION_CREDENTIALS',
    'RESEND_API_KEY',
    'NOTIFY_EMAIL',
    'EMAIL_FROM',
  ]) {
    vi.stubEnv(name, '');
  }
  vi.stubGlobal(
    'fetch',
    vi.fn(() => {
      throw new Error('Unmocked network request blocked in tests');
    })
  );
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
