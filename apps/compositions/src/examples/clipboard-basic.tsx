'use client'

import { Clipboard } from 'compositions/ui/clipboard'

export const ClipboardBasic = () => {
  return (
    <Clipboard.Root value="https://saas-ui.dev">
      <Clipboard.IconButton />
    </Clipboard.Root>
  )
}
