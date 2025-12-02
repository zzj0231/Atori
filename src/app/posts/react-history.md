---
title: 关于 React 的进化史
date: 2025-11-26T23:00:00.000Z
description: 记录 react 历史进程
tags: [frontend，react, log]
lang: zh
duration: 12min
author: Atori
# draft: true
---

原文：[react-history-intro](https://playfulprogramming.com/posts/react-history-through-code#react-history-intro)

刚接触 React 的开发者，常会陷入这样的困惑：面对 Hooks 条条框框的使用限制 —— 比如只能在函数组件顶层调用、不能在条件语句里嵌套 —— 很容易觉得这些 API 像是随时间推移，东拼西凑补丁式开发出来的，背后没有一套统一的设计逻辑。

但事实恰恰相反。如果我们回到 React 诞生的起点，顺着它的成长轨迹去探寻每次技术决策的底层逻辑 —— 为何要创造这样一个框架、每个核心特性诞生时要解决的实际问题 —— 就会发现，看似零散的设计，其实都串联在一条清晰的发展主线上。

所以接下来，本文将以时间为轴，沿着 React 的历史一步步回溯：看看我们如今习以为常的 JSX 是如何让 UI 描述更直观，VDOM 又是怎样提高操作效率；类组件的组合思想，Hooks 又为何能颠覆传统写法成为主流；最后聊聊 React 19 对迈向服务端化的探索。

## 序章: 为什么会有 React
