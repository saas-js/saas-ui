'use client';
import { Button } from '@chakra-ui/react'
import { Dialog } from 'compositions/ui/dialog'
import Lorem from 'react-lorem-ipsum'

export const DialogWithInsideScroll = () => {
  return (
    <Dialog.Root scrollBehavior="inside" size="sm">
      <Dialog.Trigger asChild>
        <Button variant="outline">Inside Scroll</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>With Inside Scroll</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>

        <Dialog.Body>
          <Lorem p={8} />
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  )
}
