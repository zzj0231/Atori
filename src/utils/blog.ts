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
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
