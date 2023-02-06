<template>
  <span ref="proseImgWrapper" class="proseImgWrapper my-[2em]">
    <img
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

const proseImgWrapper = ref()
const proseImgTargetWrapper = ref()
const oriImg = ref()
const targetImg = ref()

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
    prune: true,
    toggleClass: 'flipping',
    ease: 'power1.inOut',
    zIndex: 1000,
    onStart() {
      console.log('onstart')
      // 不存在active类，说明状态图片正在缩小
      if (oriImg.value.classList.contains('active')) {
        if (proseImgWrapper.value) {
          proseImgWrapper.value.style.width = oriImg.value.clientWidth + 'px'
          proseImgWrapper.value.style.height = oriImg.value.clientHeight + 'px'
        }
      }
    },
    onComplete() {
      if (!oriImg.value.classList.contains('active')) {
        if (proseImgWrapper.value) {
          proseImgWrapper.value.removeAttribute('style')
        }
      }
    }
    // nested:true
  })
}
</script>

<style scoped lang="postcss">
.proseImgTargetWrapper {
  @apply hidden h-full w-full
    cursor-zoom-out items-center justify-center;
  &.active {
    background-color: rgba(0, 0, 0, 0.75);
    @apply fixed top-0 left-0 z-50 flex h-full w-full;
  }
  > img {
    max-width: 90%;
    max-height: 90%;
    @apply hidden;
    &.active {
      @apply block;
    }
  }
}

.proseImgWrapper {
  @apply block cursor-zoom-in;
  > img {
    @apply visible w-full;
    &.active {
      @apply invisible;
    }
    &.flipping {
      @apply visible;
    }
  }
}
</style>
