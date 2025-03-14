import React from 'react'

import { Box, Heading, Text } from '@chakra-ui/react'
import { LuCloudUpload } from 'react-icons/lu'

import { Button } from '#components/button/button.js'

import { FileUpload } from './index.ts'

export default {
  title: 'Components/File Upload',
  component: FileUpload.Root,
}

export const Basic = () => {
  return (
    <FileUpload.Root>
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <LuCloudUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}

export const WithDropzone = () => {
  return (
    <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
      <FileUpload.Dropzone>
        <Box>
          <Heading size="sm">Drop files here</Heading>
          <Text textStyle="xs" color="fg.muted">
            Images up to 5MB
          </Text>
        </Box>

        <FileUpload.Trigger asChild>
          <Button variant="outline" size="sm">
            <LuCloudUpload /> Select files
          </Button>
        </FileUpload.Trigger>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
