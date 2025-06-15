'use client'

import { Button, FileUpload } from '@saas-ui/react'
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
