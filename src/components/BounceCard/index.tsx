'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import SinglePhotoPreview from '../SinglePhotoPreview'
import './index.css'

interface PhotoData {
  src: string
  year?: string
  description?: string
}

interface BounceCardsProps {
  className?: string
  images?: string[]
  photosData?: PhotoData[] // 新增照片数据，包含年份和描述
  containerWidth?: number
  containerHeight?: number
  animationDelay?: number
  animationStagger?: number
  easeType?: string
  transformStyles?: string[]
  enableHover?: boolean
  onImageClick?: (index: number) => void
}

export default function BounceCards({
  className = '',
  images = [],
  photosData = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
  ],
  enableHover = false,
  onImageClick,
}: BounceCardsProps) {
  const [previewState, setPreviewState] = useState({
    isOpen: false,
    currentPhotoData: null as PhotoData | null,
  })

  // 处理图片点击预览
  const handleImagePreview = (index: number) => {
    const photoData = photosData[index] || { src: images[index] }
    setPreviewState({
      isOpen: true,
      currentPhotoData: photoData,
    })
  }

  // 关闭预览
  const closePreview = () => {
    setPreviewState({
      isOpen: false,
      currentPhotoData: null,
    })
  }

  // 决定使用哪个数据源
  const displayImages =
    photosData.length > 0 ? photosData.map(p => p.src) : images
  useEffect(() => {
    gsap.fromTo(
      '.atori-photo-card',
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
      }
    )
  }, [animationStagger, easeType, animationDelay])

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
    } else if (transformStr === 'none') {
      return 'rotate(0deg)'
    } else {
      return `${transformStr} rotate(0deg)`
    }
  }

  const getPushedTransform = (
    baseTransform: string,
    offsetX: number
  ): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/
    const match = baseTransform.match(translateRegex)
    if (match) {
      const currentX = parseFloat(match[1])
      const newX = currentX + offsetX
      return baseTransform.replace(translateRegex, `translate(${newX}px)`)
    } else {
      return baseTransform === 'none'
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`
    }
  }

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover) return

    displayImages.forEach((_, i) => {
      gsap.killTweensOf(`.card-${i}`)

      const baseTransform = transformStyles[i] || 'none'

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform)
        gsap.to(`.card-${i}`, {
          transform: noRotation,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        })
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160
        const pushedTransform = getPushedTransform(baseTransform, offsetX)

        const distance = Math.abs(hoveredIdx - i)
        const delay = distance * 0.05

        gsap.to(`.card-${i}`, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto',
        })
      }
    })
  }

  const resetSiblings = () => {
    if (!enableHover) return

    displayImages.forEach((_, i) => {
      gsap.killTweensOf(`.card-${i}`)
      const baseTransform = transformStyles[i] || 'none'
      gsap.to(`.card-${i}`, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      })
    })
  }

  return (
    <>
      <div className={`atori-photo-bounceCardsContainer ${className}`}>
        {displayImages.map((src, idx) => (
          <div
            key={idx}
            className={`atori-photo-card card-${idx}`}
            style={{ transform: transformStyles[idx] ?? 'none' }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
            onClick={() => {
              // 如果有外部点击处理器，则调用外部的
              if (onImageClick) {
                onImageClick(idx)
              } else {
                // 否则使用内部预览
                handleImagePreview(idx)
              }
            }}
          >
            <img className="image" src={src} alt={`card-${idx}`} />
          </div>
        ))}
      </div>

      {/* 单张图片预览 */}
      {previewState.currentPhotoData && (
        <SinglePhotoPreview
          src={previewState.currentPhotoData.src}
          year={previewState.currentPhotoData.year}
          description={previewState.currentPhotoData.description}
          isOpen={previewState.isOpen}
          onClose={closePreview}
        />
      )}
    </>
  )
}
