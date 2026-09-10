'use client'

import { Form, useAppForm } from 'compositions/components/forms'

export function FormSwitch() {
  const form = useAppForm({
    defaultValues: {
      notifications: false,
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="notifications">
          {(field) => <field.SwitchField label="Enable notifications" />}
        </form.AppField>
      </form.Layout>
    </Form>
  )
}
