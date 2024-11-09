import * as React from 'react'

import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react'

export interface SuiContextValue {
  linkComponent?: React.ElementType<any>
}

export const SuiContext = React.createContext<SuiContextValue>({})

export interface SuiProviderProps extends ChakraProviderProps {
  linkComponent?: React.ElementType<any>
  children: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export function SuiProvider(props: SuiProviderProps) {
  const { linkComponent, onError, children, ...rest } = props

  const context = React.useMemo(
    () => ({
      linkComponent,
    }),
    [],
  )

  return (
    <SuiContext.Provider value={context}>
      <ChakraProvider {...rest}>{children}</ChakraProvider>
    </SuiContext.Provider>
  )
}

export const useSui = (): SuiContextValue => React.useContext(SuiContext)
