'use client'

import { Input, Stack } from '@chakra-ui/react'
import { Button, Field, Textarea } from '@saas-ui/react'
import { useForm } from 'react-hook-form'

interface FormValues {
  username: string
  bio: string
}

export const TextareaWithHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root required>
          <Field.Label>Username</Field.Label>
          <Input
            placeholder="@username"
            {...register('username', { required: 'Username is required' })}
          />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          <Field.HelperText>This is your public display name.</Field.HelperText>
        </Field.Root>
        <Field.Root required>
          <Field.Label>Profile bio</Field.Label>
          <Textarea
            placeholder="I am ..."
            {...register('bio', { required: 'Bio is required' })}
          />
          <Field.ErrorText>{errors.bio?.message}</Field.ErrorText>
          <Field.HelperText>A short description of yourself</Field.HelperText>
        </Field.Root>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
