'use server'

import { revalidateTag, unstable_cache } from 'next/cache'

import { REVALIDATE_TWEET_KEY, TE_RECORD } from '@/const/tweets'
import { db } from '@/db'
import { deleteTweetById, getTweets, postTweets } from '@/lib/queries'
import { TweetsProps } from '@/types/schema'
import { formatCurrentTime } from '@/utils/common'

export const getExistTweets = unstable_cache(
  async () => {
    const dBClient = await db.connect()
    try {
      const existTweets = await getTweets(dBClient)
      const data = existTweets?.result?.data
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
      return data?.length < 1 ? TE_RECORD : data
    } catch (e) {
      console.error('error: happens some errors when get tweets')
      return TE_RECORD
    }
  },
  [REVALIDATE_TWEET_KEY],
  { revalidate: 3600, tags: [REVALIDATE_TWEET_KEY] }
)

export async function postNewTweets(data: TweetsProps) {
  const dBClient = await db.connect()
  const success = { code: 2000, msg: 'success' }
  const fail = { code: 5000, msg: 'error' }
  try {
    const respoce = await postTweets(data, dBClient)
    const { isFinish, error } = respoce
    // 重新请求数据
    revalidateTag(REVALIDATE_TWEET_KEY)
    if (isFinish) {
      return success
    } else {
      return fail
    }
  } catch (e) {
    console.error('error: happens some errors when post tweets')
    return fail
  }
}

export async function deleteTweetItem(id: number | string) {
  const dBClient = await db.connect()
  const success = { code: 2000, msg: 'success' }
  const fail = { code: 5000, msg: 'error' }
  try {
    const respoce = await deleteTweetById(id, dBClient)
    const { isFinish, error } = respoce
    // 重新请求数据
    revalidateTag(REVALIDATE_TWEET_KEY)
    if (isFinish) {
      return success
    } else {
      return fail
    }
  } catch (e) {
    console.error('error: happens some errors when delete tweets')
    return fail
  }
}
