import { tweetClPre } from '@/const/style'
import Image, { StaticImageData } from 'next/image'
import './index.css'

interface TweetCardProps {
  text: string
  date: string
  img?: string
}

export const TweetCard = (props: TweetCardProps) => {
  const { text, date, img } = props
  return (
    <div className={`${tweetClPre}-card pl-md`}>
      <pre className="break-all whitespace-pre-line opacity-80">{text}</pre>
      {img ? (
        <Image
          src={img}
          alt="img"
          placeholder="blur"
          quality={100}
          width={160}
          height={160}
        />
      ) : (
        <></>
      )}
      <div className="opacity-50 pt-sm pl-ssm text-xl">{date}</div>
    </div>
  )
}
