import { SystemStyleObject } from '@chakra-ui/react'
import { createContext } from '@chakra-ui/utils'
import { normalizeProps, useMachine } from '@zag-js/react'
import * as fileUpload from '@zag-js/file-upload'
import { useId } from 'react'

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
  | 'acceptedFiles'
  | 'rejectedFiles'
  | 'dragging'
  | 'focused'
  | 'deleteFile'
  | 'setFiles'
  | 'openFilePicker'
  | 'clearFiles'
  | 'getFileSize'
  | 'createFileUrl'
> & {
  /**
   * @deprecated use `acceptedFiles` instead
   */
  files: File[]
  /**
   * @deprecated use `openFilePicker` instead
   */
  open: () => void
}

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

  return fileUpload.connect(state, send, normalizeProps)
}
