import { getAllPosts, groupPostsByYear } from '@/lib/posts'
import { PostList } from '@/features/post-list'
import { blogClPre } from '@/const/style'
import './index.css'

export default async function Blog() {
  const posts = getAllPosts()
  const groupedPosts = groupPostsByYear(posts)

  return (
    <div className={`prose ${blogClPre}-wrapper`}>
      <h1 className="pg-h1">Blog</h1>
      <article className="pg-sm">
        <div className={`${blogClPre}-post-area animate-op-move`}>
          <div className={`${blogClPre}-post-list`}>
            <PostList groupedPosts={groupedPosts} />
          </div>
        </div>
      </article>
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
