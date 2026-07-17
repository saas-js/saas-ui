'use client'

import { useState } from 'react'

import { PasswordInput } from 'compositions/ui/password-input'

export const PasswordInputControlled = () => {
  const [value, setValue] = useState('')
  return (
    <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} />
  )
}
