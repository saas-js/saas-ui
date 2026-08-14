'use client'

import { Button, Code, Field, HStack, Stack } from '@chakra-ui/react'
import { Form, useAppForm } from 'compositions/components/forms'
import { Checkbox } from 'compositions/ui/checkbox'
import { z } from 'zod'

const formSchema = z.object({
  enabled: z.boolean(),
})

export const CheckboxWithHookForm = () => {
  const form = useAppForm({
    validators: { onSubmit: formSchema },
    defaultValues: { enabled: false },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <Form form={form}>
      <Stack align="flex-start">
        <form.AppField name="enabled">
          {(field) => (
            <Field.Root invalid={field.state.meta.isTouched}>
              <Field.Label>Checkbox</Field.Label>
              <Checkbox
                checked={field.state.value === true}
                onCheckedChange={({ checked }) =>
                  field.handleChange(checked === true)
                }
                inputProps={{ onBlur: field.handleBlur }}
              >
                Checkbox
              </Checkbox>
              {field.state.meta.errors[0] && (
                <Field.ErrorText>
                  {String(field.state.meta.errors[0])}
                </Field.ErrorText>
              )}
            </Field.Root>
          )}
        </form.AppField>

        <HStack>
          <Button
            size="xs"
            variant="outline"
            onClick={() =>
              form.setFieldValue('enabled', !form.getFieldValue('enabled'))
            }
          >
            Toggle
          </Button>
          <Button size="xs" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </HStack>

        <Button size="sm" type="submit" alignSelf="flex-start">
          Submit
        </Button>

        <form.Subscribe selector={(state) => state.values.enabled}>
          {(enabled) => (
            <Code>Checked: {JSON.stringify(enabled, null, 2)}</Code>
          )}
        </form.Subscribe>
      </Stack>
    </Form>
  )
}
