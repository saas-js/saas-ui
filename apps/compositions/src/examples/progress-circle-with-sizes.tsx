'use client'

import { HStack, ProgressCircle } from '@saas-ui/react'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const ProgressCircleWithSizes = () => {
  return (
    <HStack gap="10">
      {sizes.map((size) => (
        <ProgressCircle.Root key={size} size={size} value={30}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range strokeLinecap="round" />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      ))}
    </HStack>
  )
}
