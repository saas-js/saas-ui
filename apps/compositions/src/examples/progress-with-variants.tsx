'use client'

import { Stack } from '@chakra-ui/react'
import { Progress } from '@saas-ui/react'

export const ProgressWithVariants = () => {
  return (
    <Stack gap="4" maxW="200px">
      <Progress.Root variant="subtle">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
      <Progress.Root variant="outline">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Stack>
  )
}
