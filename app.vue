<template>
  <Html lang="zh_cn" :data-theme="dataTheme" />
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<script setup lang="ts">
import { themeInit } from '~~/composable/useTheme'
const { theme } = useContent().globals
console.log(theme)
const dataTheme = themeInit()
console.log(theme)
</script>
