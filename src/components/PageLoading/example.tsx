'use client'

import React, { useState } from 'react'
import PageLoading, { PageLoadingProps } from './index'

const PageLoadingExample: React.FC = () => {
  const [loadingType, setLoadingType] =
    useState<PageLoadingProps['type']>('spinner')
  const [size, setSize] = useState<PageLoadingProps['size']>('medium')
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [showText, setShowText] = useState(true)

  const loadingTypes = [
    { value: 'spinner' as const, label: '旋转器' },
    { value: 'dots' as const, label: '点点' },
    { value: 'pulse' as const, label: '脉冲' },
    { value: 'wave' as const, label: '波浪' },
    { value: 'skeleton' as const, label: '骨架屏' },
  ]

  const sizes = [
    { value: 'small' as const, label: '小' },
    { value: 'medium' as const, label: '中' },
    { value: 'large' as const, label: '大' },
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        PageLoading 组件示例
      </h1>

      {/* 控制面板 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">控制面板</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">加载类型</label>
            <select
              value={loadingType}
              onChange={e =>
                setLoadingType(e.target.value as PageLoadingProps['type'])
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {loadingTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">大小</label>
            <select
              value={size}
              onChange={e =>
                setSize(e.target.value as PageLoadingProps['size'])
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {sizes.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showText"
              checked={showText}
              onChange={e => setShowText(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showText" className="text-sm font-medium">
              显示文本
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="fullscreen"
              checked={showFullscreen}
              onChange={e => setShowFullscreen(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="fullscreen" className="text-sm font-medium">
              全屏显示
            </label>
          </div>
        </div>
      </div>

      {/* 加载组件展示 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">加载组件</h2>

        {showFullscreen ? (
          <PageLoading
            type={loadingType}
            size={size}
            text="正在加载页面内容..."
            showText={showText}
            fullscreen={true}
            maskOpacity={0.7}
          />
        ) : (
          <div className="min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
            <PageLoading
              type={loadingType}
              size={size}
              text="正在加载内容..."
              showText={showText}
            />
          </div>
        )}
      </div>

      {/* 所有类型预览 */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">所有加载类型预览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingTypes.map(type => (
            <div
              key={type.value}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-md font-medium mb-4 text-center">
                {type.label}
              </h3>
              <div className="flex items-center justify-center min-h-[120px]">
                <PageLoading
                  type={type.value}
                  size="medium"
                  text={`${type.label}加载中...`}
                  showText={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 不同大小预览 */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">不同大小预览</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sizes.map(s => (
            <div
              key={s.value}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-md font-medium mb-4 text-center">
                {s.label}尺寸
              </h3>
              <div className="flex items-center justify-center min-h-[120px]">
                <PageLoading
                  type="spinner"
                  size={s.value}
                  text={`${s.label}尺寸加载中...`}
                  showText={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 使用说明 */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
          使用说明
        </h2>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <p>
            • <strong>type</strong>: 加载类型，支持
            spinner、dots、pulse、wave、skeleton
          </p>
          <p>
            • <strong>size</strong>: 加载器大小，支持 small、medium、large
          </p>
          <p>
            • <strong>text</strong>: 加载文本，默认为&ldquo;加载中...&rdquo;
          </p>
          <p>
            • <strong>showText</strong>: 是否显示加载文本
          </p>
          <p>
            • <strong>fullscreen</strong>: 是否全屏显示
          </p>
          <p>
            • <strong>maskOpacity</strong>: 全屏模式下的背景遮罩透明度
          </p>
          <p>
            • <strong>className</strong>: 自定义类名
          </p>
          <p>
            • <strong>style</strong>: 自定义样式
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageLoadingExample
