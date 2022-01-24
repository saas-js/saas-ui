import React, { useEffect, useCallback, useMemo } from 'react'

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
    .replace(/\+/, (match, offset) => {
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
          } else {
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

const isInputEvent = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement
  return (
    target.isContentEditable ||
    (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) &&
      // @ts-ignore: This only exists on HTMLInputElements
      !target.readOnly)
  )
}

/**
 * useHotKeys React Hook
 * @param keys The keys that trigger this hotkey
 * @param callback The function to execute when the keys are pressed
 * @param deps Deps for the callback function
 */
export const useHotkeys = (
  keys: string | string[],
  callback: (event: KeyboardEvent) => void,
  deps: Array<any> = []
) => {
  const memoizedCallback = useCallback(callback, deps || [])

  const targetKeys: Array<Set<string>> = useMemo(
    () => parseKeys(keys).map((k) => new Set(k)),
    []
  )
  const pressedKeys: Set<string> = useMemo(() => new Set(), [])

  function onKeyDown(event: KeyboardEvent): void {
    if (isInputEvent(event)) {
      return
    }

    const key = getKeyFromEvent(event)
    pressedKeys.add(key)

    if (keysMatch(pressedKeys, targetKeys)) {
      // execute on next tick to make sure the last keyup doesn't trigger in any focused field
      setTimeout(() => memoizedCallback(event), 0)
    }
  }

  function onKeyUp(event: KeyboardEvent): void {
    if (isInputEvent(event)) {
      pressedKeys.clear()
      return
    }
    pressedKeys.delete(getKeyFromEvent(event))
  }

  function onWindowBlur(): void {
    pressedKeys.clear()
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onWindowBlur)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onWindowBlur)
    }
  }, [memoizedCallback])
}
