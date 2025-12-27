/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./styles/global.css"
  ],
  theme: {
    extend: {
      colors: {
        'main-black': '#141414',
        'soft-red': '#bf1e2e',
        'hard-red': '#b83744',
        'soft-gray': '#f0ecec',
        'hard-gray': '#d9d6d6',
        'light-gray': '#D7D7D7',
        'main-blue': '#0066CC',
        'link-blue': '#4D9FFE',
      },
      fontFamily: {
        sans: ['var(--font-assistant)', 'Arial', 'Helvetica', 'sans-serif'],
        assistant: ['var(--font-assistant)', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
