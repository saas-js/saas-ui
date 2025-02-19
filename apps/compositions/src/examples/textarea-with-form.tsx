'use client'

import { Stack } from '@chakra-ui/react'
import { Button, Field, Textarea } from '@saas-ui/react'

export const TextareaWithForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log('submitted')
      }}
    >
      <Stack maxW="sm" gap="4">
        <Field.Root required>
          <Field.Label>Issue Details</Field.Label>
          <Textarea placeholder="Type your message here..." />
          <Field.HelperText>
            You can @mention people and refer to issues and pull requests.
          </Field.HelperText>
        </Field.Root>
        <Button alignSelf="flex-start" variant="solid" mt="3">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
