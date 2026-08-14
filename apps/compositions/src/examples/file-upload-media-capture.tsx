'use client';
import { Button } from '@chakra-ui/react'
import { FileUpload } from 'compositions/ui/file-upload'
import { HiCamera } from 'react-icons/hi'

export const FileUploadMediaCapture = () => {
  return (
    <FileUpload.Root capture="environment">
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiCamera /> Open Camera
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
