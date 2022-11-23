<template>
  <Html lang="zh_cn" :data-theme="dataTheme" />
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<script setup lang="ts">
import { useTheme } from '~~/composable/useTheme'
// const { theme } = useContent().globals
const dataTheme = useTheme()
</script>
