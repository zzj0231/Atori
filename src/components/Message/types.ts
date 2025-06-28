export type MessageType = 'success' | 'error' | 'warning' | 'info'

export interface MessageConfig {
  content: string
  type?: MessageType
  duration?: number
  key?: string
  onClose?: () => void
}

export interface MessageItemProps extends MessageConfig {
  onRemove: (key: string) => void
}

export interface MessageContainerProps {
  messages: Array<MessageConfig & { key: string }>
  onRemove: (key: string) => void
}

export interface MessageAPI {
  success(
    content: string,
    config?: Omit<MessageConfig, 'content' | 'type'>
  ): string
  error(
    content: string,
    config?: Omit<MessageConfig, 'content' | 'type'>
  ): string
  warning(
    content: string,
    config?: Omit<MessageConfig, 'content' | 'type'>
  ): string
  info(
    content: string,
    config?: Omit<MessageConfig, 'content' | 'type'>
  ): string
  destroy(): void
}
