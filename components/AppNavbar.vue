<script lang="ts" setup>
import { umRecord } from '~~/composable/useUm'
import { useImmerseRead } from '~~/composable/useArticle'
const isImmerseRead = useImmerseRead()

// const router = useRouter()

// const { navigation } = useContent()
const goHome = () => {
  umRecord({
    eventName: 'home_logo_click',
    eventParams: {
      host: window.location.host
    }
  })
}

// const handlerChange = (item: any) => {
//   router.push(item._path)
// }
</script>

<template>
  <div
    v-show="!isImmerseRead"
    id="top-nav"
    class="navbar sticky top-0 z-50 w-full bg-base-200"
  >
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
      <NuxtLink class="btn-ghost btn" to="/catogary"> 文章列表 </NuxtLink>

      <!-- <DrowpDown
        v-for="item in navigation"
        :key="item._path"
        :data="item"
        value-key="_path"
        label-key="title"
        @change="handlerChange"
        >{{ item.title }}</DrowpDown
      > -->
      <ThemeChose></ThemeChose>
    </div>
  </div>
</template>
