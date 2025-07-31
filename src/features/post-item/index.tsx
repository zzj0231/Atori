import Link from 'next/link'
import { Post } from '@/types/blog'
import { formatDate } from '@/utils/blog'

interface Props {
  post: Post
}

export function PostItem({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-item">
      <article>
        <div className="post-content">
          {/* 语言标签 */}
          {post.frontmatter.lang && post.frontmatter.lang !== 'zh' && (
            <span className="lang-tag">
              {post.frontmatter.lang === 'en' ? '英文' : '日本語'}
            </span>
          )}

          {/* 文章信息 */}
          <div className="post-info">
            <h2 className="post-title">{post.frontmatter.title}</h2>

            {/* 文章元信息 */}
            <div className="post-meta">
              <time dateTime={post.frontmatter.date}>
                {formatDate(post.frontmatter.date, {
                  month: 'short',
                  day: 'numeric',
                })}
              </time>

              {post.frontmatter.duration && (
                <>
                  <span className="post-meta-separator">·</span>
                  <span>{post.frontmatter.duration}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
