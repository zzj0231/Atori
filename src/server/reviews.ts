'use server'

import { revalidateTag, unstable_cache } from 'next/cache'

import { db } from '@/db'
import { RE_BLUM, REVALIDATE_REVIEW_KEY } from '@/const/reviews'
import { deleteReviewById, getReviews, postReview } from '@/lib/queries'
import { ReviewProps } from '@/types/schema'
import { formatCurrentTime } from '@/utils/common'

export const getExistReviews = unstable_cache(
  async () => {
    const dBClient = await db.connect()
    try {
      const existReviews = await getReviews(dBClient)
      const data = existReviews?.result?.data
      data
        ?.sort((a, b) => {
          const time1 = new Date(a.date)
          const time2 = new Date(b.date)
          return -(time1.getTime() - time2.getTime())
        })
        .forEach(item => {
          const date = formatCurrentTime(item?.date)
          item.date = date
        })
      return data?.length < 1 ? RE_BLUM : data
    } catch (e) {
      console.error('error: happens some errors when get reviews')
      return RE_BLUM
    }
  },
  [REVALIDATE_REVIEW_KEY],
  { revalidate: 3600, tags: [REVALIDATE_REVIEW_KEY] }
)

export async function postNewReviews(data: ReviewProps) {
  const dBClient = await db.connect()
  const success = { code: 2000, msg: 'success' }
  const fail = { code: 5000, msg: 'error' }
  try {
    const respoce = await postReview(data, dBClient)
    const { isFinish, error } = respoce
    // 重新请求数据
    revalidateTag(REVALIDATE_REVIEW_KEY)
    if (isFinish) {
      return success
    } else {
      return fail
    }
  } catch (e) {
    console.error('error: happens some errors when post reviews')
    return fail
  }
}

export async function deleteReviewItem(id: number | string) {
  const dBClient = await db.connect()
  const success = { code: 2000, msg: 'success' }
  const fail = { code: 5000, msg: 'error' }
  try {
    const respoce = await deleteReviewById(id, dBClient)
    const { isFinish, error } = respoce
    // 重新请求数据
    revalidateTag(REVALIDATE_REVIEW_KEY)
    if (isFinish) {
      return success
    } else {
      return fail
    }
  } catch (e) {
    console.error('error: happens some errors when delete reviews')
    return fail
  }
}
