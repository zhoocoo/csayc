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
          :class="{ activeLink: scrollId === `#${link.id}` }"
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
                activeLink: scrollId === `#${sublink.id}`,
                subactiveLink: scrollId === `#${sublink.id}`
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
// import { useIntersectionObserver } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouteHash } from '@vueuse/router'
gsap.registerPlugin(ScrollTrigger)
const { toc } = useContent()

const tocAnchor = ref<HTMLElement | null>()

const search = useRouteHash()
const scrollId = ref(search.value)

// const active = computed(() => {
//   return search.value || scrollId.value
// })

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

onMounted(() => {
  const q = gsap.utils.selector('#article-content')
  const titles = q('h2,h3')
  titles.forEach((dom) => {
    gsap.to(dom, {
      scrollTrigger: {
        trigger: dom,
        start: 'center 68px',
        end: 'center 100%',
        scrub: true,
        markers: true,
        onEnter(self) {
          console.log('onEnter', self.trigger?.id)
          scrollId.value = `#${self.trigger?.id}`
        },
        onEnterBack(self) {
          scrollId.value = `#${self.trigger?.id}`
          console.log('onEnterBack', self.trigger?.id)
        }
      },
      x: 10
    })
  })
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
