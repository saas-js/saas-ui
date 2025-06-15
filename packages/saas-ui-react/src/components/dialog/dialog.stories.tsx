import React from 'react'

import { Icon } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'
import { LuMail, LuMessageSquare } from 'react-icons/lu'

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

export const ConfirmDialog = () => {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Backdrop />
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Delete Item
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Delete Item</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Body>
          <p>Delete this item? This action cannot be undone.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.ActionTrigger>
          <Button variant="solid" colorPalette="red">
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const ConfirmDialogCentered = () => {
  return (
    <Dialog.Root placement="center" variant="confirm" defaultOpen>
      <Dialog.Backdrop />
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Icon as={LuMail} color="colorPalette.fg" size="2xl" mb="4" />
          <Dialog.Title>Save this message as draft?</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <p>
            This message has not been sent yet. You can save it as a draft to
            continue working on it later.
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.ActionTrigger>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline" mb="2">
              Discard
            </Button>
          </Dialog.ActionTrigger>
          <Button variant="glass" colorPalette="accent">
            Save
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
