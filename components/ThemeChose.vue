<template>
  <DrowpDown v-model="theme" :list="themeConfig" @change="handlerChange"
    >🎨 主题</DrowpDown
  >
</template>

<script setup lang="ts">
import { setTheme, useTheme } from '~~/composable/useTheme'
import type { TThemeMap } from '~~/composable/useTheme'
interface IThemeItem {
  value: TThemeMap | string
  label: string
}

const theme = useTheme()

const handlerChange = (item: IThemeItem) => {
  setTheme(item.value)
}

const themeConfig = ref<IThemeItem[]>([
  {
    value: 'cupcake',
    label: '白昼模式'
  },
  {
    value: 'dark',
    label: '暗夜模式'
  },
  {
    value: 'system',
    label: '跟随系统'
  }
])
</script>
