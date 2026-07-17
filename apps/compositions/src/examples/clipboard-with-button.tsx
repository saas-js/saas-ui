'use client'

import { Clipboard } from 'compositions/ui/clipboard'

export const ClipboardWithButton = () => {
  return (
    <Clipboard.Root value="https://saas-ui.dev">
      <Clipboard.Button />
    </Clipboard.Root>
  )
}
