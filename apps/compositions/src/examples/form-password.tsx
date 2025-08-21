'use client'

import { FormLayout, useForm } from '@saas-ui/forms'

export function FormPassword() {
  const form = useForm({
    defaultValues: {
      password: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field name="password" label="Password" type="password" />
      </FormLayout>
    </form.Form>
  )
}
