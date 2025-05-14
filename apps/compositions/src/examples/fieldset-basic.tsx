import {
  Button,
  Fieldset,
  Input,
  NativeSelectRoot,
  Stack,
} from '@chakra-ui/react'
import { Field } from '@saas-ui/react'
import { NativeSelect } from '@saas-ui/react'

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
