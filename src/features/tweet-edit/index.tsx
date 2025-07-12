'use client'

import { GlobalEditIcon } from '@/components/Editbutton'
import { useRouter } from 'next/navigation'
import './index.css'

export const TweetEdit = () => {
  const router = useRouter()

  const handleEdit = () => {
    router.push('/tweets/edit')
  }

  return (
    <>
      <GlobalEditIcon onClick={handleEdit} />
    </>
  )
}
