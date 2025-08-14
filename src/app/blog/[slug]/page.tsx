import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import { PostContent } from '@/features/post-content'
import { notFound } from 'next/navigation'
import { formatDate } from '@/utils/blog'
import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || ''],
    },
  }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto px-4 py-8">
      <div className="prose prose--blog mb-[4rem]">
        <h1 className="!mb-1">{post.frontmatter.title}</h1>
        <div className="flex items-center gap-2 mb-4 opacity-60">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          {post.frontmatter.duration && (
            <span>· {post.frontmatter.duration}</span>
          )}
          {post.frontmatter.lang && post.frontmatter.lang !== 'en' && (
            <span
              className="inline-block px-1 py-1 text-xs rounded"
              style={{
                backgroundColor: 'var(--atori-c-bg-deep)',
              }}
            >
              {post.frontmatter.lang === 'zh' ? '中文' : '日本語'}
            </span>
          )}
        </div>
      </div>
      <article className="prose prose--blog">
        <PostContent content={post.content} />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({ slug }))
}
