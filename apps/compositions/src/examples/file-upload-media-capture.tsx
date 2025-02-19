'use client'

import { Button, FileUpload } from '@saas-ui/react'
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
