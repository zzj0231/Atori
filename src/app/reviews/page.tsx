import { reviewClPre } from '@/const/style'
import { LabelWall } from '@/features/label-wall'

export default function Reviews() {
  return (
    <div className={`prose ${reviewClPre}-wrapper`}>
      <h1 className="pg-h1">Reviews</h1>
      <article className="px-sm">
        <LabelWall />
      </article>
    </div>
  )
}
