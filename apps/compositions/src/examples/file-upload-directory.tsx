'use client';
import { Button } from '@chakra-ui/react'
import { FileUpload } from 'compositions/ui/file-upload'
import { HiUpload } from 'react-icons/hi'

export const FileUploadDirectory = () => {
  return (
    <FileUpload.Root directory>
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
