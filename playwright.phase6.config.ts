import { defineConfig, devices } from '@playwright/test';
import base from './playwright.config';
export default defineConfig({
  ...base,
  testMatch: 'phase-6.spec.ts',
  timeout: 60000,
  outputDir: 'test-results-phase6',
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report-phase6' }]],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
