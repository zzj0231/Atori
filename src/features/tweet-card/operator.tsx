'use client'

import { message } from '@/components/Message'
import { DeleteIcon } from '@/icon/delete'
import { deleteTweetItem } from '@/server/tweets'
import { useGlobSettingState } from '@/store/setting'
import { useCallback } from 'react'

interface OperatorProps {
  id: number | string
}
export const ItemOperator = (props: OperatorProps) => {
  const { id } = props
  const isEditAuth = useGlobSettingState(state => state.isEdit)

  const handleDelete = useCallback(async () => {
    const res = await deleteTweetItem(id)
    if (res?.code === 2000) {
      message.success('删除成功')
    }
  }, [id])

  return (
    <div className="tweet-item-operate">
      <div className="tweet-item-operate-icon">
        {isEditAuth ? (
          <div onClick={handleDelete}>
            <DeleteIcon />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
