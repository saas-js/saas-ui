'use client'

import { useState } from 'react'

import { Button, Drawer } from '@saas-ui/react'

export const DrawerAttached = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} attached>
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
      </Drawer.Content>
    </Drawer.Root>
  )
}
