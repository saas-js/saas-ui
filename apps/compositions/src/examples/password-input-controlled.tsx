'use client'

import { useState } from 'react'

import { PasswordInput } from '@saas-ui/react'

export const PasswordInputControlled = () => {
  const [value, setValue] = useState('')
  return (
    <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} />
  )
}
