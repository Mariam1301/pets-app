/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'custom-blue': '#243c5a',
        'custom-pink': '#ff49db',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
