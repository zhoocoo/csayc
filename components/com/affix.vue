<template>
  <div ref="rootRef" :style="rootStyle">
    <div :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useElementBounding } from '@vueuse/core'
const rootRef = ref()
const { width, height } = useElementBounding(rightPanel)
const fixed = ref(false)
const rootStyle = computed(() => {
  return {
    width: width.value + 'px',
    height: height.value + 'px'
  }
})

const affixStyle = computed(() => {
  return {
    position: 'fixed',
    left: 0
  }
})
</script>
