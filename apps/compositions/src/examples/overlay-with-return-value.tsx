'use client'

import { createOverlay } from '@chakra-ui/react'
import { Button } from 'compositions/ui/button'
import { Dialog } from 'compositions/ui/dialog'

type DialogProps = {
  title: string
  description?: string
  content?: React.ReactNode
}

type DialogResult = {
  message: string
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

export const OverlayWithReturnValue = () => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={async () => {
          const result: DialogResult | undefined = await dialog.open('a', {
            title: 'Dialog Title',
            description: 'Dialog Description',
            content: (
              <Button
                size="sm"
                onClick={() => {
                  dialog.close('a', { message: 'Welcome' })
                }}
              >
                Close with a value
              </Button>
            ),
          })

          await dialog.waitForExit('a')

          if (!result) return

          dialog.open('b', {
            title: result.message,
            description: 'The value returned by the previous dialog.',
          })
        }}
      >
        Open Dialog
      </Button>
      <dialog.Viewport />
    </>
  )
}
