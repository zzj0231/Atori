'use client'

import { DeleteIcon } from '@/icon/delete'
import { useGlobSettingState } from '@/store/setting'
import { useCallback } from 'react'

interface OperatorProps {
  id: number | string
  handleDelete: (id: number | string) => void
}
export const ItemOperator = (props: OperatorProps) => {
  const { id, handleDelete } = props
  const isEditAuth = useGlobSettingState(state => state.isEdit)

  const handleClick = useCallback(async () => {
    handleDelete?.(id)
  }, [id, handleDelete])

  return (
    <div className="absolute right-0 top-0 text-[1.2rem] hover:opacity-100 opacity-50">
      {isEditAuth ? (
        <div onClick={handleClick}>
          <DeleteIcon />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
