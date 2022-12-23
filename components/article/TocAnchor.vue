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
// import { useIntersectionObserver } from '@vueuse/core'
import { useDebounceFn } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRouteHash } from '@vueuse/router'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
const { toc } = useContent()

const tocAnchor = ref<HTMLElement | null>()

const search = useRouteHash()

const activeToc = ref()

const setActive = (link: HTMLElement) => {
  const href = link.getAttribute('href') as string
  activeToc.value = href
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
    const href = a.getAttribute('href')
    const element = document.querySelector(href)
    if (search.value === href) {
      a.classList.add('activeLink')
      if (a.dataset.linkType === 'second') {
        a.classList.add('subactiveLink')
      }
      activeToc.value = href
    }
    const linkST = ScrollTrigger.create({
      trigger: element,
      start: 'top 64px',
      end: 'bottom 64px',
      onToggle: (self) => {
        self.isActive && bindSetActive(a)
      }
    })
    a.addEventListener('click', (e) => {
      // 点击时的目录点亮效果
      e.preventDefault()
      isClickToc.value = true
      setActive(a)
      gsap.to(document.documentElement, {
        duration: 0.3,
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
