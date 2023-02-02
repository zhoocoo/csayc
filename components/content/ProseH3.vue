<template>
  <h3 class="relative pt-[1.6em] !mt-0">
    <a v-if="generate" :href="`#${id}`">
      <slot />
    </a>
    <slot v-else />
    <i class="-top-16 absolute" :data-fragment-id="id"></i>
  </h3>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
defineProps<{ id: string }>()
const heading = 3
const { anchorLinks } = useRuntimeConfig().public.content
const generate =
  anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>
