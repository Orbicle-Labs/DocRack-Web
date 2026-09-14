import { defineConfig, devices } from '@playwright/test';
import base from './playwright.config';

/** Focused homepage checks; the retained full regression suite uses the default config. */
export default defineConfig({
  ...base,
  testMatch: 'phase-4.spec.ts',
  outputDir: 'test-results-phase4',
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report-phase4' }]],
  projects: [
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
