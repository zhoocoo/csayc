<template>
  <div class="my-4">
    <button
      v-if="control"
      class="btn-warning btn-sm btn my-2"
      @click="toggle()"
    >
      <div v-show="value">关闭</div>
      <div v-show="!value" class="flex justify-center items-center"><Icon name="ri-code-box-line" class="mr-2"></Icon> 试一试</div>
    </button>
    <iframe
      v-if="value"
      :height="height"
      style="width: 100%"
      scrolling="no"
      :title="title"
      :src="refinedSrc"
      frameborder="no"
      loading="lazy"
      allowtransparency="true"
      allowfullscreen="true"
    >
      See the Pen
      <a :href="viewUrl"> {{ title }}</a> by {{ nickName }} (<a :href="baseUrl"
        >@{{ userName }}</a
      >) on <a :href="penUrl">CodePen</a>.
    </iframe>
  </div>
</template>

<script setup lang="ts">
import { resolveURL, withQuery } from 'ufo'
import { useToggle } from '@vueuse/core'
import { computed } from '#imports'

const props = defineProps({
  control: {
    type: Boolean,
    default: false
  },
  height: {
    type: [String, Number],
    default: 400
  },
  title: {
    type: String,
    default: 'Demo'
  },
  userName: {
    type: String,
    default: 'zhoocoo'
  },
  nickName: {
    type: String,
    default: 'LogonCong'
  },
  id: {
    type: String,
    default: ''
  },
  defaultTab: {
    type: Array,
    default() {
      return ['result']
    }
  },
  themeId: {
    type: String,
    default: 'dark'
  }
})

const [value, toggle] = useToggle(!props.control)
const penUrl = 'https://codepen.io'

const baseUrl = computed(() => resolveURL(penUrl, props.userName))

const iframeUrl = computed(() => {
  return resolveURL(baseUrl.value, 'embed', props.id)
})

const viewUrl = computed(() => {
  return resolveURL(baseUrl.value, 'pen', props.id)
})

const refinedSrc = computed(() => {
  const defaultTab = props.defaultTab.join(',')
  return withQuery(iframeUrl.value, {
    'theme-id': props.themeId,
    'default-tab': defaultTab
  })
})
</script>
