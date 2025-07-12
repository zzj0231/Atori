import { BLUR_PLACEHOLDER, reviewClPre } from '@/const/style'
import Image, { StaticImageData } from 'next/image'
import { useMemo } from 'react'
import './index.css'
import { splitDecimal } from '@/utils/common'
import { StarIcon } from '@/icon/star'
import { HalfStarIcon } from '@/icon/halfStar'
import { BlankStarIcon } from '@/icon/blankStar'
import { TextDrop } from '../TextDrop'
import { ItemOperator } from './operator'

interface DiaryProps {
  title: string
  cover: StaticImageData | string
  author: string
  content: string
  country: string
  stars?: number
  labels: string[]
  date?: string
  id: number | string
  handleDelete: (id: number | string) => void
}

export const DiaryItem = (props: DiaryProps) => {
  const {
    title,
    cover,
    author,
    labels,
    stars = 3,
    date = '',
    content,
    country,
    id,
    handleDelete,
  } = props

  const authorWithCountry = useMemo(() => {
    return `${country} / ${author}`
  }, [country, author])

  const labelItem = useMemo(() => {
    if (labels?.length < 1) {
      return <></>
    }
    return labels?.map(item => {
      return (
        <span className={'read-label-item'} key={item}>
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
    const fullStars = Array(int).fill(1).map((item,index) => {
      return <div className='star-item' key={index}>
        <StarIcon/>
      </div>
    })
    // prettier-ignore
    const halStars = deci?[1].map( (item,index) => {
      return (
        <div className="star-item" key={index} >
          <HalfStarIcon/>
        </div>
      )
    }):[];
    // prettier-ignore
    const blankStars = blankNum > 0? Array(blankNum).fill(1).map((item,index) => {
      return <div className="star-item" key={index}><BlankStarIcon/></div>
    }) :[]
    return [...fullStars, ...halStars, ...blankStars]
  }, [stars])

  return (
    <div className={`${reviewClPre}-diary flex`}>
      <div className={`${reviewClPre}-cover dark:opacity-70`}>
        <Image
          src={cover}
          alt="cover"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          quality={100}
          fill
          objectFit="cover"
        />
      </div>
      <div className={`${reviewClPre}-content`}>
        <div className={`${reviewClPre}-name`}>
          <h1 className="opacity-80">{title}</h1>
          <div className="read-labels">{labelItem}</div>
        </div>
        <p className="text-sm opacity-60">{authorWithCountry}</p>
        <div className={`${reviewClPre}-notes`}>
          <TextDrop note={content} />
        </div>
        <div className={`${reviewClPre}-infos`}>
          <div className={`${reviewClPre}-date`}>{date}</div>
          <ItemOperator id={id} handleDelete={handleDelete} />
          {/* <div className={`${reviewClPre}-stars`}>{startItems}</div> */}
        </div>
      </div>
    </div>
  )
}
