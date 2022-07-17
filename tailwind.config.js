/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
        'serif': ['MoonlessSC', ...defaultTheme.fontFamily.serif],
      },
    },
    container: {
      center: true,
      sizes: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      }
    }
  },
  plugins: [require('@tailwindcss/typography'),],
}
