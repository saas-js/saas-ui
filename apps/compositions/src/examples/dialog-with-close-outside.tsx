'use client'

import { AspectRatio } from '@chakra-ui/react'
import { Button, Dialog } from '@saas-ui/react'

export const DialogWithCloseOutside = () => {
  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Body pt="4">
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description mb="4">
            This is a dialog with some content and a video.
          </Dialog.Description>
          <AspectRatio ratio={4 / 3} rounded="lg" overflow="hidden">
            <iframe
              title="naruto"
              src="https://www.youtube.com/embed/QhBnZ6NPOY0"
              allowFullScreen
            />
          </AspectRatio>
        </Dialog.Body>
        <Dialog.CloseTrigger
          position="absolute"
          top="0"
          insetEnd="-12"
          bg="bg"
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}
