<template>
  <div class="home">
    <main class="mx-auto">
      <Back></Back>
      <div class="fixed top-0 left-0 h-screen hero">
        <div class="text-center hero-content">
          <div class="relative max-w-md">
            <h1 class="font-mono text-5xl font-bold text-slate-600">
              WELCOME TO MY BLOG
            </h1>
            <p class="py-6 font-mono text-slate-500">
              学习并分享前端技术等WEB知识，记录生活的点点滴滴，是一个互联网从业者值得收藏的网站。
            </p>
            <nuxt-link class="btn" to="/catogary">文章列表</nuxt-link>
            <div class="flex items-center justify-center mt-6">
              <Icon
                class="w-20 h-20 animate-bounce text-slate-500"
                name="heroicons-outline:chevron-double-down"
              ></Icon>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="fixed bottom-0 flex justify-center w-full py-1 bg-base-200">
      <p>
        <a href="https://www.miit.gov.cn/" class="flex items-center text-sm">
          <img class="w-3 mr-1" src="@/assets/img/common/policy.png" alt="" />
          京ICP备2021018962号-2
        </a>
      </p>
      <!-- <p>zhoocoo@gmail.com</p>
      <p>Copyright © 2022 - 赵聪聪. All Rights Reserved.</p> -->
    </footer>
  </div>
</template>
<script setup>
import { umSendPV } from '~~/composable/useUm'
useHead({
  title: '跑不快的代码-COOL前端-赵聪聪个人博客',
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
