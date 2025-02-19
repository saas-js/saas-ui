'use client'

import { Button, Dialog } from '@saas-ui/react'

export const DialogWithRole = () => {
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Body>
          <p>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our systems.
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="ghost">Cancel</Button>
          </Dialog.ActionTrigger>
          <Button variant="glass" colorPalette="red">
            Delete
          </Button>
        </Dialog.Footer>
        <Dialog.CloseTrigger />
      </Dialog.Content>
    </Dialog.Root>
  )
}
