<template>
  <div>
    <AppLoadingBar />
    <AppNavbar />
    <div
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
