<template>
  <div>
    <div class="alert shadow-lg">
      <div>
        <Icon class="h-5 w-5 text-yellow-400" aria-hidden="true" :name="icon" />
        <span><slot></slot></span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'heroicons-outline:newspaper'
  }
})
</script>
