<template>
  <div class="min-h-screen">
    <AppLoadingBar />
    <AppNavbar />
    <div class="min-h-screen pt-16">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss">
/* body {
  @apply bg-primary-50 dark:bg-primary-900;
} */
</style>
