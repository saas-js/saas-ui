'use client'

import { createOverlay } from '@chakra-ui/react'
import { Button } from 'compositions/ui/button'
import { Dialog } from 'compositions/ui/dialog'

type DialogProps = {
  title: string
  description?: string
  content?: React.ReactNode
}

const dialog = createOverlay<DialogProps>((props) => {
  const { title, description, content, ...rest } = props
  return (
    <Dialog.Root {...rest}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Body spaceY="4">
          {description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}
          {content}
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  )
})

export const OverlayBasic = () => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          dialog.open('a', {
            title: 'Dialog Title',
            description: 'Dialog Description',
          })
        }}
      >
        Open Dialog
      </Button>
      <dialog.Viewport />
    </>
  )
}
