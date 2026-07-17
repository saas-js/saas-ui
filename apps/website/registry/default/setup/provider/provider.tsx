'use client'

import * as React from 'react'

import { LinkProvider } from '@/registry/default/lib/use-link/use-link.tsx'
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from '@/registry/default/setup/color-mode/color-mode.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'

export interface ProviderProps extends Omit<
  ColorModeProviderProps,
  'children'
> {
  children: React.ReactNode
  linkComponent?: React.ElementType
}

export function Provider(props: ProviderProps) {
  const { children, linkComponent, ...colorModeProps } = props

  return (
    <ChakraProvider value={defaultSystem}>
      <LinkProvider component={linkComponent}>
        <ColorModeProvider {...colorModeProps}>{children}</ColorModeProvider>
      </LinkProvider>
    </ChakraProvider>
  )
}
