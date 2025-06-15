'use client'

import {
  FileUpload as ChakraFileUpload,
  Float,
  HStack,
  Input,
  type InputProps,
} from '@chakra-ui/react'
import { FileUpload, useFileUploadContext } from '@saas-ui/react'
import { HiX } from 'react-icons/hi'

const FilePasteInput = (props: InputProps) => {
  const fileUpload = useFileUploadContext()
  return (
    <Input
      {...props}
      onPaste={(e) => {
        fileUpload.setClipboardFiles(e.clipboardData)
      }}
    />
  )
}

const FileImageList = () => {
  const fileUpload = useFileUploadContext()
  return (
    <HStack wrap="wrap" gap="3">
      {fileUpload.acceptedFiles.map((file) => (
        <ChakraFileUpload.Item
          p="2"
          width="auto"
          key={file.name}
          file={file}
          pos="relative"
        >
          <Float placement="top-start">
            <ChakraFileUpload.ItemDeleteTrigger
              p="0.5"
              rounded="l1"
              bg="bg"
              borderWidth="1px"
            >
              <HiX />
            </ChakraFileUpload.ItemDeleteTrigger>
          </Float>
          <ChakraFileUpload.ItemPreviewImage
            boxSize="12"
            rounded="l1"
            objectFit="cover"
          />
        </ChakraFileUpload.Item>
      ))}
    </HStack>
  )
}

export const FileUploadWithPasteEvent = () => {
  return (
    <FileUpload.Root maxFiles={3} accept="image/*">
      <FileImageList />
      <FilePasteInput placeholder="Paste image here..." />
    </FileUpload.Root>
  )
}
