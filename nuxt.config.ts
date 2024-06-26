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
  build: {
    transpile: ['gsap']
  },
  // https://content.nuxtjs.org
  content: {
    documentDriven: {
      layoutFallbacks: ['theme'],
      globals: {
        theme: {
          where: [
            {
              _id: 'content:_theme.yml'
            }
          ],
          without: ['_']
        }
      }
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'slack-dark'
    }
  },
  typescript: {
    shim: false
  },
  nitro: {
    preset: 'node-server'
  },
  css: ['~/assets/css/common.css'],
  app: {
    head: {
      title: '跑不快的代码-COOL前端-赵聪聪个人博客',
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0,viewport-fit=cover,user-scalable=no'
        },
        {
          name: 'description',
          content:
            'COOL前端-官方博客，赵聪聪的个人博客，学习并分享前端技术等WEB知识，记录生活的点点滴滴，是一个互联网从业者值得收藏的网站。'
        },
        {
          name: 'keywords',
          content: '个人博客模板,前端技术分享,前端技术网站,web前端技术,模板分享'
        }
      ],
      link: [],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        { src: '/js/um.js' }
        // { src: 'https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js' }
      ]
    }
  }
})
