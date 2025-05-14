'use client'

import { Button, Dialog, FileUpload } from '@saas-ui/react'
import { HiUpload } from 'react-icons/hi'

export const FileUploadInDialog = () => {
  return (
    <Dialog.Root size="sm" placement="center">
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header spaceY="1">
          <Dialog.Title>Upload File</Dialog.Title>
          <Dialog.Description>Upload a file to the server</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body pb="6">
          <FileUpload.Root>
            <FileUpload.Dropzone width="full">
              <HiUpload />
              <FileUpload.Label>Drag and drop files here</FileUpload.Label>
            </FileUpload.Dropzone>
            <FileUpload.List />
          </FileUpload.Root>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  )
}
