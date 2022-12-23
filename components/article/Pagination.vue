<template>
  <div class="mb-4 flex items-center justify-center py-4">
    <div class="btn-group grid grid-cols-2">
      <button
        :class="{
          'btn-disabled': !prev
        }"
        class="btn-outline btn"
      >
        <template v-if="prev">
          <NuxtLink :to="prev._path">
            {{ prev.title }}
          </NuxtLink>
        </template>
        <a v-else>没有了哦</a>
      </button>
      <button
        :class="{
          'btn-disabled': !next
        }"
        class="btn-outline btn"
      >
        <template v-if="next">
          <NuxtLink :to="next._path">{{ next.title }}</NuxtLink>
        </template>
        <a v-else>没有了哦</a>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { prev, next } = useContent()
</script>
