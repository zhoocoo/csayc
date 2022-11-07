/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    'content/**/*.md'
  ],
  darkMode: 'class',
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: {
        primary: colors.gray
      }
    }
  }
}
