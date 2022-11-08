<script lang="ts" setup>
const { navigation } = useContent()
const appConfig = useAppConfig()
console.log(appConfig)
</script>

<template>
  <div class="container navbar bg-base-300 rounded-box dark:bg-slate-900  dark:text-primary-200">
    <div class="flex-1 px-2 lg:flex-none">
      <a class="text-lg font-bold">CSAYC</a>
    </div>
    <div class="flex justify-end flex-1 px-2">
      <div class="flex items-stretch">
        <a class="btn btn-ghost rounded-btn">首页</a>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost rounded-btn">文章列表</label>
          <ul
            tabindex="0"
            class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li v-for="link of navigation" :key="link._path">
              <NuxtLink class=" dark:text-primary-200" :to="link._path" active-class="font-bold">
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <ColorModeSwitch
          class="dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-300"
        />
      </div>
    </div>
  </div>
</template>
