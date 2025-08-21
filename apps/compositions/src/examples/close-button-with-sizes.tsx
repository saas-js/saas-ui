'use client'

import { For, HStack } from '@saas-ui/react'
import { CloseButton } from '@saas-ui/react'

export const CloseButtonWithSizes = () => {
  return (
    <HStack gap="4" wrap="wrap">
      <For each={['xs', 'sm', 'md', 'lg', 'xl']}>
        {(size) => <CloseButton variant="outline" size={size} />}
      </For>
    </HStack>
  )
}
