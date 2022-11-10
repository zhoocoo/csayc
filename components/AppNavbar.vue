<script lang="ts" setup>
import { umRecord } from '~~/composable/useUm'

const { navigation } = useContent()
// const appConfig = useAppConfig()
const goHome = () => {
  umRecord({
    eventName: 'home_logo_click',
    eventParams: {
      host: window.location.host
    }
  })
}
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <NuxtLink
        class="btn-ghost btn text-xl normal-case"
        to="/"
        @click="goHome"
      >
        <span class="uppercase">C</span>
        <span class="uppercase text-base-content">SAY</span>
        <span class="uppercase">C</span>
      </NuxtLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal p-0">
        <li tabindex="0">
          <a>
            文章列表
            <svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </svg>
          </a>
          <ul class="bg-base-100 shadow-lg">
            <li v-for="link of navigation[1].children" :key="link._path">
              <NuxtLink :to="link._path" active-class="font-bold" class="mr-6">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
      <ThemeChose></ThemeChose>
    </div>
  </div>
</template>
