'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import { HamburgerIcon } from '@/icon/hamburger'
import { CloseIcon } from '@/icon/closeIcon'

import './index.css'

interface ResponseDropCSSProps {
  /** 桌面端显示的内容 */
  desktopContent?: ReactNode
  /** 移动端下拉菜单显示的内容 */
  mobileContent: ReactNode
  /** 自定义收起图标，默认为汉堡包图标 */
  collapseIcon?: ReactNode
  /** 自定义展开时的关闭图标，默认为X图标 */
  closeIcon?: ReactNode
  /** 下拉菜单的对齐方式 */
  align?: 'left' | 'right' | 'center'
  /** 额外的 CSS 类名 */
  className?: string
  /** 下拉内容的额外样式类名 */
  dropdownClassName?: string
}

export const ResponseDrop = ({
  desktopContent,
  mobileContent,
  collapseIcon,
  closeIcon,
  align = 'left',
  className = '',
  dropdownClassName = '',
}: ResponseDropCSSProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }

  return (
    <div
      className={`atori-response-drop-container ${className}`}
      ref={dropdownRef}
    >
      {/* 桌面端内容 - 使用 CSS 媒体查询控制显示 */}
      <div className="hidden md:flex md:items-center md:gap-6">
        {desktopContent || mobileContent}
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            atori-response-drop-button
            flex items-center justify-center w-10 h-10
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
            rounded-md
          "
          aria-label={isOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={isOpen}
        >
          {isOpen
            ? closeIcon || <CloseIcon />
            : collapseIcon || <HamburgerIcon />}
        </button>

        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <div
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 下拉菜单 */}
            <div
              className={`atori-response-drop-menu 
                absolute top-full mt-2 z-50 min-w-48 
                max-w-xs w-max backdrop-blur-sm border 
                border-border/50 rounded-lg shadow-lg 
                py-2 animate-in fade-in-0 zoom-in-95 
                slide-in-from-top-2 duration-200 
                ${alignmentClasses[align]} ${dropdownClassName}`}
            >
              <div className="flex flex-col space-y-1 px-2">
                {mobileContent}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
