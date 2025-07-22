import { getAllPosts, groupPostsByYear } from '@/lib/posts'
import { PostList } from '@/features/post-list'
import { TagList } from '@/features/tag-list'

export default async function Blog() {
  const posts = getAllPosts()
  const groupedPosts = groupPostsByYear(posts)

  console.log('groupedPosts', groupedPosts, 'posts', posts)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600">
          Thoughts, stories and ideas about software development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* <SearchPosts posts={posts} /> */}
          <PostList groupedPosts={groupedPosts} />
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-8">
            <TagList />
          </div>
        </aside>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}

// const dBClient = await db.connect()
// const isDeleteReviews = await deleteTable(AtroiSchema.REVIEWS, dBClient)
// const isCreateReviews = await createReviews(dBClient)
// console.log(isDeleteReviews, isCreateReviews)
