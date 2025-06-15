'use client'

import { HStack, Stack } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@saas-ui/react'

export const SkeletonForFeed = () => {
  return (
    <Stack gap="6" maxW="xs">
      <HStack width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </HStack>
      <Skeleton height="200px" />
    </Stack>
  )
}
