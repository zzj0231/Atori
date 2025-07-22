import { Post } from '@/types/blog'
import { YearGroup } from '@/features/year-group'

interface Props {
  groupedPosts: Record<string, Post[]>
}

export function PostList({ groupedPosts }: Props) {
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))

  if (years.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {years.map(year => (
        <YearGroup key={year} year={year} posts={groupedPosts[year]} />
      ))}
    </div>
  )
}
