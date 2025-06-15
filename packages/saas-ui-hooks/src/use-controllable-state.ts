'use client'

import { useCallback, useState } from 'react'

import { useCallbackRef } from './use-callback-ref'

export interface UseControllableStateProps<T> {
  /**
   * The value to used in controlled mode
   */
  value?: T
  /**
   * The initial value to be used, in uncontrolled mode
   */
  defaultValue?: T | (() => T)
  /**
   * The callback fired when the value changes
   */
  onChange?: (value: T) => void
  /**
   * The function that determines if the state should be updated
   */
  shouldUpdate?: (prev: T, next: T) => boolean
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next,
  } = props
  const onChangeProp = useCallbackRef(onChange)
  const shouldUpdateProp = useCallbackRef(shouldUpdate)

  const [valueState, setValue] = useState(defaultValue as T)

  const isControlled = valueProp !== undefined
  const value = isControlled ? (valueProp as T) : valueState

  const updateValue = useCallback(
    (next: React.SetStateAction<T>) => {
      const nextValue = runIfFn(next, value)

      if (!shouldUpdateProp(value, nextValue)) {
        return
      }

      if (!isControlled) {
        setValue(nextValue)
      }

      onChangeProp(nextValue)
    },
    [isControlled, onChangeProp, value, shouldUpdateProp],
  )

  return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>]
}

const isFunction = (value: any): value is Function =>
  typeof value === 'function'

function runIfFn<T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}
