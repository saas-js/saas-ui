'use client'

import { Clipboard } from '@saas-ui/react'

export const ClipboardBasic = () => {
  return (
    <Clipboard.Root value="https://saas-ui.dev">
      <Clipboard.IconButton />
    </Clipboard.Root>
  )
}
