---
title: React Hooks 完全指南
date: 2024-11-20T14:30:00.000Z
description: 深入理解React Hooks的使用方法，包括useState、useEffect、useContext等核心Hook的详细讲解
tags: [react, hooks, javascript, frontend]
lang: zh
duration: 15min
author: Atori
---

## 为什么使用 Hooks？

Hooks 解决了以下问题：

- 组件之间难以复用状态逻辑
- 复杂组件变得难以理解
- class 组件中的 this 指向问题

## 常用的 Hooks

### useState

useState 是最基本的 Hook，用于在函数组件中添加状态：

```javascript
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

### useEffect

useEffect 用于处理副作用，相当于 componentDidMount 和 componentDidUpdate：

```javascript
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

## 自定义 Hooks

你可以创建自定义 Hooks 来复用状态逻辑：

```javascript
import { useState, useEffect } from 'react'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
```

## 最佳实践

1. 只在最顶层调用 Hooks
2. 只在 React 函数中调用 Hooks
3. 使用 ESLint 插件来强制执行 Hooks 规则

## 总结

React Hooks 让函数组件变得更加强大，同时保持了代码的简洁性和可读性。通过合理使用 Hooks，你可以构建出更加优雅和可维护的 React 应用。
