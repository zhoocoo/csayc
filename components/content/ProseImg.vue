<template>
  <span ref="proseImgWrapper" class="proseImgWrapper">
    <img
      :id="oriImgId"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      data-flip-id="img"
      @click="handlerZoomImg()"
    />
  </span>
  <ClientOnly>
    <teleport to="body">
      <div
        ref="proseImgTargetWrapper"
        class="proseImgTargetWrapper"
        @click="handlerZoomImg()"
      >
        <img
          :id="targetImgId"
          data-flip-id="img"
          :src="refinedSrc"
          :alt="alt"
          :width="width"
          :height="height"
        />
      </div>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { withBase } from 'ufo'
import { gsap } from 'gsap'
// @ts-ignore
import { Flip } from 'gsap/Flip.js'

import { useRuntimeConfig, computed } from '#imports'

gsap.registerPlugin(Flip)
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    return withBase(props.src, useRuntimeConfig().app.baseURL)
  }
  return props.src
})

const proseImgWrapper = ref<Element>()
const proseImgTargetWrapper = ref<Element>()
const oriImg = shallowRef()
const targetImg = shallowRef()

const oriImgId = uuid()
const targetImgId = uuid()

onMounted(() => {
  nextTick(() => {
    oriImg.value = proseImgWrapper.value?.getElementsByTagName('img')[0]
    targetImg.value =
      proseImgTargetWrapper.value?.getElementsByTagName('img')[0]
  })
})

const handlerZoomImg = () => {
  //   getDom()
  const state = Flip.getState([
    proseImgWrapper.value?.getElementsByTagName('img')[0],
    proseImgTargetWrapper.value?.getElementsByTagName('img')[0]
  ])
  proseImgTargetWrapper.value?.classList.toggle('active')

  oriImg.value.classList.toggle('active')
  targetImg.value.classList.toggle('active')
  Flip.from(state, {
    duration: 0.3,
    absolute: true,
    toggleClass: 'flipping',
    ease: 'power1.inOut'
  })
}
</script>

<style scoped lang="postcss">
.proseImgTargetWrapper {
  @apply hidden h-full w-full items-start justify-center;
  &.active {
    background-color: rgba(0, 0, 0, 0.65);
    @apply fixed top-0 left-0 z-50 flex h-full w-full;
  }
  > img {
    max-width: 30%;
    max-height: 30%;
    @apply hidden;
    &.active {
      @apply block;
    }
  }
}

.proseImgWrapper {
  @apply block;
  > img {
    @apply visible;
    &.active {
      @apply invisible;
    }
    &.flipping {
      @apply visible;
    }
  }
}
</style>
