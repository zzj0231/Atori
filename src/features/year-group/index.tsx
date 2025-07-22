import { Post } from '@/types/blog'
import { PostItem } from '@/features/post-item'

interface Props {
  year: string
  posts: Post[]
}

export function YearGroup({ year, posts }: Props) {
  return (
    <div>
      <div className="relative h-20 pointer-events-none mb-8">
        <span className="absolute left-0 top-0 text-8xl font-bold text-gray-100 select-none">
          {year}
        </span>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
