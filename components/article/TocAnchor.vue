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
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import { useRouteHash } from '@vueuse/router'
interface IArticleAnchors {
  dom: HTMLElement
  offsetTop: number
  id: string
  section?: number[]
}

const search = useRouteHash()
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
      return anchors[mid]
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

let articleDom: HTMLElement | null = null

const initDateAncData = () => {
  if (articleDom && toc.value.links) {
    const fragments = articleDom.querySelectorAll('[data-fragment-id]')
    fragments.forEach((dom) => {
      articleAnchors.push({
        dom: dom as HTMLElement,
        offsetTop: getElementTop(dom as HTMLElement) - 1,
        id: (dom as HTMLElement).dataset.fragmentId as string
      })
    })
  }
  articleAnchors.sort((a, b) => a.offsetTop - b.offsetTop)
}

const updateAncData = () => {
  articleAnchors.map((i) => {
    i.offsetTop = getElementTop(i.dom) - 1
    return i
  })
}

const wrapperHeight = ref(0)
let stopResizeOb = () => {}

// 获取Element的offsetTop，忽略offsetParent的影响
function getElementTop(element: HTMLElement) {
  let actualTop = element.offsetTop
  let current = element.offsetParent as HTMLElement
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent as HTMLElement
  }

  return actualTop
}

const scrollBehavior = () => {
  scrollTop.value = document.documentElement.scrollTop
  const anc = searchAnchor(articleAnchors, scrollTop.value)
  if (anc) {
    activeToc.value = `#${anc.id}`
  } else {
    activeToc.value = undefined
  }
}

onMounted(() => {
  articleDom = document.querySelector('article.article-main')
  window.addEventListener('scroll', scrollBehavior)
  // 受限于服务端渲染，document无法在服务端获取，而nuxt3当前版本并没有一个稳定的方法判断是否是客户端(使用window判断，在服务端会直接报错)
  const { stop } = useResizeObserver(document.documentElement, (entries) => {
    const entry = entries[0]
    const { height } = entry.contentRect
    wrapperHeight.value = height
  })

  stopResizeOb = stop
  initDateAncData()
  goAnchorTarget(search.value)
})

onBeforeUnmount(() => {
  // 退出时停止监听
  stopResizeOb()
  window.removeEventListener('scroll', scrollBehavior)
})

// 文档流高度一旦繁盛改变，则更新文档中锚点的位置
watch(wrapperHeight, () => {
  updateAncData()
})

// 右侧锚点点击问题
watch(
  () => search.value,
  (val) => {
    goAnchorTarget(val)
  }
)

const goAnchorTarget = (val: string) => {
  if (val) {
    const target = articleAnchors.find((i) => `#${i.id}` === val)
    if (target) {
      target.dom.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
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
