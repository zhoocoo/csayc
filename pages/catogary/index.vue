<template>
  <div id="article-catogary" class="md:my-4">
    <Icon
      v-show="!isLoaded"
      name="ri-loader-2-line"
      class="fixed top-0 left-0 right-0 bottom-0 m-auto h-10 w-10 animate-spin text-slate-400"
    />
    <div v-show="isLoaded">
      <div v-show="!isMinScreen" id="cato-container">
        <nuxt-link
          v-for="item in navigation[0].children || []"
          :key="item._path"
          :to="item._path"
          :style="{
            width: cardWidth + 'px'
          }"
          class="card block cursor-pointer bg-base-200 shadow md:shadow-xl"
        >
          <figure v-if="item.poster">
            <img
              class="w-full object-cover"
              :style="item.randomStyle"
              :src="item.poster.src"
            />
          </figure>
          <div class="card-body p-3 md:p-5">
            <h2 class="card-title">{{ item.title }}</h2>
            <p class="line-clamp-2">{{ item.description }}</p>
          </div>
        </nuxt-link>
      </div>
      <div v-show="isMinScreen" class="last:border-b-8 last:border-base-200">
        <nuxt-link
          v-for="item in navigation[0].children || []"
          :key="item._path"
          :to="item._path"
          class="bg-base-50 flex border-t-8 border-base-200 p-1"
        >
          <figure v-if="item.poster" class="h-20 w-20 flex-shrink-0">
            <img
              class="h-full w-full rounded object-cover"
              :src="item.poster.src"
            />
          </figure>
          <div class="flex flex-col px-2">
            <h2 class="font-bold leading-8 line-clamp-1">{{ item.title }}</h2>
            <p class="text-sm text-slate-600 line-clamp-2">
              {{ item.description }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MagicGrid from 'magic-grid'
import { useWindowSize } from '@vueuse/core'
const { navigation } = useContent()
const magicGrid = shallowRef<MagicGrid>()
const cardWidth = ref(288)
const isLoaded = ref(false)

const isM = ref(true)
const { width } = useWindowSize()
const isMinScreen = computed(() => {
  return isM.value || width.value <= 768
})

const getImgStyles = (item) => {
  return {
    height: (item.poster.height / item.poster.width) * cardWidth.value + 'px'
  }
}

const initMgicGrid = () => {
  if (magicGrid.value || isMinScreen.value || process.server) return
  navigation.value[0].children = navigation.value[0].children.map((i) => {
    i.randomStyle = getImgStyles(i)
    return i
  })
  nextTick(() => {
    magicGrid.value = new MagicGrid({
      container: '#cato-container',
      animate: false,
      gutter: 10,
      static: true,
      useMin: true
    })
    magicGrid.value.listen()
  })
}

const updateMgicGrid = () => {
  if (magicGrid.value && process.client) {
    nextTick(() => {
      magicGrid.value.positionItems()
    })
  } else {
    initMgicGrid()
  }
}

onMounted(() => {
  isLoaded.value = true
  // initMgicGrid()
})

watch(
  () => [isMinScreen.value, isLoaded.value],
  ([a, b]) => {
    if (!a && b) {
      updateMgicGrid()
    }
  }
)

watch(
  width,
  () => {
    updateMgicGrid()
    isM.value = isMobileOrPc() === 'Mobile'
  },
  {
    immediate: true
  }
)

const magicLoading = ref(false)

watch(
  () => {
    return magicGrid.value?.ready()
  },
  (val) => {
    if (val) {
      magicLoading.value = val
      updateMgicGrid()
    }
  }
)
</script>

<style lang="postcss" scoped>
#article-catogary {
  #cato-container {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
