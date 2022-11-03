// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  typescript: {
    shim: false,
  },
  buildModules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss"],
  nitro: {
    preset: "node-server",
  },
  css: ["~/assets/css/common.css", "~/assets/css/tailwind.css"],
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0,viewport-fit=cover",
        },
      ],
      link: [],
      script: [],
    },
  },
});
