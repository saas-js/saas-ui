'use client'

import { Field, TagsInput } from '@chakra-ui/react'

export const TagsInputWithField = () => {
  return (
    <Field.Root>
      <TagsInput.Root
        delimiter=","
        addOnPaste
        defaultValue={['sage@company.com']}
      >
        <TagsInput.Label>Invite team members</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add email..." />
        </TagsInput.Control>
      </TagsInput.Root>
      <Field.HelperText>Add emails separated by commas</Field.HelperText>
    </Field.Root>
  )
}
