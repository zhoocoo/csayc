<template>
  <div ref="rootRef" :style="rootStyle">
    <div ref="wrapper" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useElementBounding } from '@vueuse/core'
const rootRef = ref()
const wrapper = ref()
const { width, height, left, top } = useElementBounding(rootRef)

const props = defineProps({
  offsetTop: {
    type: String,
    default: '0'
  }
})

const rootStyle = computed(() => {
  if (!width.value || !height.value) return {}
  return {
    width: width.value + 'px',
    height: height.value + 'px'
  }
})

/** 阙值计算 */
const threshold = computed(() => {
  let threshold = 0
  const offsetTop = parseFloat(props.offsetTop)
  if (props.offsetTop.endsWith('px')) {
    threshold = parseFloat(offsetTop)
  } else if (process.client && props.offsetTop.endsWith('rem')) {
    const rootFontSize = window.getComputedStyle(
      document.documentElement
    ).fontSize
    threshold = offsetTop * parseFloat(rootFontSize)
  } else {
    threshold = offsetTop
  }
  return threshold
})

const affixStyle = computed(() => {
  if (top.value < threshold.value) {
    if (left.value) {
      return {
        position: 'fixed',
        left: left.value + 'px',
        top: threshold.value + 'px'
      }
    }
  }
  return {}
})
</script>
