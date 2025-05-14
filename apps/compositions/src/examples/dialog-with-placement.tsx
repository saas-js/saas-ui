'use client'

import { For, HStack } from '@chakra-ui/react'
import { Button, Dialog } from '@saas-ui/react'

export const DialogWithPlacement = () => {
  return (
    <HStack wrap="wrap" gap="4">
      <For each={['top', 'center', 'bottom']}>
        {(placement) => (
          <Dialog.Root
            key={placement}
            placement={placement}
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger asChild>
              <Button variant="outline">Open Dialog ({placement}) </Button>
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
