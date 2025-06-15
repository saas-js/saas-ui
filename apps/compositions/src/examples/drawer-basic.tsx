'use client'

import { Button, Drawer } from '@saas-ui/react'

export const DrawerBasic = () => {
  return (
    <Drawer.Root>
      <Drawer.Backdrop />
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Drawer
        </Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.ActionTrigger asChild>
            <Button variant="ghost">Cancel</Button>
          </Drawer.ActionTrigger>
          <Button variant="glass" colorPalette="accent">
            Save
          </Button>
        </Drawer.Footer>
        <Drawer.CloseTrigger />
      </Drawer.Content>
    </Drawer.Root>
  )
}
