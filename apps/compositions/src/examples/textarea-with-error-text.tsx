'use client'

import { HStack } from '@chakra-ui/react'
import { Field, Textarea } from '@saas-ui/react'

export const TextareaWithErrorText = () => {
  return (
    <HStack gap="10" width="full">
      <Field.Root invalid required>
        <Field.Label>Comment</Field.Label>
        <Textarea placeholder="Start typing..." variant="subtle" />
        <Field.ErrorText>Field is required</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid required>
        <Field.Label>Comment</Field.Label>
        <Textarea placeholder="Start typing..." variant="outline" />
        <Field.ErrorText>Field is required</Field.ErrorText>
      </Field.Root>
    </HStack>
  )
}
