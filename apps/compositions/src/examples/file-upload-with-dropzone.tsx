'use client'

import { Heading, Text } from '@chakra-ui/react'
import { FileUpload } from 'compositions/ui/file-upload'

export const FileUploadWithDropzone = () => {
  return (
    <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
      <FileUpload.Dropzone>
        <Heading size="md">Drag and drop here to upload</Heading>
        <Text color="fg.muted">.png, .jpg up to 5MB</Text>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
