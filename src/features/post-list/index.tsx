import { Post } from '@/types/blog'
import { YearGroup } from '@/features/year-group'

interface Props {
  groupedPosts: Record<string, Post[]>
}

export function PostList({ groupedPosts }: Props) {
  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))

  if (years.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <p className="empty-state-text">暂无文章</p>
      </div>
    )
  }

  return (
    <div>
      {years.map(year => (
        <YearGroup key={year} year={year} posts={groupedPosts[year]} />
      ))}
    </div>
  )
}
