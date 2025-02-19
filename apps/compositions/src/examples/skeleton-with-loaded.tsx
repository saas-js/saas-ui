'use client'

import { useState } from 'react'

import { Stack, Text } from '@chakra-ui/react'
import { Button, Skeleton } from '@saas-ui/react'

export const SkeletonWithLoaded = () => {
  const [loading, setLoading] = useState(true)

  return (
    <Stack align="flex-start" gap="4">
      <Skeleton height="6" loading={loading}>
        <Text>Chakra UI is cool</Text>
      </Skeleton>
      <Button size="sm" onClick={() => setLoading((c) => !c)}>
        Toggle
      </Button>
    </Stack>
  )
}
