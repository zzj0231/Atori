/* eslint-disable @typescript-eslint/no-unused-expressions */
import { LabelIcon } from '@/icon/label'
import { useRef, useState } from 'react'
import { reviewClPre } from '@/const/style'
import './index.css'

interface LabelProps {
  name: string
  onClick?: (l: { label: string; active: boolean }) => void
}

export const Label = (props: LabelProps) => {
  const { name, onClick } = props
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    const ele = ref?.current
    if (!active) {
      onClick?.({ label: name, active: true })
      setActive(true)
      ele ? ele.classList.toggle('active') : ''
    } else {
      onClick?.({ label: name, active: false })
      setActive(false)
      ele ? ele.classList.toggle('active') : ''
    }
  }

  return (
    <div
      className={`${reviewClPre}-label flex gap-1 flex-shrink-0`}
      ref={ref}
      onClick={handleClick}
    >
      <div className={`${reviewClPre}-icon`}>
        <LabelIcon />
      </div>
      <span>{name}</span>
    </div>
  )
}
