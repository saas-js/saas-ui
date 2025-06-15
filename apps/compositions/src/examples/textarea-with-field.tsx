'use client'

import { HStack } from '@chakra-ui/react'
import { Field, Textarea } from '@saas-ui/react'

export const TextareaWithField = () => {
  return (
    <HStack gap="10" width="full">
      <Field.Root required>
        <Field.Label>Comment</Field.Label>
        <Textarea placeholder="Start typing..." variant="subtle" />
      </Field.Root>
      <Field.Root required>
        <Field.Label>Comment</Field.Label>
        <Textarea placeholder="Start typing..." variant="outline" />
      </Field.Root>
    </HStack>
  )
}
