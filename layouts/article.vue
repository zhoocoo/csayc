<template>
  <main class="article-layout container relative mx-auto">
    <article
      :class="immerseReadClasses"
      class="prose relative mx-auto max-w-3xl px-5 py-10 shadow-2xl prose-code:p-0 prose-pre:m-0 prose-pre:py-0 prose-pre:pb-5 prose-pre:before:hidden dark:prose-invert"
    >
      <ContentDoc v-slot="{ doc }">
        <ProseH1 :id="$route.fullPath" class="mb-0">{{ doc.title }}</ProseH1>
        <div class="flex items-start justify-between pt-3">
          <div>
            <ArticleDescPanel class="mb-3">{{
              doc.description
            }}</ArticleDescPanel>
            <div v-if="!isImmerseRead">
              <div
                v-for="(item, index) in doc.tags"
                :key="item + index"
                class="badge-accent badge-outline badge mx-1 whitespace-nowrap first:ml-0"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <ArticleFocusPanel
            v-if="isImmerseRead"
            class="sticky top-4 ml-3 flex-shrink-0"
          ></ArticleFocusPanel>
        </div>
        <ProseImg
          v-if="!isImmerseRead"
          :src="doc.image?.src"
          :alt="doc.image?.alt"
        />
        <ContentRenderer :value="doc" />
      </ContentDoc>
      <ArticleRightMenu v-show="!isImmerseRead"></ArticleRightMenu>
    </article>
    <div class="divider"></div>
    <ArticlePagination></ArticlePagination>
  </main>
</template>

<script lang="ts">
import type { Ref } from 'vue'
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
