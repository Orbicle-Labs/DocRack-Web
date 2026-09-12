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
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ROLES ARE VARS, PIGMENTS ARE HEX.
      //
      // A role (ink, accent, muted, line) is a custom property so `Section`
      // can flip it per tone. A pigment (brand-150, neutral-200) is literal
      // hex, because a tint is a fixed colour, not a role — and literal hex
      // is the only form Tailwind's opacity modifier can decompose.
      //
      // Never write `bg-brand/10`: brand is a var and the modifier silently
      // produces nothing. Use the ramp instead.
      colors: {
        ink: { DEFAULT: 'var(--color-ink)', 900: '#10141c', 800: '#2a3140', 700: '#444d5d' },
        navy: 'var(--color-navy)',
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          onInk: 'var(--color-brand-on-ink)',
          50: '#f6f8fe',
          100: '#f2f5fd',
          150: '#eaeefb', // brand text on this = 5.34:1
          200: '#dde4f9',
          300: '#cbd6f6',
          400: '#a9bbf0',
        },
        accent: { DEFAULT: 'var(--color-accent)', hover: 'var(--color-accent-hover)' },
        canvas: 'var(--color-canvas)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
        },
        // Named `line`, not `border` — a colour key called `border` would
        // produce the unreadable `border-border`.
        line: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
          interactive: 'var(--color-border-interactive)',
        },
        muted: 'var(--color-muted)',
        neutral: {
          25: '#fbfcfd',
          50: '#f6f7f9',
          100: '#eef0f4',
          200: '#dfe3ea',
          300: '#c3cbd8',
          400: '#9aa3b4',
          500: '#737e91',
          600: '#5b6577',
          700: '#444d5d',
          800: '#2a3140',
          900: '#10141c',
        },
        // *-strong variants clear AA on their own tint; the base §8 values do
        // not. Named `strong`, not `text` — `text-danger-text` reads badly and
        // is easy to mistake for a size token.
        success: {
          DEFAULT: 'var(--color-success)',
          strong: 'var(--color-success-text)',
          100: '#e8f3ed',
          300: '#b9dcc7',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          strong: 'var(--color-warning-text)',
          100: '#f8efe0',
          300: '#e8cfa3',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          strong: 'var(--color-danger-text)',
          100: '#f9ebec',
          300: '#eec2c5',
        },
      },

      // Tracking and line-height are baked into each size. A single blanket
      // tracking value is correct at ~32px, far too loose at 60 and too tight
      // at 18 — which is exactly how "large looks loose, small looks cramped"
      // happens. clamp() means one class covers every breakpoint.
      fontSize: {
        display: [
          'clamp(2.5rem, 1.982rem + 2.21vw, 3.75rem)',
          { lineHeight: '1.04', letterSpacing: '-0.030em', fontWeight: '600' },
        ],
        h1: [
          'clamp(2.125rem, 1.762rem + 1.55vw, 3rem)',
          { lineHeight: '1.08', letterSpacing: '-0.026em', fontWeight: '600' },
        ],
        h2: [
          'clamp(1.75rem, 1.336rem + 1.77vw, 2.75rem)',
          { lineHeight: '1.12', letterSpacing: '-0.022em', fontWeight: '600' },
        ],
        h3: [
          'clamp(1.3125rem, 1.131rem + 0.77vw, 1.75rem)',
          { lineHeight: '1.24', letterSpacing: '-0.018em', fontWeight: '600' },
        ],
        h4: [
          'clamp(1.0625rem, 0.985rem + 0.33vw, 1.25rem)',
          { lineHeight: '1.35', letterSpacing: '-0.013em', fontWeight: '600' },
        ],
        lead: [
          'clamp(1.0625rem, 0.985rem + 0.33vw, 1.25rem)',
          { lineHeight: '1.50', letterSpacing: '-0.010em' },
        ],
        'body-lg': [
          'clamp(1rem, 0.948rem + 0.22vw, 1.125rem)',
          { lineHeight: '1.60', letterSpacing: '-0.006em' },
        ],
        body: ['1rem', { lineHeight: '1.65', letterSpacing: '-0.002em' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.60', letterSpacing: '0' }],
        caption: ['0.8125rem', { lineHeight: '1.45', letterSpacing: '0.004em' }],
        label: ['0.75rem', { lineHeight: '1.20', letterSpacing: '0.08em', fontWeight: '600' }],
        'mono-sm': ['0.75rem', { lineHeight: '1.45', letterSpacing: '-0.005em' }],
        'mono-xs': ['0.6875rem', { lineHeight: '1.40', letterSpacing: '0' }],
      },

      fontFamily: {
        sans: ['var(--font-inter)', ...SANS_FALLBACK],
        mono: ['var(--font-jetbrains)', ...MONO_FALLBACK],
      },

      borderRadius: {
        card: 'var(--radius-card)',
        button: 'var(--radius-button)',
        frame: 'var(--radius-frame)',
      },

      maxWidth: {
        content: 'var(--content-width)',
        prose: 'var(--measure-prose)',
      },

      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        4: 'var(--shadow-4)',
        hairline: 'var(--edge-hairline)',
        raised: 'var(--edge-light), var(--edge-hairline), var(--shadow-1)',
        frame: 'var(--edge-hairline), var(--shadow-3)',
        hero: 'var(--edge-hairline), var(--shadow-4)',
        key: 'var(--edge-key), 0 1px 2px rgba(16, 20, 28, 0.20)',
        'key-hover': 'var(--edge-key), 0 2px 6px rgba(40, 85, 217, 0.26)',
        press: 'inset 0 1px 2px rgba(16, 20, 28, 0.16)',
      },

      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },

      transitionDuration: {
        fast: '120ms',
        base: '160ms',
        slow: '220ms',
      },

      backgroundImage: {
        'page-top': 'var(--gradient-page-top)',
        'ink-grad': 'var(--gradient-ink)',
        hairline: 'var(--gradient-hairline)',
      },
    },
  },
  plugins: [],
};
