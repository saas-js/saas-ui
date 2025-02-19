'use client'

import { Field } from '@saas-ui/react'
import { PinInput } from '@saas-ui/react'

export const PinInputWithField = () => {
  return (
    <Field.Root>
      <Field.Label>Enter otp</Field.Label>
      <PinInput />
    </Field.Root>
  )
}
