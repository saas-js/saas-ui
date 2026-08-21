'use client'

import { useState } from 'react'

import { TagsInput } from '@chakra-ui/react'

export const TagsInputControlled = () => {
  const [tags, setTags] = useState<string[]>(['React', 'Saas UI'])

  return (
    <TagsInput.Root
      value={tags}
      onValueChange={(details) => setTags(details.value)}
    >
      <TagsInput.Label>Tags</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add tag..." />
      </TagsInput.Control>
    </TagsInput.Root>
  )
}
