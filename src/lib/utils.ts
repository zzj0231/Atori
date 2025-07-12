import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 项目的 fetcher 函数
export const fetcher = async (url: string) => {
  const response = await fetch(url)
  const result = await response.json()

  if (result.code !== 2000) {
    throw new Error(result.error || 'Failed to fetch reviews')
  }

  return result
}
