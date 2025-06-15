'use client'

import { HStack } from '@chakra-ui/react'
import { Field, Textarea } from '@saas-ui/react'

export const TextareaWithHelperText = () => {
  return (
    <HStack gap="10" width="full">
      <Field.Root required>
        <Field.Label>Comment</Field.Label>
        <Textarea placeholder="Start typing..." variant="subtle" />
        <Field.HelperText>Max 500 characters.</Field.HelperText>
      </Field.Root>
      <Field.Root required>
        <Field.Label>Comment</Field.Label>
        <Textarea placeholder="Start typing..." variant="outline" />
        <Field.HelperText>Max 500 characters.</Field.HelperText>
      </Field.Root>
    </HStack>
  )
}
