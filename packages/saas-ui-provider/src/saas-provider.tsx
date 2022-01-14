import * as React from 'react'

import {
  ChakraProvider,
  ThemeProvider,
  CSSReset,
  GlobalStyle,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react'

import { theme as defaultTheme } from '@saas-ui/theme'

export interface SaasContextValue {
  linkComponent?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export const SaasContext = React.createContext<SaasContextValue>({})

interface SaasProviderProps {
  theme: any
  linkComponent?: React.ReactNode
  cookies: any
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
      <ChakraProvider colorModeManager={colorModeManager}>
        <ThemeProvider theme={theme || defaultTheme}>
          <CSSReset />
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </ChakraProvider>
    </SaasContext.Provider>
  )
}

export const useSaas = (): SaasContextValue => React.useContext(SaasContext)
