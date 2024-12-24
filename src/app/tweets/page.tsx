import { tweetClPre } from '@/const/style'
import { TweetCard } from '@/features/tweet-card'
import { TweetEdit } from '@/features/tweet-edit'

import './index.css'
import { getExistTweets } from '@/server/tweets'

export default async function Tweets() {
  const res = await getExistTweets()

  const getCardItems = () => {
    if (res?.length < 1) {
      return []
    }
    return res.map(item => {
      return (
        <TweetCard
          text={item?.note}
          date={item.date}
          key={item.id}
          img={item?.img}
          id={item?.id || 0}
        />
      )
    })
  }

  return (
    <div className={`prose ${tweetClPre}-wrapper`}>
      <h1 className="pg-h1">Tweets</h1>
      <article className="px-sm">
        <div className={`${tweetClPre}-cards`}>{getCardItems()}</div>
      </article>
      <div className={`${tweetClPre}-edit`}>
        <TweetEdit />
      </div>
    </div>
  )
}
