# @saas-ui/file-upload

File Upload component with drag and drop support for Chakra UI.

## Installation

```sh
$ yarn add @saas-ui/file-upload

#or

$ npm i @saas-ui/file-upload  --save
```

## Usage

```tsx
import { Text, HStack, Button } from '@chakra-ui/react'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadButton,
} from '@saas-ui/file-upload'

const Page = () => {
  return (
    <FileUpload maxFileSize={1024 * 1024} maxFiles={1} accept="image/*">
      {({ files, deleteFile }) => (
        <FileUploadDropzone>
          <Text fontSize="sm">Drag your image here</Text>
          {!files?.length ? (
            <FileUploadButton as={Button}>Select files</FileUploadButton>
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
}
```

## License

MIT - Appulse Software
