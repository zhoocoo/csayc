<template>
  <main class="container mx-auto">
    <slot>
      <div class="text-2xl">页面不见了</div>
    </slot>
  </main>
</template>

<script lang="ts" setup>
import { umSendPV } from '~~/composable/useUm'
umSendPV()
</script>