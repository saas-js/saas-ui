'use client'

import { Form, useAppForm } from 'compositions/components/forms'

export function FormNumber() {
  const form = useAppForm({
    defaultValues: {
      amount: '',
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="amount">
          {(field) => (
            <field.TextField label="Amount" inputMode="decimal" type="text" />
          )}
        </form.AppField>
        <form.AppField name="amount">
          {(field) => (
            <field.TextField
              label="Amount (with start element)"
              inputMode="decimal"
              type="text"
              startElement="$"
            />
          )}
        </form.AppField>
        <form.AppField name="amount">
          {(field) => (
            <field.TextField
              label="Amount (no controls)"
              inputMode="decimal"
              type="text"
            />
          )}
        </form.AppField>
      </form.Layout>
    </Form>
  )
}
