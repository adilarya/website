// Lock page scroll while a popup is open, without the content shifting:
// compensate for the now-missing scrollbar width on the body and any fixed bars
// (marked with data-fixed-bar). Ref-counted so overlapping popups stay correct.
let count = 0

export function lockScroll() {
  count += 1
  if (count > 1) return
  const w = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  if (w > 0) {
    const px = `${w}px`
    document.body.style.paddingRight = px
    document.querySelectorAll('[data-fixed-bar]').forEach((el) => { el.style.paddingRight = px })
  }
}

export function unlockScroll() {
  count = Math.max(0, count - 1)
  if (count > 0) return
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.querySelectorAll('[data-fixed-bar]').forEach((el) => { el.style.paddingRight = '' })
}
