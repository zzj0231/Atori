'use client'

import { GlobalEditIcon } from '@/components/Editbutton'
import { reviewClPre } from '@/const/style'
import { DiaryWall } from '@/features/diary-wall'
import { LabelWall } from '@/features/label-wall'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Reviews() {
  const [labels, setLabels] = useState<string[]>([])
  const router = useRouter()

  const handleClick = useCallback(
    (params: { label: string; active: boolean }) => {
      if (params?.active) {
        setLabels([...labels, params?.label])
      } else {
        const newLabels = labels?.filter(l => {
          return l !== params.label
        })
        setLabels(newLabels)
      }
    },
    [labels]
  )

  const handleEdit = useCallback(() => {
    router.push('/reviews/edit')
  }, [router])

  return (
    <>
      <div className={`prose ${reviewClPre}-wrapper`}>
        <h1 className="pg-h1">Reviews</h1>
        <article className="px-sm">
          <LabelWall handleLabelClick={handleClick} />
          <DiaryWall activeLabels={labels} />
        </article>
      </div>
      <GlobalEditIcon onClick={handleEdit} />
    </>
  )
}
