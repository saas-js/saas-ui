'use client'

import { Card, Stack } from '@chakra-ui/react'
import { Form, useAppForm } from 'compositions/components/forms'

export const CardWithForm = () => {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <Form form={form}>
      <Card.Root maxW="sm">
        <Card.Header>
          <Card.Title>Sign up</Card.Title>
          <Card.Description>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <form.AppField name="firstName">
              {(field) => <field.TextField label="First Name" />}
            </form.AppField>
            <form.AppField name="lastName">
              {(field) => <field.TextField label="Last Name" />}
            </form.AppField>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <form.SubmitButton>Save</form.SubmitButton>
        </Card.Footer>
      </Card.Root>
    </Form>
  )
}
