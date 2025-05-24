'use client'

import { CloseButton, FileUpload, InputGroup } from '@saas-ui/react'
import { LuFileUp } from 'react-icons/lu'

export const FileUploadWithInputClear = () => {
  return (
    <FileUpload.Root gap="1" maxWidth="300px">
      <FileUpload.Label>Upload file</FileUpload.Label>
      <InputGroup
        w="full"
        startElement={<LuFileUp />}
        endElement={
          <FileUpload.ClearTrigger asChild>
            <CloseButton
              me="-1"
              size="xs"
              variant="plain"
              focusVisibleRing="inside"
              focusRingWidth="2px"
              pointerEvents="auto"
              color="fg.subtle"
            />
          </FileUpload.ClearTrigger>
        }
      >
        <FileUpload.Input />
      </InputGroup>
    </FileUpload.Root>
  )
}
