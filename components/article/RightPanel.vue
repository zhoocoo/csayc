<template>
  <div
    ref="rightPanel"
    class="not-prose flex h-screen w-96 flex-col items-center px-3 pt-4"
    :style="stickyStyle"
  >
    <div
      class="bg-base card card-compact w-full rounded-none border-0 shadow-none md:border md:border-base-200 md:shadow"
    >
      <div class="card-body">
        <ArticleTocAnchor></ArticleTocAnchor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll, useElementBounding } from '@vueuse/core'

import { useFloor } from '@vueuse/math'
const rightPanel = ref()
const { y } = useWindowScroll()
const { top, left } = useElementBounding(rightPanel)
const stickyStyle = computed(() => {
  console.log(left.value)
  if (top.value < 0) {
    return {
      position: 'fixed',
      left: left.value,
      top: 0
    }
  }
  return {}
})
</script>
