<template>
  <main class="container mx-auto px-4">
    <article
      class="prose max-w-none prose-code:p-0 prose-pre:m-0 prose-pre:py-0 prose-pre:pb-5 prose-pre:before:hidden dark:prose-invert"
    >
      <ContentDoc />
    </article>
  </main>
</template>

<script lang="ts">
import { umSendPV } from '~~/composable/useUm'
// 定义样式  https://tailwindcss.com/docs/typography-plugin#element-modifiers
defineComponent({
  name: 'ArtiCleLayout'
})
</script>
<script setup lang="ts">
umSendPV()
</script>

<style lang="postcss"></style>
