'use client'

import { Form, useAppForm } from 'compositions/components/forms'

export function FormSelect() {
  const form = useAppForm({
    defaultValues: {
      color: 'red',
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="color">
          {(field) => (
            <field.SelectField
              label="Color"
              options={[
                { label: 'Red', value: 'red' },
                { label: 'Green', value: 'green' },
                { label: 'Blue', value: 'blue' },
              ]}
            />
          )}
        </form.AppField>
      </form.Layout>
    </Form>
  )
}
