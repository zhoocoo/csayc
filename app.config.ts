export default defineAppConfig({
  cover: '/img/cover.jpg',
  socials: {}
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    cover?: string,
    socials?: {
      twitter?: string
      github?: string
    }
  }
}
