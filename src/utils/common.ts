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
