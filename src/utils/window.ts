export const autoUpdateRootFontSize = () => {
  if (typeof window === undefined || typeof document === undefined) {
    return
  }
  if (!document.addEventListener) return
  const docEl = document.documentElement
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= 640) {
      docEl.style.fontSize = '10px'
    } else {
      const base = Number((12 * (clientWidth / 640)).toFixed(2))
      docEl.style.fontSize = (base > 10 ? 10 : base < 8.75 ? 8.75 : base) + 'px'
    }
  }
  window.addEventListener(resizeEvt, recalc, false)
  window.addEventListener('DOMContentLoaded', recalc, false)

  return () => {
    window.removeEventListener(resizeEvt, recalc)
    window.removeEventListener('DOMContentLoaded', recalc)
  }
}
