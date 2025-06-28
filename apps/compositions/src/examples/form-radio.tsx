'use client'

import { FormLayout, useForm } from '@saas-ui/forms'

export function FormRadio() {
  const form = useForm({
    defaultValues: {
      color: 'red',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form.Form>
      <FormLayout>
        <form.Field
          name="color"
          label="Color"
          type="radio"
          options={[
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
          ]}
        />
      </FormLayout>
    </form.Form>
  )
}
