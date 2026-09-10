'use client';
import { Button } from '@chakra-ui/react'
import { FileUpload } from 'compositions/ui/file-upload'
import { HiUpload } from 'react-icons/hi'

export const FileUploadMultiple = () => {
  return (
    <FileUpload.Root maxFiles={5}>
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List showSize clearable />
    </FileUpload.Root>
  )
}
