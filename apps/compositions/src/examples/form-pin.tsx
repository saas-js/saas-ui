'use client'

import { FormLayout, useForm } from '@saas-ui/forms'

export function FormPin() {
  const form = useForm({
    defaultValues: {
      pin: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field name="pin" label="Pin" type="pin" pinLength={4} />
      </FormLayout>
    </form.Form>
  )
}
