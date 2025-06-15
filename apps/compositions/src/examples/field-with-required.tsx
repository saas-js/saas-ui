'use client'

import { Field, Input } from '@saas-ui/react'

export const FieldWithRequired = () => {
  return (
    <Field.Root required>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" />
    </Field.Root>
  )
}
