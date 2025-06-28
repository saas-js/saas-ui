'use client'

import { Editable } from '@saas-ui/react'

export const EditableWithDoubleClick = () => (
  <Editable.Root defaultValue="Double click to edit" activationMode="dblclick">
    <Editable.Preview />
    <Editable.Input />
  </Editable.Root>
)
