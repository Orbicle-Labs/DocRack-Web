import { defineConfig, devices } from '@playwright/test';
import base from './playwright.config';
export default defineConfig({
  ...base,
  testMatch: 'phase-5.spec.ts',
  timeout: 120_000,
  outputDir: 'test-results-phase5',
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report-phase5' }]],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
