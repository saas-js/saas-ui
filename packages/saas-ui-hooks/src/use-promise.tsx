import * as React from 'react'

export interface UsePromise {
  error?: Error | null
  data?: any
  isLoading: boolean
  isResolved: boolean
  isRejected: boolean
}

type CallbackFn = (...args: any[]) => Promise<any>

export function usePromise<C extends CallbackFn>(fn: C): [UsePromise, C] {
  const [isLoading, setLoading] = React.useState(false)
  const [isResolved, setResolved] = React.useState(false)
  const [isRejected, setRejected] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [data, setData] = React.useState(null)

  const call: any = (...params: any) => {
    setLoading(true)

    return fn(...params)
      .then((data) => {
        setData(data)
        setResolved(true)
        setLoading(false)

        return data
      })
      .catch((err) => {
        setError(err)
        setRejected(true)
        setLoading(false)

        throw err
      })
  }

  return [{ error, data, isLoading, isResolved, isRejected }, call]
}
