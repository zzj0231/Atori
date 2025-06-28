'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import {
  MessageType,
  MessageConfig,
  MessageItemProps,
  MessageContainerProps,
  MessageAPI,
} from './types'
import './index.css'

interface MessageItemPropsWithRemove extends MessageItemProps {
  onRemove: (key: string) => void
}

const MessageItem: React.FC<MessageItemPropsWithRemove> = ({
  content,
  type = 'info',
  duration = 3,
  key,
  onClose,
  onRemove,
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration * 1000)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      onRemove(key || '')
      onClose?.()
    }, 200)
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />
      case 'error':
        return <AlertCircle className="w-4 h-4" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />
      case 'info':
      default:
        return <Info className="w-4 h-4" />
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`gb-message-item gb-message-${type} ${
        isLeaving ? 'gb-message-leaving' : ''
      }`}
    >
      <div className="gb-message-icon">{getIcon()}</div>
      <div className="gb-message-content">{content}</div>
      <button
        className="gb-message-close"
        onClick={handleClose}
        aria-label="关闭消息"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  onRemove,
}) => {
  if (messages.length === 0) return null

  return (
    <div className="gb-message-container">
      {messages.map(message => {
        const { key, ...messageProps } = message
        return <MessageItem key={key} {...messageProps} onRemove={onRemove} />
      })}
    </div>
  )
}

// Message API
class MessageAPIImpl implements MessageAPI {
  private static instance: MessageAPIImpl
  private messages: Array<MessageConfig & { key: string }> = []
  private listeners: Set<
    (messages: Array<MessageConfig & { key: string }>) => void
  > = new Set()

  static getInstance(): MessageAPIImpl {
    if (!MessageAPIImpl.instance) {
      MessageAPIImpl.instance = new MessageAPIImpl()
    }
    return MessageAPIImpl.instance
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.messages]))
  }

  private addMessage(config: MessageConfig) {
    const key = config.key || `message-${Date.now()}-${Math.random()}`
    const { key: _, ...configWithoutKey } = config
    const message = { ...configWithoutKey, key }

    this.messages.push(message)
    this.notify()

    return key
  }

  subscribe(
    listener: (messages: Array<MessageConfig & { key: string }>) => void
  ) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  removeMessage(key: string) {
    this.messages = this.messages.filter(msg => msg.key !== key)
    this.notify()
  }

  success(content: string, config?: Omit<MessageConfig, 'content' | 'type'>) {
    return this.addMessage({ content, type: 'success', ...config })
  }

  error(content: string, config?: Omit<MessageConfig, 'content' | 'type'>) {
    return this.addMessage({ content, type: 'error', ...config })
  }

  warning(content: string, config?: Omit<MessageConfig, 'content' | 'type'>) {
    return this.addMessage({ content, type: 'warning', ...config })
  }

  info(content: string, config?: Omit<MessageConfig, 'content' | 'type'>) {
    return this.addMessage({ content, type: 'info', ...config })
  }

  destroy() {
    this.messages = []
    this.notify()
  }
}

// React Hook for using Message
export const useMessage = () => {
  const [messages, setMessages] = useState<
    Array<MessageConfig & { key: string }>
  >([])

  useEffect(() => {
    const api = MessageAPIImpl.getInstance()
    const unsubscribe = api.subscribe(setMessages)
    return unsubscribe
  }, [])

  const removeMessage = (key: string) => {
    MessageAPIImpl.getInstance().removeMessage(key)
  }

  return { messages, removeMessage }
}

// Message Provider Component
export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { messages, removeMessage } = useMessage()

  return (
    <>
      {children}
      {typeof window !== 'undefined' &&
        createPortal(
          <MessageContainer messages={messages} onRemove={removeMessage} />,
          document.body
        )}
    </>
  )
}

// Export the API instance
export const message = MessageAPIImpl.getInstance()

// Export the component for direct use
export const Message: React.FC<MessageConfig> = props => {
  return <MessageItem {...props} onRemove={() => {}} />
}

// Re-export types
export type { MessageType, MessageConfig, MessageAPI }
