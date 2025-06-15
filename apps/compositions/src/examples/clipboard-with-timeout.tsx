'use client'

import { Clipboard } from '@saas-ui/react'

export const ClipboardWithTimeout = () => {
  return (
    <Clipboard.Root value="https://saas-ui.dev" timeout={1000}>
      <Clipboard.Button />
    </Clipboard.Root>
  )
}
