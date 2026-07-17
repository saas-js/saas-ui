'use client'

import * as React from 'react'

import { LinkProvider } from '#lib/use-link/use-link'
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from '#components/setup/color-mode/color-mode'
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
