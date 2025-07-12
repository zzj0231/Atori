export function isDecimal(num: number) {
  return num.toString().includes('.')
}

export const splitDecimal = (num: number) => {
  if (typeof num !== 'number') {
    return undefined
  }
  if (!isDecimal(num)) {
    return { int: num, deci: 0 }
  }
  const split = num.toString().split('.')
  return { int: Number(split[0]), deci: Number(split[1]) }
}

export const getCurrentTime = (time?: string): string | number => {
  const now = time ? new Date(time) : new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

export const formatCurrentTime = (time?: string): string => {
  const now = time ? new Date(time) : new Date()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[now.getMonth()]
  const date = now.getDate()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const year = now.getFullYear()
  return `${month} ${date} ${hours}:${minutes}, ${year}`
}

/**
 * 检查时间字符串是否符合 formatCurrentTime 函数的输出格式
 * 格式: "Jan 15 14:30, 2024"
 * @param timeString 要检查的时间字符串
 * @returns 是否符合格式
 */
export const isFormatTime = (timeString: string): boolean => {
  if (!timeString || typeof timeString !== 'string') {
    return false
  }

  // 定义月份缩写
  const validMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // 正则表达式匹配格式: "Jan 15 14:30, 2024"
  const timeFormatRegex =
    /^([A-Za-z]{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}),\s+(\d{4})$/

  const match = timeString.match(timeFormatRegex)
  if (!match) {
    return false
  }

  const [, month, day, hour, minute, year] = match

  // 检查月份是否有效
  if (!validMonths.includes(month)) {
    return false
  }

  // 检查日期范围 (1-31)
  const dayNum = parseInt(day, 10)
  if (dayNum < 1 || dayNum > 31) {
    return false
  }

  // 检查小时范围 (00-23)
  const hourNum = parseInt(hour, 10)
  if (hourNum < 0 || hourNum > 23) {
    return false
  }

  // 检查分钟范围 (00-59)
  const minuteNum = parseInt(minute, 10)
  if (minuteNum < 0 || minuteNum > 59) {
    return false
  }

  // 检查年份范围 (合理范围)
  const yearNum = parseInt(year, 10)
  if (yearNum < 1900 || yearNum > 2100) {
    return false
  }

  // 进一步验证日期有效性（考虑月份天数）
  const monthIndex = validMonths.indexOf(month)
  const date = new Date(yearNum, monthIndex, dayNum)

  // 检查日期是否有效（比如 2月30日 是无效的）
  return (
    date.getFullYear() === yearNum &&
    date.getMonth() === monthIndex &&
    date.getDate() === dayNum
  )
}

/**
 * 检查时间字符串是否符合 getCurrentTime 函数的输出格式
 * 格式: "2024-01-15 14:30"
 * @param timeString 要检查的时间字符串
 * @returns 是否符合格式
 */
export const isNormalTime = (timeString: string): boolean => {
  if (!timeString || typeof timeString !== 'string') {
    return false
  }

  // 正则表达式匹配格式: "2024-01-15 14:30"
  const timeFormatRegex = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/

  const match = timeString.match(timeFormatRegex)
  if (!match) {
    return false
  }

  const [, year, month, day, hour, minute] = match

  // 检查月份范围 (01-12)
  const monthNum = parseInt(month, 10)
  if (monthNum < 1 || monthNum > 12) {
    return false
  }

  // 检查日期范围 (01-31)
  const dayNum = parseInt(day, 10)
  if (dayNum < 1 || dayNum > 31) {
    return false
  }

  // 检查小时范围 (00-23)
  const hourNum = parseInt(hour, 10)
  if (hourNum < 0 || hourNum > 23) {
    return false
  }

  // 检查分钟范围 (00-59)
  const minuteNum = parseInt(minute, 10)
  if (minuteNum < 0 || minuteNum > 59) {
    return false
  }

  // 检查年份范围 (合理范围)
  const yearNum = parseInt(year, 10)
  if (yearNum < 1900 || yearNum > 2100) {
    return false
  }

  // 进一步验证日期有效性
  const date = new Date(yearNum, monthNum - 1, dayNum)
  return (
    date.getFullYear() === yearNum &&
    date.getMonth() === monthNum - 1 &&
    date.getDate() === dayNum
  )
}
