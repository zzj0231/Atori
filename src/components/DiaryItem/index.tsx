import { reviewClPre } from '@/const/style'
import './index.css'
import Image, { StaticImageData } from 'next/image'

interface DiaryProps {
  name: string
  cover: StaticImageData
  author: string
  note: string
  stars: number
  labels: string[]
}

export const DiaryItem = (props: DiaryProps) => {
  const { name, cover, author } = props

  return (
    <div className={`${reviewClPre}-diary flex`}>
      <div className={`${reviewClPre}-cover`}>
        <Image src={cover} alt="cover" />
      </div>
      <div className={`${reviewClPre}-content`}>
        <div className={`${reviewClPre}-name`}>
          <h1 className="opacity-80">{name}</h1>
        </div>
        <p className="text-xl opacity-70">{author}</p>
        <p></p>
      </div>
    </div>
  )
}
