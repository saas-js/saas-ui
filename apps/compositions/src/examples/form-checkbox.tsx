'use client'

import { FormLayout, useForm } from '@saas-ui/forms'

export function FormCheckbox() {
  const form = useForm({
    defaultValues: {
      terms: false,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field
          name="terms"
          label="Accept terms and conditions"
          type="checkbox"
        />
      </FormLayout>
    </form.Form>
  )
}
