import React from 'react'

import type { Meta } from '@storybook/react'

import { Button } from '../button/index.ts'
import { Dialog } from './index.ts'

export default {
  title: 'Components / Dialog',
  decorators: [(Story) => <Story />],
} satisfies Meta

export const Basic = () => {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Backdrop />
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.ActionTrigger>
          <Button>Save</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const Contained = () => {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Backdrop />
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Dialog Title</Dialog.Title>

          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.ActionTrigger>
          <Button>Save</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
