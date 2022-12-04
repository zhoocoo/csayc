<template>
  <div class="tocAnchor">
    <ul v-if="toc && toc.links">
      <li
        v-for="link in toc.links"
        :key="link.text"
        class="my-3 first:mt-0 last:mb-0"
      >
        <a
          :href="`#${link.id}`"
          :class="{ activeLink: search === `#${link.id}` }"
          class="block leading-6"
        >
          {{ link.text }}
        </a>
        <ul v-if="link.children" class="pl-6">
          <li
            v-for="sublink in link.children"
            :key="sublink.text"
            class="my-3 last:mb-0"
          >
            <a
              :href="`#${sublink.id}`"
              class="block leading-6"
              :class="{
                activeLink: search === `#${sublink.id}`,
                subactiveLink: search === `#${sublink.id}`
              }"
            >
              {{ sublink.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useScroll, useElementBounding } from '@vueuse/core'
import { useRouteHash } from '@vueuse/router'

const { toc } = useContent()

const el = ref<HTMLElement | null>()
onMounted(() => {
  el.value = document.documentElement
})

const { x, y, isScrolling, arrivedState, directions } = useScroll(el)

const search = useRouteHash()
</script>

<style lang="postcss">
.tocAnchor {
  .activeLink {
    @apply relative text-info before:absolute before:-left-4 before:top-0 before:h-full before:w-1 before:bg-info before:content-[''];
  }
  .subactiveLink {
    @apply before:-left-10;
  }
}
</style>
