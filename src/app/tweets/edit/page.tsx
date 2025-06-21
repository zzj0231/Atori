'use client'

import { ArrowLeft } from '@/icon/arrowLeft'
import { postNewTweets } from '@/server/tweets'
import { TweetsProps } from '@/types/schema'
import { formatCurrentTime } from '@/utils/common'
import { useRouter } from 'next/navigation'
import { useCallback, useRef } from 'react'
import './index.css'

export default function TweetsEdit() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const recordRef = useRef<string>()
  const handleChange = useCallback((e: { target: { value: string } }) => {
    const content = e?.target?.value
    if (typeof content === 'string') {
      recordRef.current = content
    }
  }, [])

  const handleClose = () => {
    handleBack?.()
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
      handleClose?.()
    }
  }, [])

  return (
    <>
      <div className={`prose`}>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="mt-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="返回"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="pg-h1">Edit Tweets</h1>
        </div>
        <article className="px-sm">
          <div className="flex tweets-edit-wrapper">
            <div className="w-[70rem] flex flex-col gap-4 relative">
              {/* 矩形保存按钮 - 绝对定位在顶部 */}
              <button
                onClick={handleOk}
                className="absolute right-0 top-[-7rem] px-3 py-1.5 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 z-50 save-button"
                title="保存评论"
              >
                保存
              </button>

              {/* 评论内容输入框 */}
              <div className="flex flex-col gap-2 flex-1">
                <textarea
                  placeholder="thinging..."
                  className="w-full flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none tweets-edit-textarea"
                  style={{
                    minHeight: '40rem',
                  }}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
