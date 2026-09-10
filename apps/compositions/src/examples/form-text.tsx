'use client'

import { Form, useAppForm } from 'compositions/components/forms'

export function FormText() {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      time: '',
      url: '',
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="name">
          {(field) => <field.TextField label="Name" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phone">
          {(field) => (
            <field.TextField label="Phone" type="tel" startElement="+1" />
          )}
        </form.AppField>
        <form.AppField name="time">
          {(field) => <field.TextField label="Time" inputMode="numeric" />}
        </form.AppField>
        <form.AppField name="url">
          {(field) => <field.TextField label="Url" type="url" />}
        </form.AppField>
      </form.Layout>
    </Form>
  )
}
