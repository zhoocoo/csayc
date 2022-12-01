<template>
  <div class="stats bg-info-content text-primary-content">
    <div class="stat">
      <div class="stat-title">
        <div class="flex justify-center gap-5">
          <div v-if="showTime.days">
            <span class="countdown font-mono text-4xl">
              <span :style="`--value: ${showTime.days}`"></span>
            </span>
            天
          </div>
          <div v-if="showTime.hours">
            <span class="countdown font-mono text-4xl">
              <span :style="`--value: ${showTime.hours}`"></span>
            </span>
            时
          </div>
          <div v-if="showTime.minutes">
            <span class="countdown font-mono text-4xl">
              <span :style="`--value: ${showTime.minutes}`"></span>
            </span>
            分
          </div>
          <div>
            <span class="countdown font-mono text-4xl">
              <span :style="`--value: ${showTime.seconds}`"></span>
            </span>
            秒
          </div>
        </div>
      </div>

      <div class="stat-actions flex justify-center">
        <button class="btn-success btn-sm btn" @click="quitImmerseRead">
          退出沉浸式阅读
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { intervalToDuration } from 'date-fns'

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
const showTime = ref<Duration>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})
useInterval(1000, {
  controls: true,
  callback: (count) => {
    showTime.value = intervalToDuration({
      start: 0,
      end: count * 1000
    })
  }
})

onBeforeUnmount(() => {})
</script>
