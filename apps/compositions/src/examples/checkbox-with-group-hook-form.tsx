'use client'

import { CheckboxGroup, Code, Fieldset } from '@chakra-ui/react'
import { Form, useAppForm } from 'compositions/components/forms'
import { Checkbox } from 'compositions/ui/checkbox'
import { z } from 'zod'

const formSchema = z.object({
  framework: z.array(z.string()).min(1, {
    message: 'You must select at least one framework.',
  }),
})

const items = [
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
]

export const CheckboxWithGroupHookForm = () => {
  const form = useAppForm({
    validators: { onSubmit: formSchema },
    defaultValues: {
      framework: [] as string[],
    },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <Form form={form}>
      <form.AppField name="framework">
        {(field) => (
          <Fieldset.Root invalid={field.state.meta.isTouched}>
            <Fieldset.Legend>Select your framework</Fieldset.Legend>
            <CheckboxGroup
              value={field.state.value}
              onValueChange={field.handleChange}
              name={field.name}
            >
              <Fieldset.Content>
                {items.map((item) => (
                  <Checkbox key={item.value} value={item.value}>
                    {item.label}
                  </Checkbox>
                ))}
              </Fieldset.Content>
            </CheckboxGroup>

            {field.state.meta.errors[0] && (
              <Fieldset.ErrorText>
                {String(field.state.meta.errors[0])}
              </Fieldset.ErrorText>
            )}
          </Fieldset.Root>
        )}
      </form.AppField>

      <form.SubmitButton>Submit</form.SubmitButton>

      <form.Subscribe selector={(state) => state.values}>
        {(values) => <Code>Values: {JSON.stringify(values, null, 2)}</Code>}
      </form.Subscribe>
    </Form>
  )
}
