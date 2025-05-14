import React from 'react'

import type { Meta } from '@storybook/react'

import { Button } from '../button/index.ts'
import { Drawer } from './index.ts'

export default {
  title: 'Components / Drawer',
  decorators: [(Story) => <Story />],
} satisfies Meta

export const Basic = () => {
  return (
    <Drawer.Root defaultOpen>
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
            <Button variant="outline">Cancel</Button>
          </Drawer.ActionTrigger>
          <Button>Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  )
}

export const Attached = () => {
  return (
    <Drawer.Root defaultOpen attached>
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
            <Button variant="outline">Cancel</Button>
          </Drawer.ActionTrigger>
          <Button>Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  )
}
