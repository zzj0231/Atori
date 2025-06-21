'use client'

import { Model } from '@/components/Model'
import { useCallback, useRef, useState } from 'react'

import { formatCurrentTime } from '@/utils/common'
import { TweetsProps } from '@/types/schema'
import './index.css'
import { postNewTweets } from '@/server/tweets'
import { GlobalEditIcon } from '@/components/Editbutton'
import { useRouter } from 'next/navigation'

export const TweetEdit = () => {
  const [visible, setVisible] = useState(false)
  const recordRef = useRef<string>()

  const router = useRouter()

  const handleClose = () => {
    setVisible(false)
  }

  const handleOk = useCallback(async () => {
    const content = recordRef.current || ''
    if (!content) {
      return
    }
    const currentTime = formatCurrentTime()
    const res: TweetsProps = {
      note: content,
      date: currentTime,
      img: '',
      author: 'zhijiang.zhao',
      private: false,
      id: currentTime,
    }
    const { code } = await postNewTweets(res)
    if (code === 2000) {
      setVisible(false)
    }
  }, [])

  const handleEdit = () => {
    // setVisible(true)
    router.push('/tweets/edit')
  }

  const handleChange = useCallback((e: { target: { value: string } }) => {
    const content = e?.target?.value
    if (typeof content === 'string') {
      recordRef.current = content
    }
  }, [])

  return (
    <>
      <GlobalEditIcon onClick={handleEdit} />
      {/* <Model
        visible={visible}
        onCancel={handleClose}
        onOk={handleOk}
        title="想法"
        okText="记录"
        destoryOnClose
      >
        <textarea
          placeholder="thinking..."
          className="tweet-edit-textera"
          minLength={200}
          onChange={handleChange}
        />
      </Model> */}
    </>
  )
}
