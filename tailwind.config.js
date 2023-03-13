/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './styles/**/*.{css}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*/.{svg}',
  ],
  theme: {
    extend: {
      fontFamily: {
        stamp: ['Courier', ...defaultTheme.fontFamily.sans],
        sans: ['OllieWollie', ...defaultTheme.fontFamily.sans],
        serif: ['MiniStory', ...defaultTheme.fontFamily.serif],
      },
    },
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      sizes: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
