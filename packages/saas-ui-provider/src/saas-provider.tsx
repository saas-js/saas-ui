import * as React from 'react'

import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react'

import { theme as defaultTheme } from '@saas-ui/theme'

export interface SaasContextValue {
  linkComponent?: React.ElementType<any>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export const SaasContext = React.createContext<SaasContextValue>({})

interface SaasProviderProps {
  theme?: any
  linkComponent?: React.ElementType<any>
  cookies?: any
  children: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export function SaasProvider({
  theme,
  linkComponent,
  cookies,
  onError,
  children,
}: SaasProviderProps) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager

  const context = {
    linkComponent,
    onError,
  }

  return (
    <SaasContext.Provider value={context}>
      <ChakraProvider
        colorModeManager={colorModeManager}
        theme={theme || defaultTheme}
      >
        {children}
      </ChakraProvider>
    </SaasContext.Provider>
  )
}

export const useSaas = (): SaasContextValue => React.useContext(SaasContext)
