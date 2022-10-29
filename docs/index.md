---
layout: home
title: 笔记
sidebar: false
features:
  - icon: 🎉
    title: Vue3
    details: Lorem ipsum...
  - icon: 🖖
    title: TypeScript
    details: Lorem ipsum...
  - icon: 🛠️
    title: JavaScript
    details: Lorem ipsum...
hero:
   name: 学习随笔
   text: 
   image: 
     src: ./images/logo.png
     alt:
   actions:
    - theme: brand
      text: 开始吧
      link: /docs/dev
---

<!-- <Home /> -->

<script setup>
/**
 * 这里路径 @theme 可以直接指向 .vitepress/theme 目录
 * 
 * 注意：在 vitepress 1.0.0-alpha.6 版本前的别名为 /@theme
 * 1.0.0-alpha.6 版本以后的别名改为 @theme
 * 详情参考：https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md
 */
import Home from '@theme/Home.vue'
</script>
