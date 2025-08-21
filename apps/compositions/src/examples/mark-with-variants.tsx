'use client'

import { Mark, Stack, Text } from '@saas-ui/react'

const variants = ['subtle', 'solid', 'text', 'plain'] as const

export const MarkWithVariants = () => {
  return (
    <Stack gap="6">
      {variants.map((variant) => (
        <Text key={variant}>
          The <Mark variant={variant}>design system</Mark> is a collection of UI
          elements
        </Text>
      ))}
    </Stack>
  )
}
