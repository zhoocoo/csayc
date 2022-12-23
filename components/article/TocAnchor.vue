<template>
  <div ref="tocAnchor" class="tocAnchor">
    <ul v-if="toc && toc.links">
      <li
        v-for="link in toc.links"
        :key="link.text"
        class="my-3 first:mt-0 last:mb-0"
      >
        <a :href="`#${link.id}`" data-link-type="first" class="block leading-6">
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
// import { useIntersectionObserver } from '@vueuse/core'
import { useDebounceFn, useWindowScroll } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { useRouteHash } from '@vueuse/router'
const { toc } = useContent()

const tocAnchor = ref<HTMLElement | null>()

const search = useRouteHash()

const { y: wy } = useWindowScroll()

watch(wy, (val) => {
  console.log(val)
})

onBeforeMount(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
})

onMounted(() => {
  const article = document.querySelector('article')
  if (article && toc.links) {
    const els = []
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

const setActive = (link: HTMLElement) => {
  links.value.forEach((el) => {
    el.classList.remove('activeLink')
    el.classList.remove('subactiveLink')
  })
  link.classList.add('activeLink')
  link.dataset.linkType === 'second' && link.classList.add('subactiveLink')
}

const bindSetActive = useDebounceFn((link: HTMLElement) => {
  if (isClickToc.value) return
  setActive(link)
}, 50)

const links = ref()
const isClickToc = ref(false)
onMounted(() => {
  links.value = gsap.utils.toArray('.tocAnchor a')
  links.value.forEach((a) => {
    const element = document.querySelector(a.getAttribute('href'))
    const linkST = ScrollTrigger.create({
      trigger: element,
      start: 'top 64px',
      end: 'bottom 64px'
    })
    ScrollTrigger.create({
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        self.isActive && bindSetActive(a)
      },
      immediateRender: true
    })
    a.addEventListener('click', (e) => {
      e.preventDefault()
      isClickToc.value = true
      setActive(a)
      gsap.to(document.documentElement, {
        scrollTo: linkST.start,
        overwrite: 'auto',
        onComplete() {
          setTimeout(() => {
            isClickToc.value = false
          }, 50)
        }
      })
    })
  })
})

watch(
  search,
  (val) => {
    const id = val.slice(1)
    if (process.client) {
      nextTick(() => {
        console.log(id)
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
