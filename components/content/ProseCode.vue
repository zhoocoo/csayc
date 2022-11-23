<!-- This component is used to show Markdown code block examples -->
<template>
  <div class="mockup-code pb-0">
    <slot />
  </div>
</template>

<script lang="ts" setup>
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

</script>

<style lang="postcss">
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
