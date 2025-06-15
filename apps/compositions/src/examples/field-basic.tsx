'use client'

import { Field, Input } from '@saas-ui/react'

export const FieldBasic = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" />
    </Field.Root>
  )
}
