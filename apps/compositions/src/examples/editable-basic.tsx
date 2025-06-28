'use client'

import { Editable } from '@saas-ui/react'

export const EditableBasic = () => (
  <Editable.Root textAlign="start" defaultValue="Click to edit">
    <Editable.Preview />
    <Editable.Input />
  </Editable.Root>
)
