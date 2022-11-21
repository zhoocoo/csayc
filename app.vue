<template>
  <Html lang="zh_cn" :data-theme="theme"/>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<script setup lang="ts">
import { themeInit } from '~~/composable/useTheme'
const theme = themeInit()
console.log(theme)
</script>
