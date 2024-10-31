import { reviewClPre } from '@/const/style'
import Image, { StaticImageData } from 'next/image'
import { useMemo } from 'react'
import './index.css'
import { splitDecimal } from '@/utils/common'
import { StarIcon } from '@/icon/star'
import { HalfStarIcon } from '@/icon/halfStar'
import { BlankStarIcon } from '@/icon/blankStar'

interface DiaryProps {
  name: string
  cover: StaticImageData
  author: string
  note: string
  stars: number
  labels: string[]
  date?: string
}

export const DiaryItem = (props: DiaryProps) => {
  const { name, cover, author, labels, stars = 3, date = '' } = props

  const labelItem = useMemo(() => {
    if (labels?.length < 1) {
      return <></>
    }
    return labels?.map(item => {
      return (
        <span className={'read-label-item'}>
          <span className="opacity-80">{item}</span>
        </span>
      )
    })
  }, [labels])

  const startItems = useMemo(() => {
    const split = splitDecimal(stars)
    if (!split) {
      return <></>
    }
    const { int, deci } = split
    const blankNum = 5 - int - (deci ? 1 : 0)
    // prettier-ignore
    const fullStars = Array(int).fill(1).map((item) => {
      return <div className='star-item'>
        <StarIcon/>
      </div>
    })
    // prettier-ignore
    const halStars = deci?[1].map( item => {
      return (
        <div className="star-item">
          <HalfStarIcon/>
        </div>
      )
    }):[];
    // prettier-ignore
    const blankStars = blankNum > 0? Array(blankNum).fill(1).map((item) => {
      return <div className="star-item"><BlankStarIcon/></div>
    }) :[]
    return [...fullStars, ...halStars, ...blankStars]
  }, [stars])

  return (
    <div className={`${reviewClPre}-diary flex`}>
      <div className={`${reviewClPre}-cover`}>
        <Image src={cover} alt="cover" />
      </div>
      <div className={`${reviewClPre}-content`}>
        <div className={`${reviewClPre}-name`}>
          <h1 className="opacity-80">{name}</h1>
          <div className="read-labels">{labelItem}</div>
        </div>
        <p className="text-xl opacity-70">{author}</p>
        <p className={`${reviewClPre}-notes`}></p>
        <div className={`${reviewClPre}-infos`}>
          <div className={`${reviewClPre}-stars`}>{startItems}</div>
          <div className={`${reviewClPre}-date`}>{date}</div>
        </div>
      </div>
    </div>
  )
}
