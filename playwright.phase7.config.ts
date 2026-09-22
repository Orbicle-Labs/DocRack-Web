import { defineConfig, devices } from '@playwright/test';
import base from './playwright.config';

// Keep earlier screenshot evidence intact when replaying the complete regression set.
process.env.QA_PHASE = '7';
export default defineConfig({
  ...base,
  timeout: 90000,
  workers: 1,
  outputDir: 'test-results-phase7',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report-phase7' }],
    ['json', { outputFile: 'test-results-phase7/results.json' }],
  ],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
