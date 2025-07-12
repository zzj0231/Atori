# PageLoading 页面加载组件

一个适配项目样式的现代化页面加载组件，支持多种加载动画和主题。

## 特性

- 🎨 **多种加载类型**: 支持 spinner、dots、pulse、wave、skeleton 五种加载动画
- 📏 **三种尺寸**: small、medium、large 三种尺寸可选
- 🌓 **主题适配**: 自动适配项目的明暗主题
- 📱 **响应式设计**: 支持移动端和桌面端
- ♿ **无障碍支持**: 支持减少动画和高对比度模式
- 🎯 **灵活配置**: 支持全屏显示、自定义文本、遮罩透明度等

## 安装

组件已包含在项目中，直接导入即可使用：

```tsx
import PageLoading from '@/components/PageLoading'
```

## 基础用法

### 默认加载器

```tsx
import PageLoading from '@/components/PageLoading'

function MyComponent() {
  return (
    <div>
      <PageLoading />
    </div>
  )
}
```

### 指定加载类型

```tsx
<PageLoading type="dots" />
<PageLoading type="pulse" />
<PageLoading type="wave" />
<PageLoading type="skeleton" />
```

### 不同尺寸

```tsx
<PageLoading size="small" />
<PageLoading size="medium" />
<PageLoading size="large" />
```

### 自定义文本

```tsx
<PageLoading text="正在加载数据..." />
<PageLoading text="请稍候..." showText={true} />
```

### 全屏加载

```tsx
<PageLoading fullscreen={true} text="正在加载页面..." maskOpacity={0.7} />
```

## API

### Props

| 参数        | 说明             | 类型                                                     | 默认值        |
| ----------- | ---------------- | -------------------------------------------------------- | ------------- |
| type        | 加载类型         | `'spinner' \| 'dots' \| 'pulse' \| 'wave' \| 'skeleton'` | `'spinner'`   |
| text        | 加载文本         | `string`                                                 | `'加载中...'` |
| showText    | 是否显示加载文本 | `boolean`                                                | `true`        |
| className   | 自定义类名       | `string`                                                 | `''`          |
| fullscreen  | 是否全屏显示     | `boolean`                                                | `false`       |
| maskOpacity | 背景遮罩透明度   | `number`                                                 | `0.6`         |
| size        | 加载器大小       | `'small' \| 'medium' \| 'large'`                         | `'medium'`    |
| style       | 自定义样式       | `React.CSSProperties`                                    | `undefined`   |

## 加载类型说明

### 1. Spinner (旋转器)

经典的圆形旋转加载器，适合大多数场景。

### 2. Dots (点点)

三个跳动的圆点，适合轻量级加载场景。

### 3. Pulse (脉冲)

脉冲式圆形加载器，适合强调加载状态。

### 4. Wave (波浪)

音频波形样式的加载器，适合媒体相关场景。

### 5. Skeleton (骨架屏)

骨架屏样式的加载器，适合内容加载场景。

## 使用场景

### 页面初始加载

```tsx
function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟页面加载
    setTimeout(() => setIsLoading(false), 2000)
  }, [])

  if (isLoading) {
    return <PageLoading fullscreen={true} text="正在加载应用..." />
  }

  return <div>应用内容</div>
}
```

### 数据加载

```tsx
function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData().then(data => {
      setData(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <PageLoading type="dots" text="正在获取数据..." />
  }

  return <div>{/* 数据展示 */}</div>
}
```

### 表单提交

```tsx
function FormComponent() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async data => {
    setSubmitting(true)
    try {
      await submitForm(data)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
      <button type="submit" disabled={submitting}>
        {submitting ? (
          <PageLoading type="spinner" size="small" showText={false} />
        ) : (
          '提交'
        )}
      </button>
    </form>
  )
}
```

## 样式定制

组件使用项目的CSS变量，会自动适配主题。如需自定义样式，可以通过 `className` 或 `style` 属性：

```tsx
<PageLoading
  className="my-custom-loading"
  style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
/>
```

## 无障碍支持

- 支持 `prefers-reduced-motion` 媒体查询，在用户选择减少动画时禁用动画
- 支持 `prefers-contrast: high` 高对比度模式
- 使用语义化的HTML结构

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 示例

查看 `example.tsx` 文件获取完整的使用示例和演示。
