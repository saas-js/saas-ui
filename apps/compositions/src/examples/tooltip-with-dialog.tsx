'use client'

import { Button, Dialog, Tooltip } from '@saas-ui/react'

export const TooltipWithDialog = () => {
  return (
    <Dialog.Root ids={{ trigger: 'd-1' }}>
      <Tooltip content="This is the tooltip content" ids={{ trigger: 't-1' }}>
        <Dialog.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Dialog
          </Button>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content
        onBlurCapture={(e) => {
          console.log('relatedTarget', e.relatedTarget)
        }}
      >
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
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
