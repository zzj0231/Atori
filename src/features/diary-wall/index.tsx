import { DiaryItem } from '@/components/DiaryItem'
import { RE_BLUM } from '@/const/reviews'
import { useMemo } from 'react'
import { ReviewProps } from '@/types/schema'

import './index.css'
import { processReviews } from '@/utils/reviews'

interface DiaryWallProps {
  activeLabels?: string[]
  reviews?: ReviewProps[]
  handleDelete: (id: number | string) => void
}

export const DiaryWall = (props: DiaryWallProps) => {
  const { activeLabels = [], reviews, handleDelete } = props

  const matchLabel = (labels: string[], filterLabels: string[]) => {
    if (filterLabels?.length < 1 || labels?.length < 1) {
      return true
    }
    let match = false
    labels.forEach(item => {
      filterLabels?.includes(item) ? (match = true) : ''
    })
    return match
  }

  const diaryItems = useMemo(() => {
    // 处理数据格式转换 如果数据库有数据，则使用数据库数据，否则使用静态数据
    const processedData = processReviews(reviews)
    const reviewList = processedData?.length > 0 ? processedData : RE_BLUM
    //prettier-ignore
    const filteredData = activeLabels?.length < 1 ? reviewList : reviewList.filter(item => matchLabel(item.labels, activeLabels))
    return filteredData.map(item => {
      // Ensure country is not undefined before passing to DiaryItem
      return (
        <DiaryItem
          {...item}
          key={item.id}
          country={item.country || ''}
          id={item.id}
          handleDelete={handleDelete}
        />
      )
    })
  }, [activeLabels, reviews, handleDelete])

  return <div className="diary-wall animate-op-move">{diaryItems}</div>
}
