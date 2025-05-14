'use client'

import { Clipboard, InputGroup } from '@saas-ui/react'

export const ClipboardWithInput = () => {
  return (
    <Clipboard.Root
      maxW="300px"
      value="https://saas-ui.dev/docs/components/clipboard"
    >
      <InputGroup
        width="full"
        endElement={<Clipboard.IconButton me="-2" variant="ghost" />}
      >
        <Clipboard.Input />
      </InputGroup>
    </Clipboard.Root>
  )
}
