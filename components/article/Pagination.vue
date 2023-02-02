<template>
  <div class="mb-4 flex items-center justify-center py-4">
    <div class="btn-group grid grid-cols-2">
      <NuxtLink v-if="prev" class="btn-outline btn" :to="prev._path">
        {{ prev.title }}
      </NuxtLink>
      <span v-else class="btn-outline btn-disabled btn">没有了哦</span>
      <NuxtLink v-if="next" :to="next._path" class="btn-outline btn">
        {{ next.title }}
      </NuxtLink>
      <span v-else class="btn-outline btn-disabled btn">没有了哦</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { prev, next } = useContent()
</script>
