import React from 'react'
import { useSaas } from './saas-provider'

export function useLink(): any {
  const context = useSaas()
  if (context.linkComponent) {
    return context.linkComponent
  }
  return ({ children }: React.PropsWithChildren<null>) => <>{children}</>
}
