'use client'

import { Field, Fieldset, Input, NativeSelect, Textarea } from '@saas-ui/react'

export const FieldsetWithDisabled = () => {
  return (
    <Fieldset.Root size="lg" disabled>
      <Fieldset.Legend>Shipping details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Street address</Field.Label>
        <Input name="address" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <NativeSelect>
          <option value="United Kingdom (UK)">United Kingdom (UK)</option>
          <option value="Canada (CA)">Canada (CA)</option>
          <option value="United States (US)">United States (US)</option>
        </NativeSelect>
      </Field.Root>
      <Field.Root>
        <Field.Label>Delivery notes</Field.Label>
        <Textarea name="notes" />
      </Field.Root>
    </Fieldset.Root>
  )
}
