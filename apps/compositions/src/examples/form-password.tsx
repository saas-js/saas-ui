'use client'

import { Form, useAppForm } from 'compositions/components/forms'

export function FormPassword() {
  const form = useAppForm({
    defaultValues: {
      password: '',
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="password">
          {(field) => <field.TextField label="Password" type="password" />}
        </form.AppField>
      </form.Layout>
    </Form>
  )
}
