import React from 'react'

export interface ErrorProviderProps {
  children: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export interface ErrorContextValue {
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

const context = React.createContext<ErrorContextValue>({})

export const ErrorProvider = (props: ErrorProviderProps) => {
  const { children, onError } = props

  const value = React.useMemo(() => ({ onError }), [onError])

  return <context.Provider value={value}>{children}</context.Provider>
}

export const useErrorContext = () => React.useContext(context)
