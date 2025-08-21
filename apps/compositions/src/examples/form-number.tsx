'use client'

import { FormLayout, useForm } from '@saas-ui/forms'

export function FormNumber() {
  const form = useForm({
    defaultValues: {
      amount: 0,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field name="amount" label="Amount" type="number" />
        <form.Field
          name="amount"
          label="Amount (with start element)"
          type="number"
          startElement={'$'}
        />
        <form.Field
          name="amount"
          label="Amount (no controls)"
          type="number"
          hideControls
        />
      </FormLayout>
    </form.Form>
  )
}
