'use client'

import { AbsoluteCenter, HStack, ProgressCircle } from '@saas-ui/react'

const sizes = ['md', 'lg', 'xl'] as const

export const ProgressCircleWithValueText = () => {
  return (
    <HStack gap="8">
      {sizes.map((size) => (
        <ProgressCircle.Root size={size} key={size} value={5}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <ProgressCircle.ValueText />
          </AbsoluteCenter>
        </ProgressCircle.Root>
      ))}
    </HStack>
  )
}
