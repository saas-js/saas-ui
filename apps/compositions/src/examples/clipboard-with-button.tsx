'use client'

import { Clipboard } from '@saas-ui/react'

export const ClipboardWithButton = () => {
  return (
    <Clipboard.Root value="https://saas-ui.dev">
      <Clipboard.Button />
    </Clipboard.Root>
  )
}
