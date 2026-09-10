'use client'

import { FileUpload } from 'compositions/ui/file-upload'

export const FileUploadWithInput = () => {
  return (
    <FileUpload.Root gap="1" maxWidth="300px">
      <FileUpload.Label>Upload file</FileUpload.Label>
      <FileUpload.Input />
    </FileUpload.Root>
  )
}
