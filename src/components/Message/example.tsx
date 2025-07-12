'use client'

import React from 'react'
import { message, MessageProvider } from './index'

// 示例组件
export const MessageExample: React.FC = () => {
  const showSuccessMessage = () => {
    message.success('操作成功！数据已保存。')
  }

  const showErrorMessage = () => {
    message.error('操作失败！请检查网络连接。')
  }

  const showWarningMessage = () => {
    message.warning('警告！您即将删除重要数据。')
  }

  const showInfoMessage = () => {
    message.info('提示：新功能已上线，欢迎体验！')
  }

  const showCustomMessage = () => {
    message.info('自定义消息', {
      duration: 5,
      onClose: () => {
        console.log('消息已关闭')
      },
    })
  }

  const showPersistentMessage = () => {
    message.info('这条消息不会自动消失', {
      duration: 0, // 设置为 0 表示不自动消失
    })
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Message 组件示例</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={showSuccessMessage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          成功消息
        </button>

        <button
          onClick={showErrorMessage}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          错误消息
        </button>

        <button
          onClick={showWarningMessage}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          警告消息
        </button>

        <button
          onClick={showInfoMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          信息消息
        </button>

        <button
          onClick={showCustomMessage}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          自定义消息
        </button>

        <button
          onClick={showPersistentMessage}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          持久消息
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">使用说明：</h3>
        <ul className="text-sm space-y-1">
          <li>• 消息会自动在 3 秒后消失（可自定义）</li>
          <li>• 点击右上角的 X 按钮可手动关闭</li>
          <li>• 支持多种消息类型：success、error、warning、info</li>
          <li>• 响应式设计，在移动设备上自动适配</li>
          <li>• 支持暗色主题和减少动画模式</li>
        </ul>
      </div>
    </div>
  )
}

// 包装组件，提供 MessageProvider
export const MessageExampleWrapper: React.FC = () => {
  return (
    <MessageProvider>
      <MessageExample />
    </MessageProvider>
  )
}
