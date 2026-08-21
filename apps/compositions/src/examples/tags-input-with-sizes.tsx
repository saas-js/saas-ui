'use client'

import { For, Stack, TagsInput } from '@chakra-ui/react'

export const TagsInputWithSizes = () => {
  return (
    <Stack gap="6">
      <For each={['xs', 'sm', 'md', 'lg'] as const}>
        {(size) => (
          <TagsInput.Root
            key={size}
            size={size}
            readOnly
            defaultValue={['React', 'Saas UI', 'TypeScript']}
          >
            <TagsInput.Label>Tags (size={size})</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder="Add tag..." />
            </TagsInput.Control>
          </TagsInput.Root>
        )}
      </For>
    </Stack>
  )
}
