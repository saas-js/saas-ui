import { Button, Field, Fieldset, Input, Stack } from '@chakra-ui/react'
import { NativeSelect } from 'compositions/ui/native-select'

export const FieldsetBasic = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input name="name" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input name="email" type="email" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Country</Field.Label>
          <NativeSelect>
            <option value="United Kingdom (UK)">United Kingdom (UK)</option>
            <option value="Canada (CA)">Canada (CA)</option>
            <option value="United States (US)">United States (US)</option>
          </NativeSelect>
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  )
}
