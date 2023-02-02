<template>
  <h2 class="relative pt-[2em] !mt-0">
    <a v-if="generate" :href="`#${id}`">
      <slot />
    </a>
    <slot v-else />
    <i class="absolute -top-16" :data-fragment-id="id"></i>
  </h2>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
defineProps<{ id: string }>()
const heading = 2
const { anchorLinks } = useRuntimeConfig().public.content
const generate =
  anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>
