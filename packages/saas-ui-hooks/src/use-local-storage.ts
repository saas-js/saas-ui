import React, { useState, useEffect } from 'react'
const isBrowser = typeof window !== 'undefined'

function setItem(key: string, value: string) {
  if (isBrowser && 'localStorage' in window) {
    return value === undefined
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, value)
  }
}

function getItem(key: string) {
  if (isBrowser && 'localStorage' in window) {
    return localStorage.getItem(key)
  }
}

const serializeJSON = <T>(value: T) => {
  try {
    return JSON.stringify(value)
  } catch (e) {
    throw new Error('useLocalStorage: failed to serialize the value to JSON')
  }
}

const deserializeJSON = (value?: string) => {
  try {
    return value && JSON.parse(value)
  } catch (e) {
    return value
  }
}

export interface UseLocalStorageOptions<T> {
  serialize?<T>(value: T): string
  deserialize?(value?: string): T
}

type StorageEventDetail = {
  key: string
  newValue?: string
}
const triggerCustomEvent = (detail: StorageEventDetail) => {
  const event = new CustomEvent('use-local-storage', {
    detail,
  })
  window.dispatchEvent(event)
}

/**
 * Works like useState but stores the value as JSON in localStorage.
 * Updates work across multiple tabs using StorageEvent.
 *
 * Setting undefined will remote the localStorage item.
 */
export const useLocalStorage = <T = string>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {}
) => {
  const { serialize = serializeJSON, deserialize = deserializeJSON } = options

  const initRef = React.useRef(false)

  const [value, setValue] = useState<T>(() => {
    return isBrowser ? deserialize(getItem(key) ?? undefined) : defaultValue
  })

  useEffect(() => {
    const handler = (event: StorageEvent | CustomEvent<StorageEventDetail>) => {
      const isCustom = event instanceof CustomEvent
      const eventKey = isCustom ? event.detail.key : event.key
      const newValue = isCustom ? event.detail.newValue : event.newValue

      if (
        (isCustom || event.storageArea === window.localStorage) &&
        eventKey === key
      ) {
        setValue(deserialize(newValue ?? undefined))
      }
    }

    if (isBrowser) {
      window.addEventListener('storage', handler)
      window.addEventListener<any>('use-local-storage', handler)
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener('storage', handler)
        window.removeEventListener<any>('use-local-storage', handler)
      }
    }
  }, [])

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      return
    }
    const serializedValue = serialize(value)
    if (getItem(key) !== serializedValue) {
      setItem(key, serializedValue)
      triggerCustomEvent({ key, newValue: serializedValue })
    }
  }, [value])

  return [value === undefined ? defaultValue : value, setValue] as const
}
