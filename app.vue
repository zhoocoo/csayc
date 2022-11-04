<template>
  <NuxtLayout :name="layout">
    <AppLayout>
      <NuxtPage />
    </AppLayout>
  </NuxtLayout>
</template>

<script setup>
// You might choose this based on an API call or logged-in status
const layout = ref('full-width')
</script>
