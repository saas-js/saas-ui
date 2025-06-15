'use client'

import { Stack } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'

export const ButtonWithLoading = () => {
  return (
    <Stack direction="row" gap="4" align="center">
      <Button loading>Click me</Button>
      <Button loading loadingText="Saving...">
        Click me
      </Button>
    </Stack>
  )
}
