<template>
  <div ref="tocAnchor" class="tocAnchor">
    <ul v-if="toc && toc.links">
      <li
        v-for="link in toc.links"
        :key="link.text"
        class="my-3 first:mt-0 last:mb-0"
      >
        <a
          :href="`#${link.id}`"
          :class="{ activeLink: search === `#${link.id}` }"
          class="block leading-6"
          @click.prevent="handlerAnchorToc(link.id)"
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
                activeLink: search === `#${sublink.id}`,
                subactiveLink: search === `#${sublink.id}`
              }"
              @click.prevent="handlerAnchorToc(sublink.id)"
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
import { useIntersectionObserver } from '@vueuse/core'
import { useRouteHash } from '@vueuse/router'

const { toc } = useContent()

const tocAnchor = ref<HTMLElement | null>()

const search = useRouteHash()

onMounted(() => {
  const article = document.querySelector('article')
  if (article && toc.links) {
    const els = []
    toc.links.forEach((link: any[]) => {
      const dom = document.getElementById(link.id)
      if (dom) {
        els.push(dom)
      }
      if (link.children && Array.isArray(link.children)) {
        link.children.links.forEach((sublink: any[]) => {
          const dom = document.getElementById(sublink.id)
          if (dom) {
            els.push(dom)
          }
        })
      }
    })
  }
})

// const { stop } = useIntersectionObserver(
//   target,
//   ([{ isIntersecting }], observerElement) => {
//     targetIsVisible.value = isIntersecting
//   }
// )

const handlerAnchorToc = (id: string) => {
  const root = document.documentElement
  const el = document.getElementById(id)
  if (el) {
    // search.value = `#${id}`
    root.scrollTo({
      top: el?.offsetTop,
      behavior: 'smooth'
    })
  }
}

watch(
  search,
  (val) => {
    const id = val.slice(1)
    if (process.client) {
      nextTick(() => {
        handlerAnchorToc(id)
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
