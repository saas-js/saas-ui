'use client'

import { For, Stack } from '@chakra-ui/react'
import { NativeSelect } from 'compositions/ui/native-select'

export const NativeSelectWithVariants = () => {
  return (
    <Stack gap="4" width="240px">
      <For each={['outline', 'subtle', 'plain']}>
        {(variant) => (
          <NativeSelect variant={variant} key={variant}>
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
