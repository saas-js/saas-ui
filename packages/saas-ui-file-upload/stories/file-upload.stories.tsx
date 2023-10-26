import * as React from 'react'
import { Meta } from '@storybook/react'

import { Button, Container, HStack, Text, forwardRef } from '@chakra-ui/react'

import { Form, FormLayout, SubmitButton, createField } from '@saas-ui/forms'

import { FileUpload, FileUploadTrigger, FileUploadDropzone } from '../src'
import { FileUploadPreview } from '../src/file-upload'

export default {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      )
    },
  ],
} as Meta

export const Default = {
  render: () => {
    return (
      <FileUpload maxFileSize={1024 * 1024} maxFiles={1} accept="image/*">
        {({ files, deleteFile }) => (
          <FileUploadDropzone>
            <Text fontSize="sm">Drag your image here</Text>
            {!files?.length ? (
              <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
            ) : (
              <HStack>
                <Text fontSize="sm">{files[0].name}</Text>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(files[0])
                  }}
                >
                  Clear
                </Button>
              </HStack>
            )}
          </FileUploadDropzone>
        )}
      </FileUpload>
    )
  },
}

export const MultipleFiles = {
  render: () => {
    return (
      <FileUpload maxFileSize={1024 * 1024} maxFiles={10} accept="image/*">
        {({ files, clearFiles }) => (
          <FileUploadDropzone>
            <Text fontSize="sm">Drag your image(s) here</Text>
            {!files?.length ? (
              <FileUploadTrigger as={Button}>Select image(s)</FileUploadTrigger>
            ) : (
              <HStack>
                <Text fontSize="sm">{files.length} selected</Text>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    clearFiles()
                  }}
                >
                  Clear
                </Button>
              </HStack>
            )}
          </FileUploadDropzone>
        )}
      </FileUpload>
    )
  },
}

export const ImagePreview = {
  render: () => {
    return (
      <FileUpload maxFileSize={1024 * 1024} maxFiles={1} accept="image/*">
        {({ files, deleteFile, createFileUrl }) => (
          <FileUploadDropzone>
            <Text fontSize="sm">Drag your image here</Text>
            {!files?.length ? (
              <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
            ) : (
              <HStack>
                <FileUploadPreview file={files[0]} width="100px" />
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(files[0])
                  }}
                >
                  Clear
                </Button>
              </HStack>
            )}
          </FileUploadDropzone>
        )}
      </FileUpload>
    )
  },
}

const UploadField = createField(
  forwardRef((props, ref) => {
    const { onChange, ...rest } = props
    return (
      <FileUpload
        maxFileSize={1024 * 1024}
        accept="image/*"
        {...rest}
        onFilesChange={(files) => {
          if (files.acceptedFiles?.length) {
            onChange(files.acceptedFiles[0])
          }
        }}
        maxFiles={1}
        inputRef={ref}
      >
        {({ files, deleteFile }) => (
          <FileUploadDropzone>
            <Text fontSize="sm">Drag your image here</Text>
            {!files?.length ? (
              <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
            ) : (
              <HStack>
                <Text fontSize="sm">{files[0].name}</Text>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(files[0])
                  }}
                >
                  Clear
                </Button>
              </HStack>
            )}
          </FileUploadDropzone>
        )}
      </FileUpload>
    )
  }),
  {
    isControlled: true,
  }
)

export const FormField = {
  render() {
    return (
      <Form
        onSubmit={async (data) => {
          const formData = new FormData()

          formData.append('profilePicture', data.file)
          formData.append(
            'meta',
            JSON.stringify({
              filename: data.file.name,
              size: data.file.size,
              type: data.file.type,
            })
          )
          formData.append('name', data.name)

          return fetch('/api/user', {
            method: 'POST',
            body: formData,
          }).then((response) => {
            if (response.ok) {
              // Handle successful upload
            } else {
              // Handle error
            }
          })
        }}
      >
        {({ Field }) => (
          <FormLayout>
            <Field name="name" label="Your name" />
            <UploadField name="file" label="Profile picture" />
            <SubmitButton />
          </FormLayout>
        )}
      </Form>
    )
  },
}
