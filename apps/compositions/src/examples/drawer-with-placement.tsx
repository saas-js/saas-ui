'use client'

import { For, HStack } from '@chakra-ui/react'
import { Button, Drawer } from '@saas-ui/react'

export const DrawerWithPlacement = () => {
  return (
    <HStack wrap="wrap">
      <For each={['bottom', 'top', 'start', 'end']}>
        {(placement) => (
          <Drawer.Root key={placement} placement={placement}>
            <Drawer.Backdrop />
            <Drawer.Trigger asChild>
              <Button variant="outline" size="sm">
                Open ({placement})
              </Button>
            </Drawer.Trigger>
            <Drawer.Content
              roundedTop={placement === 'bottom' ? 'l3' : undefined}
              roundedBottom={placement === 'top' ? 'l3' : undefined}
            >
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
                <Drawer.CloseButton />
              </Drawer.Header>
              <Drawer.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.ActionTrigger asChild>
                  <Button variant="ghost">Cancel</Button>
                </Drawer.ActionTrigger>
                <Button variant="glass" colorPalette="accent">
                  Save
                </Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        )}
      </For>
    </HStack>
  )
}
