import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'next-env.d.ts',
    '.local-tools/**',
    '.claude/**',
    'playwright-report/**',
    'test-results/**',
    'test-results-phase4/**',
    'test-results-phase5/**',
    'test-results-phase6/**',
    'playwright-report-phase6/**',
    'playwright-report-phase5/**',
    'playwright-report-phase4/**',
  ]),
  {
    rules: {
      'no-duplicate-imports': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['src/content/**/*.{ts,tsx}', 'src/lib/forms/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/lib/server/*', '**/server/*'],
              message: 'Public content and form helpers must not import server integrations.',
            },
          ],
        },
      ],
    },
  },
]);
