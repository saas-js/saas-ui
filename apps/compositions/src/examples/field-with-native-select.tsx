'use client';
import { Field } from '@chakra-ui/react'
import { NativeSelect } from 'compositions/ui/native-select'

export const FieldWithNativeSelect = () => {
  return (
    <Field.Root>
      <Field.Label>Native Select</Field.Label>
      <NativeSelect>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </NativeSelect>
    </Field.Root>
  )
}
