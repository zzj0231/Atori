import MarkdownIt from 'markdown-it'
import { pinyin } from 'pinyin-pro'

// lib/utils.ts
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return new Date(date).toLocaleDateString('en-US', options || defaultOptions)
}

/**
 * 生成文章摘要
 *
 * 将文章内容转换为纯文本，并截取指定长度。
 *
 * @param content - 文章内容
 * @param maxLength - 摘要最大长度（默认 160 字符）
 */
export function generateExcerpt(content: string, maxLength: number = 160) {
  const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ')
  return plainText.length > maxLength
    ? plainText.slice(0, maxLength) + '...'
    : plainText
}

/**
 * 将文本转换为 URL 友好的 slug
 *
 * 移除特殊字符，将空格和连字符标准化，并确保首尾没有连字符。
 *
 * @param text - 要转换的原始文本
 * @returns 转换后的 slug 字符串
 *
 * @example
 * ```typescript
 * slugify("Hello World!") // "hello-world"
 * slugify("React & Next.js") // "react-nextjs"
 * slugify("  Multiple   Spaces  ") // "multiple-spaces"
 * slugify("Special@#$%Characters") // "specialcharacters"
 * slugify("-Leading-Trailing-") // "leading-trailing"
 * ```
 * 待改进:只保留英文有可能重复
 */
export function slugify(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return ''

  const hasChinese = /[\u4e00-\u9fff]/.test(trimmed)
  const hasLatin = /[A-Za-z]/.test(trimmed)

  // 纯中文：转拼音；中英混排：去掉中文，仅保留英文/数字
  const source =
    hasChinese && !hasLatin
      ? pinyin(trimmed, {
          toneType: 'none',
          type: 'array',
          pattern: 'first',
        }).join('')
      : hasChinese && hasLatin
        ? trimmed.replace(/[\u4e00-\u9fff]/g, '')
        : trimmed

  const normalized = source.toLowerCase().normalize('NFKD')

  return normalized
    .replace(/[\u0300-\u036f]/g, '') // 去掉音标
    .replace(/[^\w\s-\u4e00-\u9fff]/g, '') // 保留中英文、数字、空格/下划线/连字符
    .replace(/[\s_-]+/g, '-') // 合并空白和下划线
    .replace(/^-+|-+$/g, '') // 去掉首尾连字符
}

/**
 * 提取 Markdown 中的标题及其级别
 *
 * 遍历 Markdown 解析后的标记树，提取所有标题及其级别。
 *
 * @param md - MarkdownIt 实例
 * @param content - 文章内容
 * @returns 标题数组，每个标题包含级别、文本和 slug
 */
export function extractHeadings(md: MarkdownIt, content: string) {
  const tokens = md.parse(content, {})
  const headings = []
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.type === 'heading_open') {
      const level = Number(t.tag.replace('h', '')) // h2/h3...
      const inline = tokens[i + 1]
      const text =
        inline.children
          ?.filter(c => c.type === 'text' || c.type === 'code_inline')
          .map(c => c.content)
          .join('') || ''
      const slug = slugify(text)
      headings.push({ level, text, slug })
    }
  }
  return headings
}
