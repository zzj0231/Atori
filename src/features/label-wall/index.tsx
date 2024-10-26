import { Label } from '@/components/Label'
import { RE_THEME_TYPE } from '@/const/reviews'
import { useMemo } from 'react'

export const LabelWall = () => {
  const labelItems = useMemo(() => {
    return RE_THEME_TYPE.map(item => {
      return <Label name={item.label} key={item.key} />
    })
  }, [])

  return <div className="flex gap-2.5 flex-wrap">{labelItems}</div>
}
