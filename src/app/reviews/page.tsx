'use client'

import { GlobalEditIcon } from '@/components/Editbutton'
import { reviewClPre } from '@/const/style'
import { DiaryWall } from '@/features/diary-wall'
import { LabelWall } from '@/features/label-wall'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReviewProps } from '@/types/schema'
import { useGetReviewList } from '@/hooks/reviews/useGetReviewList'
import { deleteReviewItem } from '@/server/reviews'
import { message } from '@/components'
import PageLoading from '@/components/PageLoading'

export default function Reviews() {
  const [labels, setLabels] = useState<string[]>([])

  const router = useRouter()
  const { data, error, isLoading, mutate, isValidating } =
    useGetReviewList('/api/reviews')

  // 处理数据
  const reviews: ReviewProps[] = (() => {
    if (data?.code === 2000 && data?.data) {
      // 确保 data 是 ReviewProps[] 类型
      if (Array.isArray(data.data) && data.data.length > 0) {
        return data.data as ReviewProps[]
      }
    }

    return []
  })()

  const handleClick = useCallback(
    (params: { label: string; active: boolean }) => {
      if (params?.active) {
        setLabels([...labels, params?.label])
      } else {
        const newLabels = labels?.filter(l => {
          return l !== params.label
        })
        setLabels(newLabels)
      }
    },
    [labels]
  )

  const handleEdit = useCallback(() => {
    router.push('/reviews/edit')
  }, [router])

  const handleDelete = useCallback(
    async (id: number | string) => {
      const res = await deleteReviewItem(id)
      if (res?.code === 2000) {
        message.success('删除成功')
        mutate()
      }
    },
    [mutate]
  )

  return (
    <>
      <div className={`prose ${reviewClPre}-wrapper`}>
        <h1 className="pg-h1">Reviews</h1>
        <article className="px-sm">
          <LabelWall handleLabelClick={handleClick} />
          {isLoading ? (
            <PageLoading type="spinner" />
          ) : (
            <DiaryWall
              activeLabels={labels}
              reviews={reviews}
              handleDelete={handleDelete}
            />
          )}
        </article>
      </div>
      <GlobalEditIcon onClick={handleEdit} />
    </>
  )
}
