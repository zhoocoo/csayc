---
title: n模块管理Node版本
categories:
 - 前端
tags:
 - npm生态
---


### 介绍

有的时候，服务器里可能有多个项目，不同的项目js脚本所需的node版本可能不同，所以就需要node版本管理工具。我知道的node版本管理工具有两个，一个是nvm，一个是n。

### 安装

``` shell
npm i -g n
```

### 常用命令

``` shell
n //会列出所有安装的版本供你切换

n latest //安装最新版本

n stable //安装最新稳定版

n lts //安装最新长期支持版本

n rm [版本号] //删除某一版本

n -h //帮助命令
```
