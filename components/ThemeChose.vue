<script setup lang="ts">
import { themeChange } from 'theme-change'

onMounted(() => {
  themeChange(false)
})
const themeConfig = ref([
  'light',
  'dark',
  'cupcake',
  'emerald',
  'corporate',
  'synthwave',
  'halloween',
  'garden',
  'forest',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'dracula',
  'cmyk',
  'lemonade',
  'coffee',
  'winter'
])
</script>

<template>
  <div class="dropdown-bottom dropdown-hover dropdown-end dropdown">
    <label tabindex="0" class="btn-ghost btn"
      >🎨主题
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
      <li v-for="theme in themeConfig" :key="theme">
        <a :data-set-theme="theme">{{ theme }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>
