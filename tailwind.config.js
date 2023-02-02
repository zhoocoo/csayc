// import colors from 'tailwindcss/colors'
// const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    'content/**/*.md'
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: colors.gray
  //     }
  //   }
  // },
  daisyui: {}
}
