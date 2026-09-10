'use client'

import { useState } from 'react'

import { NativeSelect } from 'compositions/ui/native-select'

export const NativeSelectControlled = () => {
  const [value, setValue] = useState('')
  return (
    <NativeSelect
      size="sm"
      width="240px"
      placeholder="Select option"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    >
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
  )
}
