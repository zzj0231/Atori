import { DiaryItem } from '@/components/DiaryItem'
import { RE_BLUM } from '@/const/reviews'
import { useMemo } from 'react'

export const DiaryWall = () => {
  const diaryItems = useMemo(() => {
    return RE_BLUM.map(item => {
      return <DiaryItem {...item} key={item.key} />
    })
  }, [])

  return <div>{diaryItems}</div>
}
