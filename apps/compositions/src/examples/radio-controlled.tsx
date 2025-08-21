'use client'

import { useState } from 'react'

import { HStack } from '@saas-ui/react'
import { Radio, RadioGroup } from '@saas-ui/react'

export const RadioControlled = () => {
  const [value, setValue] = useState<string | null>('1')
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={({ value }) => setValue(value)}
    >
      <HStack gap="6">
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </HStack>
    </RadioGroup.Root>
  )
}
