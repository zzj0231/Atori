import { Post } from '@/types/blog'
import { PostItem } from '@/features/post-item'

interface Props {
  year: string
  posts: Post[]
}

export function YearGroup({ year, posts }: Props) {
  return (
    <div className="year-group">
      {/* 年份背景 */}
      <div className="year-background">{year}</div>

      {/* 文章列表 */}
      <div className="posts-container">
        {posts.map(post => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
