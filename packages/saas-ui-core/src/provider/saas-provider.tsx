import * as React from 'react'

import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react'

import { theme as defaultTheme } from '@saas-ui/theme'
import { Dict } from '@chakra-ui/utils'

export interface SaasContextValue {
  linkComponent?: React.ElementType<any>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export const SaasContext = React.createContext<SaasContextValue>({})

export interface SaasProviderProps extends ChakraProviderProps {
  theme?: Dict
  linkComponent?: React.ElementType<any>
  children: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export function SaasProvider(props: SaasProviderProps) {
  const { theme, linkComponent, onError, children, ...rest } = props

  const context = {
    linkComponent,
    onError,
  }

  return (
    <SaasContext.Provider value={context}>
      <ChakraProvider {...rest} theme={theme || defaultTheme}>
        {children}
      </ChakraProvider>
    </SaasContext.Provider>
  )
}

export const useSaas = (): SaasContextValue => React.useContext(SaasContext)
