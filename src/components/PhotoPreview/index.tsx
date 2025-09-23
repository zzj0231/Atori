'use client'

import { useEffect, useRef, useState } from 'react'
import './index.css'

interface PhotoPreviewProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function PhotoPreview({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: PhotoPreviewProps) {
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

  // 当图片切换时重置
  useEffect(() => {
    if (isOpen) {
      resetTransform()
      setIsLoading(true)
    }
  }, [currentIndex, isOpen])

  // 键盘事件处理
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
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
  }, [isOpen, onClose, onNext, onPrev])

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

  const currentImage = images[currentIndex]

  return (
    <div className="photo-preview-overlay" onClick={onClose}>
      <div
        className="photo-preview-container"
        onClick={e => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button className="photo-preview-close" onClick={onClose}>
          ×
        </button>

        {/* 导航按钮 */}
        {images.length > 1 && (
          <>
            <button
              className="photo-preview-nav photo-preview-prev"
              onClick={onPrev}
              disabled={currentIndex === 0}
            >
              ‹
            </button>
            <button
              className="photo-preview-nav photo-preview-next"
              onClick={onNext}
              disabled={currentIndex === images.length - 1}
            >
              ›
            </button>
          </>
        )}

        {/* 图片容器 */}
        <div
          className="photo-preview-image-container"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        >
          {isLoading && (
            <div className="photo-preview-loading">
              <div className="loading-spinner"></div>
            </div>
          )}

          <img
            ref={imageRef}
            src={currentImage}
            alt={`Preview ${currentIndex + 1}`}
            className="photo-preview-image"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor:
                scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            }}
            onLoad={handleImageLoad}
            draggable={false}
          />
        </div>

        {/* 控制栏 */}
        <div className="photo-preview-controls">
          <button onClick={() => handleZoom(-0.2)}>-</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => handleZoom(0.2)}>+</button>
          <button onClick={resetTransform}>重置</button>
          <span className="photo-preview-counter">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* 缩略图导航 */}
        {images.length > 1 && (
          <div className="photo-preview-thumbnails">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className={`photo-preview-thumbnail ${
                  index === currentIndex ? 'active' : ''
                }`}
                onClick={() => {
                  // 这里需要父组件提供切换到指定索引的方法
                  // onGoToIndex?.(index)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
