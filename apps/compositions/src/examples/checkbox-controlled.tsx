'use client'

import { useState } from 'react'

import { Checkbox } from 'compositions/ui/checkbox'

export const CheckboxControlled = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(e) => setChecked(!!e.checked)}
    >
      Accept terms and conditions
    </Checkbox>
  )
}
