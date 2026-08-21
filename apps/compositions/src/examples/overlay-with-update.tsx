'use client'

import { Box, createOverlay } from '@chakra-ui/react'
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

export const OverlayWithUpdate = () => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          dialog.open('a', {
            title: 'Initial Dialog Title',
            content: (
              <Box textStyle="sm">This text will update in 2 seconds.</Box>
            ),
          })

          setTimeout(() => {
            dialog.update('a', {
              title: 'Updated Dialog Title',
              content: (
                <Box textStyle="sm" color="fg.muted">
                  This is the updated content of the dialog.
                </Box>
              ),
            })
          }, 2000)
        }}
      >
        Open Dialog
      </Button>
      <dialog.Viewport />
    </>
  )
}
