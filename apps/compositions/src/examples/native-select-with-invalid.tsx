import { Field, NativeSelect } from '@saas-ui/react'

export const NativeSelectWithInvalid = () => (
  <Field.Root invalid width="240px">
    <Field.Label>Framework</Field.Label>
    <NativeSelect placeholder="Select option">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </NativeSelect>
    <Field.ErrorText>This is an error</Field.ErrorText>
  </Field.Root>
)
