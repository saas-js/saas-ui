'use client'

import { For, Stack } from '@chakra-ui/react'
import { NativeSelect } from '@saas-ui/react'

export const NativeSelectWithSizes = () => {
  return (
    <Stack gap="4" width="240px">
      <For each={['xs', 'sm', 'md', 'lg', 'xl']}>
        {(size) => (
          <NativeSelect size={size} key={size}>
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
          </NativeSelect>
        )}
      </For>
    </Stack>
  )
}
