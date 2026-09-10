'use client'

import { Clipboard } from 'compositions/ui/clipboard'

export const ClipboardWithCustomLabels = () => {
  return (
    <Clipboard.Root value="https://saas-ui.dev">
      <Clipboard.Button copied="Gekopiëerd">Kopiëer</Clipboard.Button>
    </Clipboard.Root>
  )
}
