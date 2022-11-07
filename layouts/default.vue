<template>
  <div class="bg-white dark:bg-primary-800">
    <main class="container mx-auto">
      <AppNavbar />
      <slot>
        <div class="text-2xl">页面不见了</div>
      </slot>
    </main>
  </div>
</template>

<style lang="postcss">
.prose h2 a,
.prose h3 a {
  @apply no-underline;
  &:hover {
    @apply border-b border-neutral-600 dark:border-neutral-300;
  }
}
</style>
