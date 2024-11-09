import React from 'react'

import { chakra } from '@chakra-ui/react'

import { useSui } from './sui-provider'

export function useLink(): React.ElementType {
  const context = useSui()
  if (context?.linkComponent) {
    return context.linkComponent
  }
  return chakra.a
}
