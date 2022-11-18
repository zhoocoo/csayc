<script setup lang="ts">
import { setTheme } from '~~/composable/useTheme'

const themeConfig = ref([
  {
    value: 'light',
    label: '白昼模式'
  },
  {
    value: 'dark',
    label: '暗夜模式'
  }
  // 'cupcake',
  // 'emerald',
  // 'corporate',
  // 'synthwave',
  // 'halloween',
  // 'forest',
  // 'lofi',
  // 'fantasy',
  // 'dracula',
  // 'cmyk',
  // 'lemonade',
  // 'coffee',
  // 'winter'
])
</script>

<template>
  <div class="dropdown-hover dropdown-bottom dropdown-end dropdown">
    <label tabindex="0" class="btn-ghost btn"
      >🎨 主题
      <svg
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </label>
    <ul
      tabindex="0"
      data-choose-theme
      class="dropdown-content menu rounded-box menu-compact w-52 bg-base-100 p-2 shadow-lg"
    >
      <li
        v-for="theme in themeConfig"
        :key="theme.value"
        @click="setTheme(theme.value)"
      >
        <a :data-set-theme="theme.value">{{ theme.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>
