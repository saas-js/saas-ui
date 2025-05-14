'use client'

import { For, HStack, Kbd } from '@chakra-ui/react'
import { Button, Drawer } from '@saas-ui/react'

export const DrawerWithSizes = () => {
  return (
    <HStack wrap="wrap">
      <For each={['xs', 'sm', 'md', 'lg', 'xl', 'full']}>
        {(size) => (
          <Drawer.Root key={size} size={size}>
            <Drawer.Backdrop />
            <Drawer.Trigger asChild>
              <Button variant="outline" size="sm">
                Open ({size})
              </Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
                <Drawer.CloseButton />
              </Drawer.Header>
              <Drawer.Body>
                Press the <Kbd>esc</Kbd> key to close the drawer.
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
