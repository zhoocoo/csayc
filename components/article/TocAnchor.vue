<template>
  <div class="tocAnchor">
    <ul v-if="toc && toc.links">
      <li
        v-for="link in toc.links"
        :key="link.text"
        class="my-3 first:mt-0 last:mb-0"
      >
        <a
          :href="`#${link.id}`"
          data-link-type="first"
          class="block leading-6"
          :class="{
            activeLink: activeToc === `#${link.id}`
          }"
        >
          {{ link.text }}
        </a>
        <ul v-if="link.children" class="pl-6">
          <li
            v-for="sublink in link.children"
            :key="sublink.text"
            class="my-3 last:mb-0"
          >
            <a
              :href="`#${sublink.id}`"
              class="block leading-6"
              :class="{
                activeLink: activeToc === `#${sublink.id}`,
                subactiveLink: activeToc === `#${sublink.id}`
              }"
              data-link-type="second"
            >
              {{ sublink.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouteHash } from '@vueuse/router'
const { toc } = useContent()

const search = useRouteHash()

const activeToc = ref()
if (process.client) {
  window.addEventListener('scroll', (e) => {
    console.log(document.documentElement.scrollTop)
  })
}
const els = []
onMounted(() => {
  const article = document.querySelector('article.article-main')
  if (article && toc.links) {
    toc.links.forEach((link: any) => {
      const dom = document.getElementById(link.id)
      if (dom) {
        els.push(dom)
      }
      if (link.children && Array.isArray(link.children)) {
        link.children.links.forEach((sublink: any) => {
          const dom = document.getElementById(sublink.id)
          if (dom) {
            els.push(dom)
          }
        })
      }
    })
  }
})

watch(
  search,
  (val) => {
    if (process.client) {
      nextTick(() => {
        activeToc.value = val
      })
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="postcss">
.tocAnchor {
  .activeLink {
    @apply relative text-info before:absolute before:-left-4 before:top-0 before:h-full before:w-1 before:bg-info before:content-[''];
  }
  .subactiveLink {
    @apply before:-left-10;
  }
}
</style>
