import { BLOG_CONFIG } from '@/const/blog'
import { getAllPosts } from '@/lib/posts'

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, '')

const siteUrl = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_SITE_URL || BLOG_CONFIG.url
)

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const buildItem = (post: ReturnType<typeof getAllPosts>[number]) => {
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const description =
    post.frontmatter.description || post.excerpt || 'Read more on Atori.'
  const categories = (post.frontmatter.tags || [])
    .map(tag => `<category>${escapeXml(tag)}</category>`)
    .join('')

  return `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
      ${categories}
    </item>
  `
}

export const dynamic = 'force-static'
export const revalidate = 3600

export function GET() {
  const posts = getAllPosts()
  const items = posts.map(buildItem).join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BLOG_CONFIG.title)}</title>
    <link>${siteUrl}</link>
    <description> A personal blog about tech, life and other random thoughts.</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
