import { getAllTags } from '@/lib/posts'
import Link from 'next/link'

export function TagList() {
  const tags = getAllTags()

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link
            key={tag.slug}
            href={`/blog/tags/${tag.slug}`}
            className="px-3 py-1 text-sm bg-white text-gray-700 rounded-full border hover:bg-gray-100 transition-colors"
          >
            {tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </div>
  )
}
