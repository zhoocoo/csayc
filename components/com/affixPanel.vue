<template>
  <div ref="rootRef" :style="rootStyle">
    <div ref="wrapper" class="h-screen overflow-y-auto" :style="affixStyle">
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
  },
  offsetBottom: {
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

const threshold = ref(0)

const getThreshold = () => {
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
}

onBeforeMount(() => {
  threshold.value = getThreshold()
})

/** 阙值计算 */
// const threshold = computed(getThreshold)

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
