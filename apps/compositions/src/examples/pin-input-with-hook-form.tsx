'use client'

import { Button, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from '@saas-ui/react'
import { PinInput } from '@saas-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  pin: z
    .array(z.string().min(1), { required_error: 'Pin is required' })
    .length(4, { message: 'Pin must be 4 digits long' }),
})

type FormValues = z.infer<typeof formSchema>

export const PinInputWithHookForm = () => {
  const { handleSubmit, control, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!formState.errors.pin}>
          <Field.Label>Enter otp</Field.Label>
          <Controller
            control={control}
            name="pin"
            render={({ field }) => (
              <PinInput
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
              />
            )}
          />
          <Field.ErrorText>{formState.errors.pin?.message}</Field.ErrorText>
        </Field.Root>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
