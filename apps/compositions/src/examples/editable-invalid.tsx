'use client'

import { Editable } from '@saas-ui/react'

export const EditableInvalid = () => {
  return (
    <Editable.Root invalid defaultValue="Click to edit">
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  )
}
