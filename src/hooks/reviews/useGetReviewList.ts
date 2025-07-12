import { fetcher } from '@/lib/utils'
import useSWR from 'swr'

export const useGetReviewList = (url: string) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: false, // 窗口聚焦时不重新验证
      revalidateOnReconnect: true, // 网络重连时重新验证
      refreshInterval: 0, // 不自动刷新
      errorRetryCount: 3, // 错误重试次数
      errorRetryInterval: 1000, // 错误重试间隔
    }
  )

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  }
}
