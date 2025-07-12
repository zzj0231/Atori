'use client'

import { Label } from '@/components/Label'
import { RE_THEME_TYPE } from '@/const/reviews'
import { useMemo } from 'react'

interface LabelWallProps {
  handleLabelClick?: (value: { label: string; active: boolean }) => void
}

export const LabelWall = (props: LabelWallProps) => {
  const { handleLabelClick } = props

  const labelItems = useMemo(() => {
    return RE_THEME_TYPE.map(item => {
      return (
        <Label name={item.label} key={item.key} onClick={handleLabelClick} />
      )
    })
  }, [handleLabelClick])

  return <div className="flex gap-2.5 flex-wrap">{labelItems}</div>
}
