'use client'

import { HStack } from '@chakra-ui/react'
import { Field, Input } from '@saas-ui/react'

export const InputWithField = () => {
  return (
    <HStack gap="10" width="full">
      <Field.Root required>
        <Field.Label>Email</Field.Label>
        <Input placeholder="me@example.com" variant="subtle" />
      </Field.Root>
    </HStack>
  )
}
