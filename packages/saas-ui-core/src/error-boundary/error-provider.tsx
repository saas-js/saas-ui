import React from 'react'

export interface ErrorProviderProps {
  children: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export interface ErrorContextValue {
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export const ErrorContext = React.createContext<ErrorContextValue>({})

export const ErrorProvider = (props: ErrorProviderProps) => {
  const { children, onError } = props

  const value = React.useMemo(() => ({ onError }), [onError])

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export const useErrorContext = () => React.useContext(ErrorContext)
