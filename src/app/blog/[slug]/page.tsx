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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>

          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            {post.frontmatter.duration && (
              <span>· {post.frontmatter.duration}</span>
            )}
            {post.frontmatter.author && (
              <span>· {post.frontmatter.author}</span>
            )}
          </div>

          {post.frontmatter.lang && post.frontmatter.lang !== 'en' && (
            <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
              {post.frontmatter.lang === 'zh' ? '中文' : '日本語'}
            </span>
          )}

          {post.frontmatter.description && (
            <p className="text-lg text-gray-600 mt-4">
              {post.frontmatter.description}
            </p>
          )}
        </header>

        <PostContent content={post.content} />

        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <footer className="mt-8 pt-8 border-t">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Tags:</span>
              {post.frontmatter.tags.map(tag => (
                <a
                  key={tag}
                  href={`/blog/tags/${tag}`}
                  className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </footer>
        )}
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({ slug }))
}
