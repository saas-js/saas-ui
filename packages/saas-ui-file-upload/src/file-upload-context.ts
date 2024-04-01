import { SystemStyleObject } from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'
import { normalizeProps, useMachine } from '@zag-js/react'
import * as fileUpload from '@zag-js/file-upload'
import { useId } from 'react'
import { omit } from '@chakra-ui/utils'

export const [FileUploadStylesProvider, useFileUploadStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: 'FileUploadStylesProvider',
})

export const [FileUploadProvider, useFileUploadContext] =
  createContext<FileUploadContext>({
    name: 'FileUploadProvider',
  })

export type FileUploadContext = ReturnType<typeof useFileUpload>

export interface FileUploadOptions
  extends Omit<fileUpload.Context, 'id' | 'disabled'> {
  isDisabled?: boolean
}

export type FileUploadRenderContext = Pick<
  fileUpload.Api<any>,
  | 'files'
  | 'isDragging'
  | 'isFocused'
  | 'open'
  | 'deleteFile'
  | 'setFiles'
  | 'clearFiles'
  | 'getFileSize'
  | 'createFileUrl'
>

export const useFileUpload = (props: FileUploadOptions) => {
  const { isDisabled, ...rest } = props

  const initialContext: fileUpload.Context = {
    id: useId(),
    disabled: isDisabled,
    ...rest,
  }

  const [state, send] = useMachine(fileUpload.machine(initialContext), {
    context: {
      ...initialContext,
    },
  })

  const api = fileUpload.connect(state, send, normalizeProps)

  api.dropzoneProps = omit(api.dropzoneProps, ['onClick'])

  return api
}
