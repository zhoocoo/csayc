<script lang="ts" setup>
import { umRecord } from '~~/composable/useUm'

const router = useRouter()
const route = useRoute()

const activeRoute = computed(() => route.path)

const {
  navigation,
  page,
  // Computed properties from `page` key
  excerpt,
  toc,
  type,
  layout
} = useContent()
console.log(
  navigation,
  page,
  // Computed properties from `page` key
  excerpt,
  toc,
  type,
  layout
)
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
        class="btn btn-ghost text-xl normal-case"
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
        v-for="item in navigation"
        :key="item._path"
        :data="item"
        value-key="_path"
        label-key="title"
        @change="handlerChange"
        >{{ item.title }}</DrowpDown
      >
      <ThemeChose></ThemeChose>
    </div>
  </div>
</template>
