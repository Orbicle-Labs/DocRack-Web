/** @type {import('tailwindcss').Config} */
module.exports = {
  // Dark mode is driven by the `.dark-theme` class on <body> (see useThemeStorage),
  // NOT the OS. Without this, `dark:` utilities follow prefers-color-scheme and
  // mismatch the site toggle (e.g. white text on the light-mode cream background).
  darkMode: ['class', '.dark-theme'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        header: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
    },
  },
  plugins: [],
};
