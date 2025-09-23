'use client'

import { useEffect, useRef, useState } from 'react'
import './index.css'

interface SinglePhotoPreviewProps {
  src: string
  alt?: string
  year?: string
  description?: string
  isOpen: boolean
  onClose: () => void
}

export default function SinglePhotoPreview({
  src,
  alt = '',
  year = '',
  description = '',
  isOpen,
  onClose,
}: SinglePhotoPreviewProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const imageRef = useRef<HTMLImageElement>(null)

  // 重置缩放和位置
  const resetTransform = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // 当预览打开时重置
  useEffect(() => {
    if (isOpen) {
      resetTransform()
      setIsLoading(true)
    }
  }, [isOpen])

  // 键盘事件处理
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case '+':
        case '=':
          handleZoom(0.2)
          break
        case '-':
          handleZoom(-0.2)
          break
        case '0':
          resetTransform()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // 缩放处理
  const handleZoom = (delta: number) => {
    setScale(prev => Math.max(0.5, Math.min(5, prev + delta)))
  }

  // 滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    handleZoom(delta)
  }

  // 鼠标拖拽
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 触摸事件处理 (移动端)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && scale > 1) {
      e.preventDefault()
      const touch = e.touches[0]
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // 双击缩放
  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2)
    } else {
      resetTransform()
    }
  }

  // 图片加载完成
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="single-photo-preview-overlay" onClick={onClose}>
      <div
        className="single-photo-preview-container"
        onClick={e => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button className="single-photo-preview-close" onClick={onClose}>
          ×
        </button>

        {/* 图片信息 - 左上角 */}
        {(year || description) && (
          <div className="single-photo-info">
            {year && <div className="photo-year">{year}</div>}
            {description && (
              <div className="photo-description">{description}</div>
            )}
          </div>
        )}

        {/* 图片容器 */}
        <div
          className="single-photo-preview-image-container"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
        >
          {isLoading && (
            <div className="single-photo-preview-loading">
              <div className="loading-spinner"></div>
            </div>
          )}

          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className="single-photo-preview-image"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor:
                scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            }}
            onLoad={handleImageLoad}
            draggable={false}
          />
        </div>

        {/* 缩放控制 */}
        <div className="single-photo-controls">
          <button onClick={() => handleZoom(-0.2)} title="缩小">
            -
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => handleZoom(0.2)} title="放大">
            +
          </button>
          <button onClick={resetTransform} title="重置">
            重置
          </button>
        </div>
      </div>
    </div>
  )
}
