'use client'

import { For, Stack, TagsInput } from '@chakra-ui/react'

export const TagsInputWithVariants = () => {
  return (
    <Stack gap="6">
      <For each={['outline', 'subtle', 'flushed'] as const}>
        {(variant) => (
          <TagsInput.Root
            key={variant}
            variant={variant}
            readOnly
            defaultValue={['React', 'Saas UI', 'TypeScript']}
          >
            <TagsInput.Label>Tags (variant={variant})</TagsInput.Label>
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
