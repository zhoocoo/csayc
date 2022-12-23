<template>
  <div class="home">
    <main class="mx-auto">
      <Back></Back>
      <div class="hero fixed top-0 left-0 h-screen">
        <div class="hero-content text-center">
          <div class="relative max-w-md">
            <h1 class="font-mono text-5xl font-bold text-slate-600">
              WELCOME TO MY BLOG
            </h1>
            <p class="py-6 font-mono text-slate-500">
              学习并分享前端技术等WEB知识，记录生活的点点滴滴，是一个互联网从业者值得收藏的网站。
            </p>
            <button class="btn"><nuxt-link to="/about">开始</nuxt-link></button>
            <div class="mt-6 flex items-center justify-center">
              <Icon
                class="h-20 w-20 animate-bounce text-slate-500"
                name="heroicons-outline:chevron-double-down"
              ></Icon>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { umSendPV } from '~~/composable/useUm'
useHead({
  title: 'CSAYC-COOL前端-赵聪聪个人博客',
  meta: [
    {
      name: 'description',
      content:
        'COOL前端-官方博客，赵聪聪的个人博客，学习并分享前端技术等WEB知识，记录生活的点点滴滴，是一个互联网从业者值得收藏的网站。'
    },
    {
      name: 'keywords',
      content:
        '个人博客模板,前端技术分享,前端技术网站,web前端技术,模板分享,vue,vue3'
    }
  ]
})

umSendPV()
</script>
