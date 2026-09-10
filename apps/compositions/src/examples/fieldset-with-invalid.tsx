'use client'

import { Field, Fieldset, Input, Textarea } from '@chakra-ui/react'
import { NativeSelect } from 'compositions/ui/native-select'

export const FieldsetWithInvalid = () => {
  return (
    <Fieldset.Root size="lg" invalid>
      <Fieldset.Legend>Shipping details</Fieldset.Legend>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Street address</Field.Label>
          <Input name="address" />
        </Field.Root>
        <Field.Root invalid>
          <Field.Label>Country</Field.Label>
          <NativeSelect name="country">
            <option value="United Kingdom (UK)">United Kingdom (UK)</option>
            <option value="Canada (CA)">Canada (CA)</option>
            <option value="United States (US)">United States (US)</option>
          </NativeSelect>
        </Field.Root>
        <Field.Root invalid>
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
