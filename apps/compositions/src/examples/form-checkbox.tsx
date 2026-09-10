'use client'

import { Form, useAppForm } from 'compositions/components/forms'
import { Checkbox } from 'compositions/ui/checkbox'

export function FormCheckbox() {
  const form = useAppForm({
    defaultValues: {
      terms: false,
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="terms">
          {(field) => (
            <Checkbox
              checked={field.state.value === true}
              onCheckedChange={({ checked }) =>
                field.handleChange(checked === true)
              }
              inputProps={{ onBlur: field.handleBlur }}
            >
              Accept terms and conditions
            </Checkbox>
          )}
        </form.AppField>
      </form.Layout>
    </Form>
  )
}
