import { useState, useEffect } from 'react'

function getItem(key: string) {
  const item = localStorage.getItem(key)

  try {
    return item && JSON.parse(item)
  } catch (e) {
    return item
  }
}

function getStorageValue(key: string, defaultValue: any) {
  try {
    if (typeof window !== 'undefined') {
      const value = getItem(key)
      return value || defaultValue
    }
  } catch (e) {
    return defaultValue
  }
}

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
