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
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
    }
  }
  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
}
