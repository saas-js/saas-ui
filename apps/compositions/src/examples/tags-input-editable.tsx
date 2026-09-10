'use client'

import { Span, TagsInput } from '@chakra-ui/react'

export const TagsInputEditable = () => {
  return (
    <TagsInput.Root editable defaultValue={['React', 'Saas UI']}>
      <TagsInput.Label>Edit tags inline</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add or edit tags..." />
        <TagsInput.ClearTrigger />
      </TagsInput.Control>

      <TagsInput.HiddenInput />

      <Span textStyle="xs" color="fg.muted" ms="auto">
        Use the arrow keys to navigate and press Enter to edit
      </Span>
    </TagsInput.Root>
  )
}
