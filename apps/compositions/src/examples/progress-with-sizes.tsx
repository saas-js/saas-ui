'use client'

import { Stack } from '@chakra-ui/react'
import { Progress } from '@saas-ui/react'

export const ProgressWithSizes = () => {
  return (
    <Stack gap="4" maxW="240px">
      <Progress.Root size="xs">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
      <Progress.Root size="sm">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
      <Progress.Root size="md">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
      <Progress.Root size="lg">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Stack>
  )
}
