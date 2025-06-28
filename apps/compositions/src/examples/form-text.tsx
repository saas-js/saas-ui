'use client'

import { FormLayout, useForm } from '@saas-ui/forms'

export function FormText() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      time: '',
      url: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field name="name" label="Name" type="text" />
        <form.Field name="email" label="Email" type="email" />
        <form.Field
          name="email"
          label="Phone"
          type="phone"
          startElement={'+1'}
        />
        <form.Field name="time" label="Time" type="time" />
        <form.Field name="url" label="Url" type="url" />
      </FormLayout>
    </form.Form>
  )
}
