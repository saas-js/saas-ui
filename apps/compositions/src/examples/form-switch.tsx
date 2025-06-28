'use client'

import { FormLayout, useForm } from '@saas-ui/forms'

export function FormSwitch() {
  const form = useForm({
    defaultValues: {
      notifications: false,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field
          name="notifications"
          label="Enable notifications"
          type="switch"
        />
      </FormLayout>
    </form.Form>
  )
}
