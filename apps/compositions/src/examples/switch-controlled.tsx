'use client'

import { useState } from 'react'

import { Switch } from '@saas-ui/react'

export const SwitchControlled = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Switch checked={checked} onCheckedChange={(e) => setChecked(e.checked)} />
  )
}
