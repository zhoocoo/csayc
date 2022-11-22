<!-- This component is used to show Markdown code block examples -->
<template>
  <div class="mockup-code">
    <ContentSlot :use="$slots.default" />
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
