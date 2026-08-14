'use client'

import { Button, Stack } from '@chakra-ui/react'
import { Form, useAppForm } from 'compositions/components/forms'
import { Checkbox } from 'compositions/ui/checkbox'

export const CheckboxWithForm = () => {
  const form = useAppForm({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <Form form={form}>
      <Stack maxW="sm" gap="4" align="flex-start">
        <form.AppField name="username">
          {(field) => <field.TextField label="User name" />}
        </form.AppField>
        <form.AppField name="password">
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>

        <form.AppField name="remember">
          {(field) => (
            <Checkbox
              checked={field.state.value === true}
              onCheckedChange={({ checked }) =>
                field.handleChange(checked === true)
              }
              inputProps={{ onBlur: field.handleBlur }}
            >
              Remember me
            </Checkbox>
          )}
        </form.AppField>

        <Button variant="solid" mt="3">
          Submit
        </Button>
      </Stack>
    </Form>
  )
}
