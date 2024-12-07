import { tweetClPre } from '@/const/style'
import { TE_RECORD } from '@/const/tweets'
import { TweetCard } from '@/features/tweet-card'
import { TweetEdit } from '@/features/tweet-edit'
import { useMemo } from 'react'

import './index.css'

export default function Tweets() {
  const cardItems = useMemo(() => {
    if (TE_RECORD?.length < 1) {
      return []
    }
    return TE_RECORD.map(item => {
      return (
        <TweetCard
          text={item?.note}
          date={item.date}
          key={item.id}
          img={item?.img}
        />
      )
    })
  }, [])
  return (
    <div className={`prose ${tweetClPre}-wrapper`}>
      <h1 className="pg-h1">Tweets</h1>
      <article className="px-sm">
        <div className={`${tweetClPre}-cards`}>{cardItems}</div>
      </article>
      <div className={`${tweetClPre}-edit`}>
        <TweetEdit />
      </div>
    </div>
  )
}
