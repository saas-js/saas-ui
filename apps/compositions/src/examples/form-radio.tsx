'use client'

import { Fieldset, HStack, RadioGroup } from '@chakra-ui/react'
import { Form, useAppForm } from 'compositions/components/forms'
import { Radio } from 'compositions/ui/radio'

export function FormRadio() {
  const form = useAppForm({
    defaultValues: {
      color: 'red',
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  return (
    <Form form={form}>
      <form.Layout>
        <form.AppField name="color">
          {(field) => (
            <Fieldset.Root>
              <Fieldset.Legend>Color</Fieldset.Legend>
              <RadioGroup.Root
                name={field.name}
                value={field.state.value}
                onValueChange={({ value }) => field.handleChange(value ?? '')}
                onBlur={field.handleBlur}
              >
                <HStack gap="6">
                  <Radio value="red">Red</Radio>
                  <Radio value="green">Green</Radio>
                  <Radio value="blue">Blue</Radio>
                </HStack>
              </RadioGroup.Root>
            </Fieldset.Root>
          )}
        </form.AppField>
      </form.Layout>
    </Form>
  )
}
