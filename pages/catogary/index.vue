<template>
  <div id="article-catogary" class="py-4">
    <div id="cato-container">
      <nuxt-link
        v-for="item in navigation[0].children || []"
        :key="item._path"
        :to="item._path"
        :style="{
          width: cardWidth + 'px'
        }"
        class="card block cursor-pointer bg-base-100 shadow md:shadow-xl"
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
  </div>
</template>

<script setup lang="ts">
import MagicGrid from 'magic-grid'
import { useResizeObserver } from '@vueuse/core'
const { navigation } = useContent()
const magicGrid = shallowRef<MagicGrid>()
const cardWidth = ref(288)
const firstDom = ref()

const getImgStyles = (item) => {
  return {
    height: (item.poster.height / item.poster.width) * cardWidth.value + 'px'
  }
}

onMounted(() => {
  magicGrid.value = new MagicGrid({
    container: '#cato-container', // Required. Can be a class, id, or an HTMLElement.
    animate: false,
    gutter: 10,
    static: true,
    useMin: true
  })
  if (magicGrid.value.container) {
    const cardDomFirst = magicGrid.value.container.querySelector('.card')
    if (cardDomFirst) {
      firstDom.value = cardDomFirst
      updateCardStyle(768)
    }
  }
  magicGrid.value.listen()
})

const updateCardStyle = (clientWidth: number) => {
  if (clientWidth < 768) {
    cardWidth.value = clientWidth / 2 - 10
  } else {
    cardWidth.value = 288
  }
  navigation.value[0].children = navigation.value[0].children.map((i) => {
    i.randomStyle = getImgStyles(i)
    return i
  })
  magicGrid.value.positionItems()
}

const magicLoading = ref(false)

watch(
  () => {
    return magicGrid.value?.ready()
  },
  (val) => {
    console.log(val)
    if (val) {
      magicLoading.value = val
    }
  }
)

process.client &&
  useResizeObserver(document.documentElement, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    updateCardStyle(width)
  })
</script>

<style lang="postcss" scoped>
#article-catogary {
  #cato-container {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
