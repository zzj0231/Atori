'use client'
import { siteClassPrefix } from '@/const/style'
import { CSSProperties, useMemo, useState } from 'react'

import './index.css'
import { DropTextIcon } from '@/icon/dropText'
import { DropUpTextIcon } from '@/icon/dropUpText'

interface TextDropProps {
  height?: number
  note?: string
  maxWordNum?: number
}

export const TextDrop = (props: TextDropProps) => {
  const { height = 80, note = '', maxWordNum = 120 } = props
  const [toggle, setToggle] = useState(false)

  const textDropStyle: CSSProperties = useMemo(() => {
    return toggle
      ? {
          height: 'max-content',
        }
      : {
          height: height,
          overflow: 'hidden',
        }
  }, [toggle])

  const toggleOperate = useMemo(() => {
    if (note?.length > maxWordNum) {
      return toggle ? (
        <span onClick={() => setToggle(false)}>
          <DropUpTextIcon />
        </span>
      ) : (
        <span onClick={() => setToggle(true)}>
          <DropTextIcon />
        </span>
      )
    } else {
      return <></>
    }
  }, [toggle, maxWordNum])

  const content = useMemo(() => {
    if (note?.length > maxWordNum) {
      return toggle ? note : note?.substring(0, maxWordNum) + '...'
    } else {
      return note
    }
  }, [maxWordNum, toggle])

  return (
    <div className={`${siteClassPrefix}-text-drop`}>
      <div
        className={`${siteClassPrefix}-text-drop-content`}
        style={{ ...textDropStyle }}
      >
        <p className="break-words ">{content}</p>
      </div>
      <div className={`${siteClassPrefix}-text-drop-icon`}>{toggleOperate}</div>
    </div>
  )
}
