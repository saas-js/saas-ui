'use client'

import { useRef } from 'react'

import { Input, Stack } from '@chakra-ui/react'
import { Button, Dialog } from '@saas-ui/react'

export const DialogWithInitialFocus = () => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <Dialog.Root initialFocusEl={() => ref.current}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Dialog Header</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body pb="4">
          <Stack gap="4">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input ref={ref} placeholder="Focus First" />
          </Stack>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="ghost">Cancel</Button>
          </Dialog.ActionTrigger>
          <Button variant="glass" colorPalette="accent">
            Save
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
