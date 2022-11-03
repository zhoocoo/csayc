/** @type {import('tailwindcss').Config} */
/**import { colors } from 'windicss/colors';
 *
 * 本文件修改后，需要重启后，方能生效
 */
module.exports = {
  theme: {
    extend: {},
  },
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  // plugins: [require("@tailwindcss/line-clamp")],
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {},
  //     },
  //     "dark",
  //     "cupcake",
  //   ],
  // },
};
