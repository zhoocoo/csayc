<script setup>
defineProps({
  icon: {
    type: String,
    default: 'heroicons-outline:exclamation'
  }
})
</script>

<template>
  <div class="rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div v-if="icon" class="mr-3 flex-shrink-0">
        <Icon class="h-5 w-5 text-yellow-400" aria-hidden="true" :name="icon" />
      </div>
      <div>
        <h3 class="m-0 text-base font-medium text-yellow-800">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <ContentSlot :use="$slots.default" unwrap="p" />
        </div>
      </div>
    </div>
  </div>
</template>
