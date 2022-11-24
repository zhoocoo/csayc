<template>
  <div class="stats bg-info-content text-primary-content">
    <div class="stat">
      <div class="stat-title">{{ showTime }}</div>
      <div class="stat-actions">
        <button class="btn btn-success btn-sm" @click="quitImmerseRead">
          退出沉浸式阅读
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDuration } from 'date-fns'
import { useInterval } from '@vueuse/core'
import { useImmerseRead } from '~~/composable/useArticle'
const isImmerseRead = useImmerseRead()
const quitImmerseRead = () => {
  isImmerseRead.value = false
}

// const {
//   //   counter
//   //  pause,
//   //  resume
// } =
const showTime = ref('')
useInterval(1000, {
  controls: true,
  callback: (count) => {
    console.log(count)
    showTime.value = formatDuration(
      {
        seconds: count
      },
      {
        format: ['minutes']
      }
    )
    console.log(showTime.value)
  }
})

onBeforeUnmount(() => {})
</script>
