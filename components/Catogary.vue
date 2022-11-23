<template>
  <div id="article-catogary" class="pt-4">
    <div id="cato-container" :style="catStyle">
      <div
        v-for="(item, index) in articleList"
        :key="item.label"
        :class="[`item${index}`]"
      >
        <div
          class="hover:scale-10 h-96 w-36 cursor-pointer overflow-hidden rounded-md bg-base-200 p-3 transition-all"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MagicGrid from 'magic-grid'
const magicGrid = ref<MagicGrid>()
onMounted(() => {
  magicGrid.value = new MagicGrid({
    container: '#cato-container', // Required. Can be a class, id, or an HTMLElement.
    animate: true,
    gutter: 20,
    static: true,
    useMin: true
  })
  magicGrid.value.listen()
})

const catStyle = computed(() => {
  return {
    visibility: magicLoading.value ? 'visible' : 'hidden'
  }
})

const articleList = ref([
  {
    label: 'nuxt3'
  },
  {
    label: 'PM2'
  },
  {
    label: 'Vue3'
  },
  {
    label: 'koa'
  },
  {
    label: 'node'
  },
  {
    label: 'CSS'
  },
  {
    label: '源码阅读'
  },
  {
    label: '读书笔记'
  },
  {
    label: '工程化'
  },
  {
    label: 'webpack'
  },
  {
    label: 'vite'
  },
  {
    label: '浏览器原理'
  },
  {
    label: '其他'
  }
])

const magicLoading = ref(false)

watch(
  () => {
    return magicGrid.value?.ready()
  },
  (val) => {
    if (val) {
      magicLoading.value = val
    }
  }
)
</script>

<style lang="postcss" scoped>
#article-catogary {
  #cato-container {
    /* > div {
      width: 180px;
      height: 300px;
      background-color: antiquewhite;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    } */
    .item1 {
      height: 200px;
    }
    .item4 {
      height: 400px;
    }
    .item6 {
      height: 600px;
    }
    .item11 {
      height: 100px;
    }
    .item8 {
      height: 350px;
    }
  }
}
</style>
