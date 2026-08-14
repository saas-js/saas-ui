import { act } from '@testing-library/react'

export function focus(el: HTMLElement) {
  if (el.ownerDocument.activeElement === el) return
  if (el.hidden || el.matches(':disabled, [inert]')) return
  act(() => {
    el.focus()
  })
}

export function blur(el?: HTMLElement | null) {
  if (el == null) el = document.activeElement as HTMLElement
  if (el.tagName === 'BODY') return
  if (el.ownerDocument.activeElement !== el) return
  act(() => {
    if (el && 'blur' in el) el.blur()
  })
}
