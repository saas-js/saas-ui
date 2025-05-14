'use client'

import { For, Stack } from '@chakra-ui/react'
import { CheckboxCard } from '@saas-ui/react'

export const CheckboxCardWithVariants = () => {
  return (
    <Stack maxW="320px">
      <For each={['subtle', 'surface', 'outline']}>
        {(variant) => (
          <CheckboxCard
            defaultChecked
            label={`Checkbox (${variant})`}
            colorPalette="teal"
            variant={variant}
          />
        )}
      </For>
    </Stack>
  )
}
