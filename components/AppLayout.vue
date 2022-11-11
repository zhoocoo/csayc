<script setup lang="ts"></script>

<template>
  <div class="min-h-screen">
    <Html lang="zh_cn" />
    <AppLoadingBar />
    <AppNavbar />
    <div class="pt-16">
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
