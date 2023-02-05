import React from 'react'
import { useSaas } from './saas-provider'

const Link: React.FC<any> = ({ children }) => <>{children}</>

export function useLink(): React.ElementType<any> {
  const context = useSaas()
  if (context?.linkComponent) {
    return context.linkComponent
  }
  return Link
}
