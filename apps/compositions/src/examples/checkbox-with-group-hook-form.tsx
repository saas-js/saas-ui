'use client'

import { CheckboxGroup, Code, Fieldset } from '@chakra-ui/react'
import { Controller, SubmitButton, useZodForm } from '@saas-ui/forms'
import { Checkbox } from '@saas-ui/react'
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
  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      framework: [],
    },
  })

  return (
    <form.Form onSubmit={(data) => console.log(data)}>
      <Controller
        control={form.control}
        name="framework"
        render={({ field, fieldState }) => (
          <Fieldset.Root>
            <Fieldset.Legend>Select your framework</Fieldset.Legend>
            <CheckboxGroup
              invalid={fieldState.invalid}
              value={field.value}
              onValueChange={field.onChange}
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

            {fieldState.error && (
              <Fieldset.ErrorText>
                {fieldState.error.message}
              </Fieldset.ErrorText>
            )}
          </Fieldset.Root>
        )}
      />

      <SubmitButton>Submit</SubmitButton>

      <Code>Values: {JSON.stringify(form.getValues(), null, 2)}</Code>
    </form.Form>
  )
}
