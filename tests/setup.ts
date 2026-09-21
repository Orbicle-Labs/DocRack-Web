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
    'FIRESTORE_PROJECT_ID',
    'FIRESTORE_DATABASE_ID',
    'FIRESTORE_EMULATOR_HOST',
    'RATE_LIMIT_HMAC_SECRET',
    'FORM_INGRESS_MODE',
    'FORM_ALLOWED_ORIGINS',
    'ALLOW_MISSING_ORIGIN',
    'ANALYTICS_ENABLED',
    'ANALYTICS_PROCESSING_APPROVED',
    'PLAUSIBLE_DOMAIN',
    'SITE_ENVIRONMENT',
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
