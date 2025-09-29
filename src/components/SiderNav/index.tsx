'use client'

import { useEffect, useState } from 'react'
import './index.css'

interface SiderNavProps {
  content: { name: string; id: string }[]
}

export const SiderNav = (props: SiderNavProps) => {
  const { content } = props
  const [activeItem, setActiveItem] = useState<string>('')

  // 初始化设置
  useEffect(() => {
    if (content.length > 0) {
      const firstId = content[0].id
      setActiveItem(firstId)
    }
  }, [content])

  // 滚动监听 - 独立的useEffect，避免重复绑定
  useEffect(() => {
    if (content.length === 0) return
    const ids = content.map(item => item.id)

    const handleScroll = () => {
      const elements = ids
        .map(id => document.getElementById(id))
        .filter(Boolean)
      let currentActive = ''
      let minDistance = Infinity
      elements.forEach((element, index: number) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          // 元素在视口上方1/3处时认为是激活状态
          const targetPosition = window.innerHeight / 3
          const distance = Math.abs(rect.top - targetPosition)
          // 选择距离目标位置最近且在视口内的元素
          if (
            distance < minDistance &&
            rect.top < window.innerHeight * 0.8 &&
            rect.bottom > 0
          ) {
            minDistance = distance
            currentActive = ids[index]
          }
        }
      })
      // 如果找到了新的激活项，更新状态
      if (currentActive) {
        setActiveItem(prev => (prev === currentActive ? prev : currentActive))
      }
    }

    // 绑定滚动事件
    const scrollTarget = document.querySelector('body') as Element
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll)
    }
  }, [content])

  // 点击导航项跳转到对应年份
  const scrollToYear = (year: string) => {
    const element = document.getElementById(year)
    console.log('element', element)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
  }

  return (
    <div className="fixed top-[15rem] right-[2rem] mr-2 z-10">
      <div className="atori-nav-sider-container">
        {content.map(year => (
          <div
            key={year.name}
            onClick={() => scrollToYear(year.id)}
            className="cursor-pointer p-2"
          >
            <div
              className={`atori-nav-sider-item w-[1.6rem] ${
                activeItem === year.id ? 'active' : ''
              }`}
              title={`跳转到 ${year.name} 年`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
