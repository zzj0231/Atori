import { DiaryItem } from '@/components/DiaryItem'
import { RE_BLUM } from '@/const/reviews'
import { useMemo } from 'react'

import './index.css'

interface DiaryWallProps {
  activeLabels?: string[]
}

export const DiaryWall = (props: DiaryWallProps) => {
  const { activeLabels = [] } = props

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
    //prettier-ignore
    const blumWithFilter = activeLabels?.length < 1? RE_BLUM : RE_BLUM.filter(item =>  matchLabel(item.labels, activeLabels))
    return blumWithFilter.map(item => {
      return <DiaryItem {...item} key={item.key} />
    })
  }, [activeLabels])

  return <div className="diary-wall animate-op-move">{diaryItems}</div>
}
