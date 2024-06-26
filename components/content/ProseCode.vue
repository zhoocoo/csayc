<!-- This component is used to show Markdown code block examples -->
<template>
  <div
    class="mockup-code relative pb-0 transition-all"
    @mouseenter="handlerCopyTrigger(true)"
    @mouseleave="handlerCopyTrigger(false)"
  >
    <slot />
    <span v-if="props.filename" class="absolute top-2 right-5 text-slate-600">{{
      props.filename
    }}</span>
    <div
      v-show="isSupported"
      class="copyWrapper absolute bottom-2 right-2 flex h-10 w-10 scale-0 cursor-copy items-center justify-center rounded-md bg-slate-800 transition-all duration-300"
      :class="copyClasses"
    >
      <Icon
        :name="copied ? 'ri-check-double-line' : 'ri-clipboard-line'"
        class="h-6 w-6 cursor-copy text-slate-400"
        @click="copy(props.code)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  }
})
const { copy, copied, isSupported } = useClipboard({
  source: props.code,
  // 优先使用 Clipboard API，使用execCommand作为后备使用
  legacy: true
})

const copyClasses = ref({
  'scale-100': false
})
const handlerCopyTrigger = (isFocus: boolean) => {
  console.log('handlerCopyTrigger', isFocus)
  copyClasses.value['scale-100'] = isFocus
}
</script>

<style lang="postcss">
pre code .line {
  display: block;
  min-height: 1rem;

  &.highlight {
    @apply bg-slate-800;
  }
}
pre {
  @apply !px-0 !py-5 indent-3;
}
/* .mockup-code {
  &:hover {
    .copyWrapper {
      @apply scale-100;
    }
  }
} */
</style>
