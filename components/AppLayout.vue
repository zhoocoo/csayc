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


