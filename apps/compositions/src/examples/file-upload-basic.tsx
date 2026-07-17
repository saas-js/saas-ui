'use client';
import { Button } from '@chakra-ui/react'
import { FileUpload } from 'compositions/ui/file-upload'
import { HiUpload } from 'react-icons/hi'

export const FileUploadBasic = () => {
  return (
    <FileUpload.Root>
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
