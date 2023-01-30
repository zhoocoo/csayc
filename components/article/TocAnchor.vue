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
import { useDebounceFn } from '@vueuse/core'
interface IArticleAnchors {
  dom: HTMLElement
  offsetTop: number
  id: string
  section?: number[]
}
/**
 * 二分法查找值
 */
function searchAnchor(
  anchors: IArticleAnchors[],
  target: number
): IArticleAnchors {
  let left = 0
  let right: number = anchors.length - 1
  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2)
    if (anchors[mid].offsetTop < target) {
      left = mid + 1
    } else if (anchors[mid].offsetTop > target) {
      right = mid - 1
    } else {
      return anchors[mid - 1]
    }
  }
  return anchors[right]
}
const { toc } = useContent()

interface ILink {
  id: string
  depth: number
  text: string
  children?: ILink[]
}

const articleAnchors: IArticleAnchors[] = []
const scrollTop = ref(0)
const activeToc = ref()
if (window) {
  window.addEventListener('scroll', () => {
    scrollTop.value = document.documentElement.scrollTop
    const anc = searchAnchor(articleAnchors, scrollTop.value)
    if (anc) {
      activeToc.value = `#${anc.id}`
    }
    // 避免页面操作导致锚点的位置变更
    debounceUpdate()
  })
}

const articleDom = window
  ? document.querySelector('article.article-main')
  : null

const updateAncData = () => {
  if (articleDom && toc.value.links) {
    toc.value.links.forEach((link: ILink) => {
      const dom = document.getElementById(link.id)
      if (dom) {
        articleAnchors.push({ dom, offsetTop: dom.offsetTop, id: link.id })
      }
      if (link.children && Array.isArray(link.children)) {
        link.children.forEach((sublink: any) => {
          const dom = document.getElementById(sublink.id)
          if (dom) {
            articleAnchors.push({
              dom,
              offsetTop: dom.offsetTop,
              id: sublink.id
            })
          }
        })
      }
    })
  }
  articleAnchors.sort((a, b) => a.offsetTop - b.offsetTop)
}

const debounceUpdate = useDebounceFn(updateAncData, 200)

onMounted(() => {
  updateAncData()
})
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
