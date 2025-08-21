'use client'

import { HStack } from '@saas-ui/react'
import { ColorSwatch } from '@saas-ui/react'
import { For } from '@saas-ui/react'

export const ColorSwatchWithSizes = () => {
  return (
    <HStack>
      <For each={['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']}>
        {(size) => <ColorSwatch key={size} value="#bada55" size={size} />}
      </For>
    </HStack>
  )
}
