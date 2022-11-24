<template>
  <div class="min-h-screen">
    <AppLoadingBar />
    <AppNavbar />
    <div
      :class="{
        'pt-0': isImmerseRead
      }"
      class="min-h-screen pt-16"
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
