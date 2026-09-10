'use client'

import { Field, Textarea } from '@chakra-ui/react'

export const FieldWithTextarea = () => {
  return (
    <Field.Root>
      <Field.Label>Message</Field.Label>
      <Textarea placeholder="Enter your message here" />
    </Field.Root>
  )
}
