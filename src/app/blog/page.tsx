import { db } from '@/db'
import { AtroiSchema, createReviews, deleteTable } from '@/lib/schema'

export default async function Blog() {
  const dBClient = await db.connect()
  // const isDeleteReviews = await deleteTable(AtroiSchema.REVIEWS, dBClient)
  // const isCreateReviews = await createReviews(dBClient)
  // console.log(isDeleteReviews, isCreateReviews)
  return (
    <>
      <div className="flex items-center flex-col gap-3">
        <span className="opacity-50">施工中...</span>
      </div>

      {/* <div>
        <Demo />
      </div> */}
    </>
  )
}
