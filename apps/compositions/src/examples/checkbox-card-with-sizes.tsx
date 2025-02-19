'use client'

import { For, Stack } from '@chakra-ui/react'
import { CheckboxCard } from '@saas-ui/react'

export const CheckboxCardWithSizes = () => {
  return (
    <Stack maxW="320px">
      <For each={['sm', 'md', 'lg']}>
        {(size) => <CheckboxCard label={`Checkbox (${size})`} size={size} />}
      </For>
    </Stack>
  )
}
