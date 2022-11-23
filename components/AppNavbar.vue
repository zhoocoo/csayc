<script lang="ts" setup>
import { umRecord } from '~~/composable/useUm'

const router = useRouter()
const route = useRoute()

const activeRoute = computed(() => route.path)

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

const handlerChange = (item: any) => {
  router.push(item._path)
}
</script>

<template>
  <div class="navbar fixed top-0 z-50 w-full bg-base-200">
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
      <DrowpDown
        v-model="activeRoute"
        :list="navigation[1].children"
        value-key="_path"
        label-key="title"
        @change="handlerChange"
        >文章列表</DrowpDown
      >
      <ThemeChose></ThemeChose>
    </div>
  </div>
</template>
