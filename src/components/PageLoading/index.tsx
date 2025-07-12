'use client'

import React from 'react'
import './index.css'

export interface PageLoadingProps {
  /** 加载类型 */
  type?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'skeleton'
  /** 加载文本 */
  text?: string
  /** 是否显示加载文本 */
  showText?: boolean
  /** 自定义类名 */
  className?: string
  /** 是否全屏显示 */
  fullscreen?: boolean
  /** 背景遮罩透明度 */
  maskOpacity?: number
  /** 加载器大小 */
  size?: 'small' | 'medium' | 'large'
  /** 自定义样式 */
  style?: React.CSSProperties
}

const PageLoading: React.FC<PageLoadingProps> = ({
  type = 'spinner',
  text = '加载中...',
  showText = true,
  className = '',
  fullscreen = false,
  maskOpacity = 0.6,
  size = 'medium',
  style,
}) => {
  const containerClass =
    `atori-page-loading ${fullscreen ? 'atori-page-loading-fullscreen' : ''} ${className}`.trim()

  const maskStyle = fullscreen
    ? { backgroundColor: `rgba(0, 0, 0, ${maskOpacity})` }
    : {}

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className={`atori-spinner atori-spinner-${size}`}>
            <div className="atori-spinner-circle"></div>
          </div>
        )

      case 'dots':
        return (
          <div className={`atori-dots atori-dots-${size}`}>
            <div className="atori-dots-dot"></div>
            <div className="atori-dots-dot"></div>
            <div className="atori-dots-dot"></div>
          </div>
        )

      case 'pulse':
        return (
          <div className={`atori-pulse atori-pulse-${size}`}>
            <div className="atori-pulse-circle"></div>
          </div>
        )

      case 'wave':
        return (
          <div className={`atori-wave atori-wave-${size}`}>
            <div className="atori-wave-bar"></div>
            <div className="atori-wave-bar"></div>
            <div className="atori-wave-bar"></div>
            <div className="atori-wave-bar"></div>
            <div className="atori-wave-bar"></div>
          </div>
        )

      case 'skeleton':
        return (
          <div className={`atori-skeleton atori-skeleton-${size}`}>
            <div className="atori-skeleton-line"></div>
            <div className="atori-skeleton-line"></div>
            <div className="atori-skeleton-line"></div>
          </div>
        )

      default:
        return (
          <div className={`atori-spinner atori-spinner-${size}`}>
            <div className="atori-spinner-circle"></div>
          </div>
        )
    }
  }

  return (
    <div className={containerClass} style={{ ...maskStyle, ...style }}>
      <div className="atori-page-loading-content">
        {renderLoader()}
        {showText && text && (
          <div className="atori-page-loading-text">{text}</div>
        )}
      </div>
    </div>
  )
}

export default PageLoading
