<script setup lang="ts"></script>

<template>
  <div class="sm:pt-6 sm:pb-10">
    <Html lang="zh_cn" />
    <AppLoadingBar />
    <AppNavbar />
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss">
body {
  @apply bg-primary-50 dark:bg-primary-900;
}
</style>
