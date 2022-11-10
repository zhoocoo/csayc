<script setup lang="ts"></script>

<template>
  <div class="min-h-screen">
    <Html lang="zh_cn" data-theme="dark" />
    <AppLoadingBar />
    <AppNavbar />
    <slot />
    <AppFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss">
/* body {
  @apply bg-primary-50 dark:bg-primary-900;
} */
</style>
