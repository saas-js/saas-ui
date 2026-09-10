'use client'

import { HStack, RadioGroup } from '@chakra-ui/react'
import { Radio } from 'compositions/ui/radio'

export const RadioWithSizes = () => {
  return (
    <HStack gap="4">
      <RadioGroup.Root size="sm">
        <Radio value="react">Radio (sm)</Radio>
      </RadioGroup.Root>
      <RadioGroup.Root size="md">
        <Radio value="react">Radio (md)</Radio>
      </RadioGroup.Root>
      <RadioGroup.Root size="lg">
        <Radio value="react">Radio (lg)</Radio>
      </RadioGroup.Root>
    </HStack>
  )
}
