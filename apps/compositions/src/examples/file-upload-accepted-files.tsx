'use client'

import { Button, FileUpload } from '@saas-ui/react'
import { HiUpload } from 'react-icons/hi'

export const FileUploadAcceptedFiles = () => {
  return (
    <FileUpload.Root accept={['image/png']}>
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
