import { Field, NumberInput } from '@saas-ui/react'

export const NumberInputWithInvalid = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Enter Number</Field.Label>
      <NumberInput defaultValue="10" width="200px" />
      <Field.ErrorText>The entry is invalid</Field.ErrorText>
    </Field.Root>
  )
}
