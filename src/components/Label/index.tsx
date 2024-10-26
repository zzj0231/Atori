'use client'

import { LabelIcon } from '@/icon/label'
import { useState } from 'react'

import './index.css'
import { reviewClPre } from '@/const/style'

interface LabelProps {
  name: string
  onClick?: (l: { label: string; active: boolean }) => void
}

export const Label = (props: LabelProps) => {
  const { name } = props
  const [active, setActive] = useState(false)

  return (
    <div className={`${reviewClPre}-label flex gap-1 flex-shrink-0`}>
      <div className={`${reviewClPre}-icon`}>
        <LabelIcon />
      </div>
      <span>{name}</span>
    </div>
  )
}
