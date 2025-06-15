'use client'

import { For, HStack } from '@chakra-ui/react'
import { Button, Dialog } from '@saas-ui/react'

export const DialogWithSizes = () => {
  return (
    <HStack>
      <For each={['xs', 'sm', 'md', 'lg']}>
        {(size) => (
          <Dialog.Root key={size} size={size}>
            <Dialog.Trigger asChild>
              <Button variant="outline" size={size}>
                Open ({size})
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
                <Dialog.CloseButton />
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
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
        )}
      </For>
    </HStack>
  )
}
