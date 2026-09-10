import { Field } from '@chakra-ui/react'
import { NumberInput } from 'compositions/ui/number-input'

export const NumberInputWithInvalid = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Enter Number</Field.Label>
      <NumberInput defaultValue="10" width="200px" />
      <Field.ErrorText>The entry is invalid</Field.ErrorText>
    </Field.Root>
  )
}
