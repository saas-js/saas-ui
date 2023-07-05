import React from 'react'
import { chakra } from '@chakra-ui/react'
import { useSaas } from './saas-provider'

const Link: React.FC<any> = (props) => <chakra.a {...props} />

export function useLink(): React.ElementType<any> {
  const context = useSaas()
  if (context?.linkComponent) {
    return context.linkComponent
  }
  return Link
}
