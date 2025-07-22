import Link from 'next/link'
import { Post } from '@/types/blog'
import { formatDate } from '@/utils/blog'

interface Props {
  post: Post
}

export function PostItem({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group hover:bg-gray-50 p-4 rounded-lg transition-colors"
    >
      <article>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {post.frontmatter.lang && post.frontmatter.lang !== 'en' && (
                <span className="text-xs bg-gray-200 text-gray-600 rounded px-2 py-1">
                  {post.frontmatter.lang === 'zh' ? '中文' : '日本語'}
                </span>
              )}
              <h2 className="text-xl font-medium group-hover:text-blue-600 transition-colors">
                {post.frontmatter.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            {post.frontmatter.duration && (
              <span>· {post.frontmatter.duration}</span>
            )}
          </div>
        </div>

        {post.frontmatter.description && (
          <p className="mt-2 text-gray-600 line-clamp-2">
            {post.frontmatter.description}
          </p>
        )}

        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="mt-2 flex gap-1">
            {post.frontmatter.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {post.frontmatter.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.frontmatter.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </article>
    </Link>
  )
}
