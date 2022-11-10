// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon'
  ],
  // https://color-mode.nuxtjs.org
  colorMode: {
    classSuffix: ''
  },
  // https://content.nuxtjs.org
  content: {
    documentDriven: true,
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'dracula'
    }
  },
  typescript: {
    shim: false
  },
  buildModules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'node-server'
  },
  css: ['~/assets/css/common.css'],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0,viewport-fit=cover'
        }
      ],
      link: [],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        { src: '/js/um.js' }
      ]
    }
  }
})
