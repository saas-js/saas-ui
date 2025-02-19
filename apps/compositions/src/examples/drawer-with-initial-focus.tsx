'use client'

import { useRef } from 'react'

import { Input, Stack } from '@chakra-ui/react'
import { Button, Drawer } from '@saas-ui/react'

export const DrawerWithInitialFocus = () => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <Drawer.Root initialFocusEl={() => ref.current}>
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
          <Stack mt="5">
            <Input defaultValue="Naruto" placeholder="First name" />
            <Input ref={ref} placeholder="Email" />
          </Stack>
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
