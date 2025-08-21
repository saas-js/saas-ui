'use client'

import { useRef } from 'react'

import { Editable, Input, Stack } from '@saas-ui/react'

export const EditableWithFinalFocus = () => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Stack>
      <Editable.Root
        finalFocusEl={() => ref.current}
        defaultValue="Final fantasy"
      >
        <Editable.Preview />
        <Editable.Input />
        <Editable.Control>
          <Editable.EditTrigger>Edit</Editable.EditTrigger>
          <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          <Editable.SubmitTrigger>Submit</Editable.SubmitTrigger>
        </Editable.Control>
      </Editable.Root>

      <Input placeholder="Placeholder" ref={ref} />
    </Stack>
  )
}
