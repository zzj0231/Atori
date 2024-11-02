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
