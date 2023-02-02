<!-- This component is used to show Markdown code block examples -->
<template>
  <div class="group/code mockup-code relative pb-0 transition-all">
    <slot />
    <span v-if="props.filename" class="absolute top-2 right-5 text-slate-600">{{ props.filename }}</span>
    <div
      v-show="isSupported"
      class="absolute bottom-2 right-2 flex h-10 w-10 scale-0 items-center justify-center rounded-md transition-all duration-300 group-hover/code:scale-100"
    >
      <Icon
        :name="copied ? 'ri-check-double-line' : 'ri-clipboard-line'"
        class="h-6 w-6 cursor-pointer text-slate-400"
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
const { copy, copied, isSupported } = useClipboard({ source: props.code })
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
  @apply !px-0 indent-3;
}
</style>
