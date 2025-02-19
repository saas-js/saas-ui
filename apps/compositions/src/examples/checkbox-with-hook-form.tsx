'use client'

import { Button, Code, HStack, Stack } from '@chakra-ui/react'
import { Controller, useZodForm } from '@saas-ui/forms'
import { Checkbox, Field } from '@saas-ui/react'
import { z } from 'zod'

const formSchema = z.object({
  enabled: z.boolean(),
})

export const CheckboxWithHookForm = () => {
  const form = useZodForm({
    schema: formSchema,
    defaultValues: { enabled: false },
  })

  return (
    <form.Form onSubmit={(data) => console.log(data)}>
      <Stack align="flex-start">
        <Controller
          control={form.control}
          name="enabled"
          render={({ field, fieldState }) => (
            <Field.Root disabled={field.disabled} invalid={fieldState.invalid}>
              <Field.Label>Checkbox</Field.Label>
              <Checkbox
                checked={field.value}
                onCheckedChange={({ checked }) => field.onChange(checked)}
              >
                Checkbox
              </Checkbox>
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        <HStack>
          <Button
            size="xs"
            variant="outline"
            onClick={() => form.setValue('enabled', !form.getValues('enabled'))}
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

        <Code>
          Checked: {JSON.stringify(form.getValues('enabled'), null, 2)}
        </Code>
      </Stack>
    </form.Form>
  )
}
