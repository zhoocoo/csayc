<script lang="ts" setup>
import { umSendPV } from '~~/composable/useUm'
// const { navigation } = useContent()
// const appConfig = useAppConfig()
umSendPV()
</script>

<template>
  <div class="home">
    <main class="mx-auto">
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">CSAYC的个人博客</h1>
            <p class="py-6">
              "
              以大多数人努力程度之低根本轮不到拼天赋，那些伟大的人在成功之前，也是过着看起来枯燥的生活，每天都在做一些微不足道的事情，但这些事情最后从点连成了线，成就了他们。"
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
