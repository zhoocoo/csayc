<template>
  <main class="article-layout container relative mx-auto">
    <article
      :class="immerseReadClasses"
      class="prose relative mx-auto my-4 max-w-3xl px-5 py-10 shadow-2xl prose-code:p-0 prose-pre:m-0 prose-pre:py-0 prose-pre:pb-5 prose-pre:before:hidden dark:prose-invert"
    >
      <ArticleLeftMenu v-show="!isImmerseRead"></ArticleLeftMenu>
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
      <ArticleRightPanel v-show="!isImmerseRead"></ArticleRightPanel>
    </article>
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
