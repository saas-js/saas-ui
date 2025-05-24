'use client'

import { Switch } from '@saas-ui/react'
import { HiCheck, HiX } from 'react-icons/hi'

export const SwitchWithThumbLabel = () => {
  return (
    <Switch size="lg" thumbLabel={{ on: <HiCheck />, off: <HiX /> }}>
      Switch me
    </Switch>
  )
}
