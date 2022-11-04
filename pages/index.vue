<script lang="ts" setup>
const { navigation } = useContent()
const appConfig = useAppConfig()
</script>

<template>
  <div class="home">
    <article class="prose prose-gray max-w-none dark:prose-invert">
      <ContentDoc path="/article/async" />
    </article>
    <div>
      <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        :to="link._path"
        active-class="font-bold"
        class="mr-6"
      >
        {{ link.title }}
      </NuxtLink>
    </div>
  </div>
</template>
