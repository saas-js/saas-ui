'use client'

import * as React from 'react'

import { chakra } from '@chakra-ui/react'

export type LinkComponent = React.ElementType

export interface LinkProviderProps {
  children: React.ReactNode
  component?: LinkComponent
}

const LinkContext = React.createContext<LinkComponent>(chakra.a)

export function LinkProvider(props: LinkProviderProps) {
  const { children, component = chakra.a } = props

  return (
    <LinkContext.Provider value={component}>{children}</LinkContext.Provider>
  )
}

export function useLink(): LinkComponent {
  return React.useContext(LinkContext)
}
