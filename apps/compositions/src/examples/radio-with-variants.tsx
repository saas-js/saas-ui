'use client'

import { For, Stack } from '@saas-ui/react'
import { Radio, RadioGroup } from '@saas-ui/react'

export const RadioWithVariants = () => {
  return (
    <Stack gap="4">
      <For each={['solid', 'outline', 'subtle']}>
        {(variant) => (
          <RadioGroup.Root
            key={variant}
            variant={variant}
            defaultValue="react"
            spaceX="4"
            colorPalette="teal"
          >
            <Radio value="react" minW="120px">
              Radio ({variant})
            </Radio>
            <Radio value="vue">Vue ({variant})</Radio>
          </RadioGroup.Root>
        )}
      </For>
    </Stack>
  )
}
