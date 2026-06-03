/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["var(--font-outfit)", "sans-serif"],
        body:   ["var(--font-inter)", "sans-serif"],
        mono:   ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
