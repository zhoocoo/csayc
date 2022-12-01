<template>
  <div class="min-h-screen">
    <AppLoadingBar />
    <AppNavbar />
    <div
      class="min-h-screen pt-16"
      :class="{
        '!pt-0': isImmerseRead
      }"
    >
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useImmerseRead } from '~~/composable/useArticle'
const isImmerseRead = useImmerseRead()
</script>
