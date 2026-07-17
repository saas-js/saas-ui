import { fireEvent } from '@testing-library/react'

import { focus } from './focus'
import { queue, sleep } from './utils'

const tabbableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const getTabbableElements = (container: ParentNode) => {
  return Array.from(container.querySelectorAll<HTMLElement>(tabbableSelector))
    .filter((element) => !element.hidden && element.tabIndex >= 0)
    .sort((a, b) => {
      const aIndex = a.tabIndex || Number.MAX_SAFE_INTEGER
      const bIndex = b.tabIndex || Number.MAX_SAFE_INTEGER
      return aIndex - bIndex
    })
}

const getRelativeTabbable = (container: ParentNode, offset: 1 | -1) => {
  const elements = getTabbableElements(container)
  if (!elements.length) return

  const currentIndex = elements.indexOf(document.activeElement as HTMLElement)
  const nextIndex =
    currentIndex === -1
      ? offset === 1
        ? 0
        : elements.length - 1
      : (currentIndex + offset + elements.length) % elements.length

  return elements[nextIndex]
}

const keydownMap: Record<
  string,
  (element: Element, options: KeyboardEventInit) => void
> = {
  Tab: (_, { shiftKey }) => {
    const body = document.body

    const nextElement = getRelativeTabbable(body, shiftKey ? -1 : 1)

    if (nextElement) {
      focus(nextElement)
    }
  },
}

const keyupMap: Record<
  string,
  (element: Element, options: KeyboardEventInit) => void
> = {}

export async function press(
  key: string,
  element?: Element | null,
  options: KeyboardEventInit = {},
) {
  if (element == null) {
    element = document.activeElement || document.body
  }

  if (!element) return

  if (document.activeElement !== element) {
    fireEvent.focus(element)
  }

  const downFired = fireEvent.keyDown(element, { key, ...options })

  await queue()

  if (downFired && key in keydownMap && !options.metaKey) {
    keydownMap[key]?.(element, options)
  }

  await sleep()

  const upFired = fireEvent.keyUp(element, { key, ...options })

  await queue()

  if (upFired && key in keyupMap && !options.metaKey) {
    keyupMap[key]?.(element, options)
  }

  await sleep()
}

function createPress(key: string, defaultOptions: KeyboardEventInit = {}) {
  return (element?: Element | null, options: KeyboardEventInit = {}) =>
    press(key, element, { ...defaultOptions, ...options })
}

press.Escape = createPress('Escape')
press.Backspace = createPress('Backspace')
press.Delete = createPress('Delete')
press.Tab = createPress('Tab')
press.ShiftTab = createPress('Tab', { shiftKey: true })
press.Enter = createPress('Enter')
press.Space = createPress(' ')
press.ArrowUp = createPress('ArrowUp')
press.ArrowRight = createPress('ArrowRight')
press.ArrowDown = createPress('ArrowDown')
press.ArrowLeft = createPress('ArrowLeft')
press.End = createPress('End')
press.Home = createPress('Home')
press.PageUp = createPress('PageUp')
press.PageDown = createPress('PageDown')
