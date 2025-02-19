'use client'

import { Field, Fieldset, Input, NativeSelect, Textarea } from '@saas-ui/react'

export const FieldsetWithInvalid = () => {
  return (
    <Fieldset.Root size="lg" invalid>
      <Fieldset.Legend>Shipping details</Fieldset.Legend>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Street address</Field.Label>
          <Input name="address" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Country</Field.Label>
          <NativeSelect>
            <option value="United Kingdom (UK)">United Kingdom (UK)</option>
            name="country" items=
            {['United Kingdom (UK)', 'Canada (CA)', 'United States (US)']}
          </NativeSelect>
        </Field.Root>
        <Field.Root>
          <Field.Label>Notes</Field.Label>
          <Textarea name="notes" />
        </Field.Root>
      </Fieldset.Content>
      <Fieldset.ErrorText>
        Some fields are invalid. Please check them.
      </Fieldset.ErrorText>
    </Fieldset.Root>
  )
}
