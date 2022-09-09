import { useState, useEffect } from 'react'
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

  const [value, setValue] = useState<T>(() => {
    return isBrowser ? deserialize(getItem(key) ?? undefined) : defaultValue
  })

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.storageArea === window.localStorage && event.key === key) {
        setValue(deserialize(event.newValue ?? undefined))
      }
    }

    if (isBrowser) {
      window.addEventListener('storage', handler)
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener('storage', handler)
      }
    }
  }, [])

  useEffect(() => {
    setItem(key, serialize(value))
  }, [key, value])

  return [value === undefined ? defaultValue : value, setValue] as const
}
