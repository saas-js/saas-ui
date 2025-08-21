'use client'

import { For, HStack, Stack, Text } from '@saas-ui/react'
import { Checkbox } from '@saas-ui/react'

export const CheckboxWithVariants = () => {
  return (
    <HStack align="flex-start">
      <For each={['outline', 'subtle', 'solid']}>
        {(variant) => (
          <Stack align="flex-start" flex="1" key={variant}>
            <Text>{variant}</Text>
            <Checkbox defaultChecked variant={variant}>
              Checkbox
            </Checkbox>
          </Stack>
        )}
      </For>
    </HStack>
  )
}
