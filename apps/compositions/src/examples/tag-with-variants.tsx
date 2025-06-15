'use client'

import { For, HStack, Stack } from '@chakra-ui/react'
import { Tag } from '@saas-ui/react'
import { HiCheck } from 'react-icons/hi'

export const TagWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={['subtle', 'solid', 'outline', 'surface']}>
        {(variant) => (
          <HStack key={variant}>
            <Tag variant={variant}>Gray</Tag>
            <Tag variant={variant} closable>
              Gray
            </Tag>
            <Tag endElement={<HiCheck />} variant={variant}>
              Gray
            </Tag>
          </HStack>
        )}
      </For>
    </Stack>
  )
}
