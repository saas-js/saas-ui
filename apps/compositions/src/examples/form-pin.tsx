'use client'

import { Form, useAppForm } from 'compositions/components/forms'
import { PinInput } from 'compositions/ui/pin-input'

export function FormPin() {
  const form = useAppForm({
    defaultValues: {
      pin: '',
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="pin">
          {(field) => (
            <PinInput
              name={field.name}
              value={field.state.value.split('')}
              placeholder="0"
              pinLength={4}
              onValueChange={({ value }) => field.handleChange(value.join(''))}
              inputProps={{ onBlur: field.handleBlur }}
            />
          )}
        </form.AppField>
      </form.Layout>
    </Form>
  )
}
