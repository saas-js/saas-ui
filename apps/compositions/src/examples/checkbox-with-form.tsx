'use client';
import { useForm } from '@saas-ui/forms'
import { Stack, Button } from '@chakra-ui/react'

export const CheckboxWithForm = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
    onSubmit: (values) => console.log(values),
  })

  return (
    <form.Form>
      <Stack maxW="sm" gap="4" align="flex-start">
        <form.Field name="username" label="User name" />
        <form.Field name="password" label="Password" />

        <form.Field name="remember" label="Remember me" type="checkbox" />

        <Button variant="solid" mt="3">
          Submit
        </Button>
      </Stack>
    </form.Form>
  )
}
