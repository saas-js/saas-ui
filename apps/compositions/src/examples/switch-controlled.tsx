'use client'

import { useState } from 'react'

import { Switch } from 'compositions/ui/switch'

export const SwitchControlled = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Switch checked={checked} onCheckedChange={(e) => setChecked(e.checked)} />
  )
}
