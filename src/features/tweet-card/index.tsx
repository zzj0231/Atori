import { tweetClPre } from '@/const/style'
import Image, { StaticImageData } from 'next/image'
import './index.css'
import { ItemOperator } from './operator'

interface TweetCardProps {
  text: string
  date: string
  img?: string | StaticImageData
  id: number | string
}

export const TweetCard = (props: TweetCardProps) => {
  const { text, date, img, id } = props
  return (
    <div className={`${tweetClPre}-card pl-md`}>
      <pre className="break-all whitespace-pre-line opacity-80 font-normal">
        {text}
      </pre>
      {img ? (
        <div className={`${tweetClPre}-card-img-item dark:opacity-70`}>
          <Image
            src={img}
            alt="img"
            placeholder="blur"
            quality={100}
            fill
            objectFit="cover"
          />
        </div>
      ) : (
        <></>
      )}
      <div className="opacity-50 pt-sm pl-ssm text-sm flex gap-2 items-center">
        {date}
        <ItemOperator id={id} />
      </div>
    </div>
  )
}
