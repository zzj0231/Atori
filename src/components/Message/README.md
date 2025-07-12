# Message 组件

一个类似 Ant Design 的消息通知组件，支持多种消息类型和自动消失功能。

## 特性

- ✅ 支持多种消息类型：success、error、warning、info
- ✅ 自动消失功能（可自定义时长）
- ✅ 手动关闭功能
- ✅ 多个消息同时显示
- ✅ 响应式设计
- ✅ 暗色主题支持
- ✅ 无障碍访问支持
- ✅ 减少动画模式支持
- ✅ TypeScript 支持

## 安装

组件已包含在项目中，无需额外安装依赖。

## 使用方法

### 1. 基本使用

首先在应用的根组件中添加 `MessageProvider`：

```tsx
import { MessageProvider } from '@/components/Message'

function App() {
  return <MessageProvider>{/* 你的应用内容 */}</MessageProvider>
}
```

### 2. 显示消息

```tsx
import { message } from '@/components/Message'

// 成功消息
message.success('操作成功！')

// 错误消息
message.error('操作失败！')

// 警告消息
message.warning('警告信息！')

// 信息消息
message.info('提示信息！')
```

### 3. 自定义配置

```tsx
message.info('自定义消息', {
  duration: 5, // 5秒后自动消失
  onClose: () => {
    console.log('消息已关闭')
  },
})

// 持久消息（不自动消失）
message.info('这条消息不会自动消失', {
  duration: 0,
})
```

### 4. 在组件中使用

```tsx
import React from 'react'
import { message } from '@/components/Message'

const MyComponent: React.FC = () => {
  const handleSave = async () => {
    try {
      await saveData()
      message.success('保存成功！')
    } catch (error) {
      message.error('保存失败，请重试！')
    }
  }

  return <button onClick={handleSave}>保存</button>
}
```

## API

### message 对象

| 方法                | 说明         | 参数                                        |
| ------------------- | ------------ | ------------------------------------------- |
| `message.success()` | 显示成功消息 | `(content: string, config?: MessageConfig)` |
| `message.error()`   | 显示错误消息 | `(content: string, config?: MessageConfig)` |
| `message.warning()` | 显示警告消息 | `(content: string, config?: MessageConfig)` |
| `message.info()`    | 显示信息消息 | `(content: string, config?: MessageConfig)` |
| `message.destroy()` | 销毁所有消息 | `()`                                        |

### MessageConfig 配置项

| 参数       | 说明                                        | 类型                                          | 默认值   |
| ---------- | ------------------------------------------- | --------------------------------------------- | -------- |
| `content`  | 消息内容                                    | `string`                                      | -        |
| `type`     | 消息类型                                    | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| `duration` | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | `number`                                      | `3`      |
| `key`      | 消息的唯一标识                              | `string`                                      | 自动生成 |
| `onClose`  | 关闭时的回调函数                            | `() => void`                                  | -        |

## 样式定制

组件使用 CSS 变量来支持主题定制：

```css
:root {
  --atori-c-text-1: #333;
  --atori-c-bg-1: #fff;
  --atori-c-border-1: #ddd;
}
```

## 无障碍访问

- 支持键盘导航
- 提供适当的 ARIA 标签
- 支持屏幕阅读器
- 支持高对比度模式

## 浏览器兼容性

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 示例

查看 `example.tsx` 文件获取完整的使用示例。
