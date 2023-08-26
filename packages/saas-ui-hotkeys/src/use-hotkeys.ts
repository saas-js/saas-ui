import * as React from 'react'

const { useEffect, useCallback, useMemo, useRef } = React

// Works best with US or UK keyboards
const shiftedKeys: Record<string, string> = {
  ')': '0',
  '!': '1',
  '@': "'",
  '"': "'",
  '#': '3',
  '£': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  '~': '#',
  _: '-',
  '+': '=',
  ':': ';',
  '<': ',',
  '>': '.',
  '?': '/',
  '|': '\\',
  '{': '[',
  '}': ']',
}

const modifiers: Record<string, string> = {
  '⌥': 'alt',
  option: 'alt',
  '⇧': 'shift',
  '⌃': 'control',
  ctrl: 'control',
  '⌘': 'meta',
  cmd: 'meta',
  command: 'meta',
  mod: 'meta', // ios
  esc: 'escape',
}

export const splitKeys = (keys: string) => {
  return keys
    .replace(/\+/g, (match, offset) => {
      if (offset === 0) {
        return match
      }
      return ' '
    })
    .split(/\s/)
}

const parseKeys = (keys: string | string[]) => {
  if (typeof keys === 'string') {
    keys = [keys]
  }
  return keys.reduce((memo: Array<string[]>, command: string) => {
    memo.push(
      splitKeys(command.toLowerCase()).reduce(
        (keys: string[], key: string, i, command) => {
          if (command.length === 1 && shiftedKeys[key]) {
            memo.push(['shift', shiftedKeys[key]])
          }
          if (modifiers[key]) {
            keys.push(modifiers[key])
          } else if (key !== 'then') {
            keys.push(key)
          }
          return keys
        },
        []
      )
    )
    return memo
  }, [])
}

const keysMatch = (
  pressedKeys: Set<string>,
  targetKeys: Array<Set<string>>
): boolean =>
  targetKeys.some((b) => {
    return (
      pressedKeys.size === b.size &&
      !Array.from(pressedKeys).some((v) => !b.has(v))
    )
  })

const getKeyFromEvent = (event: KeyboardEvent): string => {
  const key = event.key.toLowerCase()
  if (shiftedKeys[key]) {
    return shiftedKeys[key]
  }

  return key
}

export interface UseHotkeysOptions {
  /**
   * Whether to prevent the default behavior of the event.
   * Eg. to override browser hotkeys.
   * @default false
   **/
  preventDefault?: boolean
  /**
   * The element to attach the event listener to.
   * @default window
   */
  targetElement?: HTMLElement | null
  /**
   * Ignore hotkeys when the target is an input element.
   * @default ['INPUT', 'TEXTAREA', 'SELECT']
   */
  ignoreTags?: string[]
  /**
   * Whether to enable hotkeys when the target is a content editable element.
   * @default false
   */
  enableOnContentEditable?: boolean
}

/**
 * useHotKeys React Hook
 *
 * Supports shifted keys like ?, =, >.
 *
 * ⌥ ⇧ ⌃ ⌘ shorthands are supported.
 *
 * @param keys The keys that trigger this hotkey
 * @param callback The function to execute when the keys are pressed
 * @param deps Deps for the callback function
 */
export const useHotkeys = (
  keys: string | string[],
  callback: (event: KeyboardEvent) => void,
  options: UseHotkeysOptions | Array<any> = [],
  deps?: Array<any>
) => {
  let _options: UseHotkeysOptions = {}
  if (Array.isArray(options)) {
    deps = options
    _options = {}
  } else {
    _options = options
    deps = deps || []
  }

  const {
    ignoreTags = ['INPUT', 'TEXTAREA', 'SELECT'],
    enableOnContentEditable,
    preventDefault = false,
  } = _options

  const targetElement = _options.targetElement || window

  const memoizedCallback = useCallback(callback, deps || [])

  const targetKeys: Array<Set<string>> = useMemo(
    () => parseKeys(keys).map((k) => new Set(k)),
    []
  )

  const pressedKeys: Set<string> = useMemo(() => new Set(), [])
  const bufferKeys: Set<string> = useMemo(() => new Set(), [])
  const bufferTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isInputEvent = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    return (
      (target.isContentEditable && !enableOnContentEditable) ||
      (ignoreTags.includes(target.tagName) &&
        // @ts-ignore: This only exists on HTMLInputElements
        !target.readOnly &&
        // @ts-ignore: when targetElement is this input, we should trigger
        target !== targetElement)
    )
  }

  function onKeyDown(event: Event) {
    if (isInputEvent(event as KeyboardEvent)) {
      return
    }

    const key = getKeyFromEvent(event as KeyboardEvent)
    pressedKeys.add(key)
    bufferKeys.add(key)

    if (bufferTimeout.current) {
      clearTimeout(bufferTimeout.current)
      bufferTimeout.current = null
    }
    bufferTimeout.current = setTimeout(() => {
      bufferKeys.clear()
    }, 400)

    if (
      keysMatch(pressedKeys, targetKeys) ||
      (bufferKeys.size > 1 && keysMatch(bufferKeys, targetKeys))
    ) {
      if (preventDefault) {
        event.preventDefault()
      }
      bufferKeys.clear() // make sure the buffer gets cleared
      pressedKeys.clear() // make sure the pressed keys get cleared
      // execute on next tick to make sure the last keyup doesn't trigger in any focused field
      setTimeout(() => memoizedCallback(event as KeyboardEvent), 0)
    }
  }

  function onKeyUp(event: Event) {
    if (isInputEvent(event as KeyboardEvent)) {
      pressedKeys.clear()
      return
    }
    pressedKeys.delete(getKeyFromEvent(event as KeyboardEvent))
  }

  function onWindowBlur() {
    pressedKeys.clear()
  }

  useEffect(() => {
    targetElement.addEventListener('keydown', onKeyDown)
    targetElement.addEventListener('keyup', onKeyUp)
    targetElement.addEventListener('blur', onWindowBlur)

    return () => {
      targetElement.removeEventListener('keydown', onKeyDown)
      targetElement.removeEventListener('keyup', onKeyUp)
      targetElement.removeEventListener('blur', onWindowBlur)
    }
  }, [memoizedCallback, targetElement])
}
