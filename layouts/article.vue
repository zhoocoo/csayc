<template>
  <main class="article-layout container relative mx-auto min-h-screen px-5">
    <div class="relative mx-auto flex max-w-5xl justify-between">
      <ArticleLeftMenu
        v-show="!isImmerseRead"
        class="hidden lg:flex"
      ></ArticleLeftMenu>
      <article :class="immerseReadClasses" class="article-main">
        <ContentDoc v-slot="{ doc }">
          <div
            class="flex flex-col items-center justify-center md:flex md:flex-row md:justify-between"
          >
            <ProseH1
              :id="$route.fullPath"
              class="not-prose mb-0 w-full flex-1 line-clamp-2"
              >{{ doc.title }}</ProseH1
            >
            <ArticleFocusPanel
              v-if="isImmerseRead"
              class="sticky top-4 ml-3 shrink-0"
            ></ArticleFocusPanel>
          </div>
          <div>
            <ArticleDescPanel v-if="doc.description" class="my-3">{{
              doc.description
            }}</ArticleDescPanel>
            <div v-if="!isImmerseRead">
              <div
                v-for="(item, index) in doc.tags"
                :key="item + index"
                class="badge-ghost badge mx-1 whitespace-nowrap text-xs first:ml-0"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <ProseImg
            v-if="!isImmerseRead"
            :src="doc.image?.src"
            :alt="doc.image?.alt"
          />
          <ContentRenderer :value="doc" />
        </ContentDoc>
      </article>
      <ArticleRightPanel
        v-show="!isImmerseRead"
        class="hidden shrink-0 lg:flex"
      ></ArticleRightPanel>
    </div>

    <div class="divider"></div>
    <ArticlePagination></ArticlePagination>
  </main>
</template>

<script lang="ts">
import { useImmerseRead } from '~~/composable/useArticle'
import { umSendPV } from '~~/composable/useUm'

// 定义样式  https://tailwindcss.com/docs/typography-plugin#element-modifiers
defineComponent({
  name: 'ArtiCleLayout'
})
</script>

<script setup lang="ts">
umSendPV()
const isImmerseRead = useImmerseRead()
const immerseReadClasses = computed(() => {
  // 沉浸式阅读模式下
  if (isImmerseRead.value) {
    return {
      '!max-w-none': true,
      'shadow-none': true
    }
  }
  return {}
})
</script>

<style lang="postcss">
.article-layout {
  article.article-main {
    @apply prose prose-code:p-0 prose-pre:m-0 prose-pre:py-0 prose-pre:pb-5 prose-pre:before:hidden dark:prose-invert;
    @apply my-4 min-h-screen  w-full max-w-4xl flex-1 px-5 py-10 md:shadow-2xl;
  }
}
</style>
