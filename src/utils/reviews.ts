import { COUNTRIES } from '@/const/reviews'
import { ReviewProps } from '@/types/schema'
import { formatCurrentTime, isFormatTime } from './common'

// 将数据库的 ReviewProps 转换为显示格式
export const processReviews = (reviews: ReviewProps[] | undefined) => {
  if (!reviews || reviews?.length < 1) {
    return []
  }
  return reviews.map(review => {
    const { country, labels = '', date = '', ...rest } = review
    const labelList = Array.isArray(labels) ? labels : labels?.split(',') || []
    const formatDate = isFormatTime(date) ? date : formatCurrentTime(date)
    const countryName = COUNTRIES.find(item => item.code === country)?.name
    return {
      ...rest,
      date: formatDate,
      country: countryName,
      labels: labelList,
    }
  })
}
