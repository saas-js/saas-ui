'use client'

import * as React from 'react'

import { LinkProvider } from '@/registry/default/lib/use-link/use-link.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'

export interface ProviderProps {
  children: React.ReactNode
  linkComponent?: React.ElementType
}

export function Provider(props: ProviderProps) {
  const { children, linkComponent } = props

  return (
    <ChakraProvider value={defaultSystem}>
      <LinkProvider component={linkComponent}>{children}</LinkProvider>
    </ChakraProvider>
  )
}
