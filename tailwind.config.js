// Tailwind's own default stacks, inlined rather than imported — the ESLint
// config forbids require() and this file must stay CommonJS.
const SANS_FALLBACK = [
  'ui-sans-serif',
  'system-ui',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

const MONO_FALLBACK = [
  'ui-monospace',
  'SFMono-Regular',
  'Menlo',
  'Monaco',
  'Consolas',
  '"Liberation Mono"',
  '"Courier New"',
  'monospace',
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  // No `darkMode` key on purpose. The site is light-only at launch, so
  // declaring a dark strategy would advertise a capability that doesn't
  // exist and invite `dark:` utilities that silently never fire.
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Colours resolve to the custom properties declared in app/globals.css,
      // which is the single source of truth for the hex values. Referencing
      // them here is what makes `bg-canvas` / `text-ink` real utilities that
      // Tailwind's JIT can see and purge.
      //
      // Caveat: var()-based colours don't support the opacity modifier, so
      // `bg-brand/50` won't work. Use an explicit token instead.
      colors: {
        ink: 'var(--color-ink)',
        navy: 'var(--color-navy)',
        brand: 'var(--color-brand)',
        'brand-hover': 'var(--color-brand-hover)',
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        // Named `line`, not `border` — a colour key called `border` would
        // produce the unreadable `border-border`.
        line: 'var(--color-border)',
        'line-strong': 'var(--color-border-strong)',
        muted: 'var(--color-muted)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        // Darker variants for text sitting on the matching status tint —
        // the base values fail AA there. See the note in globals.css.
        'success-text': 'var(--color-success-text)',
        'warning-text': 'var(--color-warning-text)',
        'danger-text': 'var(--color-danger-text)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...SANS_FALLBACK],
        mono: ['var(--font-jetbrains)', ...MONO_FALLBACK],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        button: 'var(--radius-button)',
      },
      maxWidth: {
        content: 'var(--content-width)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 20, 28, 0.04), 0 8px 24px rgba(16, 20, 28, 0.06)',
        frame: '0 2px 4px rgba(16, 20, 28, 0.04), 0 24px 56px rgba(16, 20, 28, 0.12)',
      },
    },
  },
  plugins: [],
};
