'use client'

import { reviewEditClPre } from '@/const/style'
import { ReviewsEditArea } from '@/features/reviews-edit'
import { ArrowLeft } from '@/icon/arrowLeft'
import { useRouter } from 'next/navigation'

export default function ReviewsEdit() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={`prose ${reviewEditClPre}-wrapper`}>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleBack}
          className="mt-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="返回"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="pg-h1">Edit Reviews</h1>
      </div>
      <article className="px-sm">
        <ReviewsEditArea />
      </article>
    </div>
  )
}
