import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

import { BLOG_CONFIG } from '@/const/blog'
import { getAllPosts } from '@/lib/posts'

import { ReviewProps } from '@/types/schema'
import { getExistReviews } from '@/server/reviews'

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

const renderMarkdownToHtml = async (markdown: string) => {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown)
  return processed.toString().trim()
}

const wrapInCdata = (value: string) =>
  `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`

const buildItem = async (post: ReturnType<typeof getAllPosts>[number]) => {
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const description =
    post.frontmatter.description || post.excerpt || 'Read more on Atori.'
  const categories = (post.frontmatter.tags || [])
    .map(tag => `<category>${escapeXml(tag)}</category>`)
    .join('')
  const contentHtml = await renderMarkdownToHtml(post.content)

  return `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
      ${categories}
      <content:encoded>${wrapInCdata(contentHtml)}</content:encoded>
    </item>
  `
}

const buildReviewItem = (review: ReviewProps) => {
  const reviewUrl = `${siteUrl}/reviews`
  return `
    <item>
      <title>笔记: ${escapeXml(review.title)}</title>
      <author>${escapeXml(review.author)}</author>
      <link>${reviewUrl}</link>
      <guid isPermaLink="true">${reviewUrl}</guid>
      <pubDate>${new Date(review.date).toUTCString()}</pubDate>
      <description> ${escapeXml(review.labels)}</description>
      <category>${escapeXml(review.country)}</category>
      <media:content url="${review.cover}" type="image/png" />
      <content:encoded>${escapeXml(review.content)}</content:encoded>
    </item>
  `
}

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const posts = getAllPosts()
  const reviews = await getExistReviews()
  const items = (await Promise.all(posts.map(buildItem))).join('\n')
  const reviewItems = (reviews?.map(buildReviewItem) || []).join('\n')
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(BLOG_CONFIG.title)}</title>
    <link>${siteUrl}</link>
    <description> A personal blog about tech, life and other random thoughts.</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
    ${reviewItems}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
