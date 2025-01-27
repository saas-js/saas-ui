import * as React from 'react'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
  ButtonProps,
  Image,
  ImageProps,
  useEnvironment,
  ThemingProps,
} from '@chakra-ui/react'

import { pick, runIfFn, split, MaybeRenderProp } from '@chakra-ui/utils'
import {
  FileUploadProvider,
  useFileUpload,
  FileUploadStylesProvider,
  useFileUploadContext,
  useFileUploadStyles,
  FileUploadOptions,
  FileUploadRenderContext,
} from './file-upload-context'

import { fileUploadTheme } from './file-upload-theme'
import { FileChangeDetails } from '@zag-js/file-upload'

export interface FileUploadProps
  extends Omit<HTMLChakraProps<'div'>, 'children' | 'dir'>,
    ThemingProps<'SuiFileUpload'>,
    FileUploadOptions {
  children: MaybeRenderProp<FileUploadRenderContext>
  inputRef?: React.Ref<HTMLInputElement>
  /**
   * @deprecated use `onFileChange` instead
   */
  onFilesChange?: (details: FileChangeDetails) => void
}

export const FileUpload = forwardRef<FileUploadProps, 'div'>((props, ref) => {
  const {
    children,
    inputRef,
    colorScheme,
    size,
    variant,
    styleConfig,
    onFilesChange,
    ...rest
  } = props

  const [options, containerProps] = split(rest, [
    'translations',
    'accept',
    'allowDrop',
    'dir',
    'isDisabled',
    'validate',
    'locale',
    'maxFileSize',
    'maxFiles',
    'minFileSize',
    'name',
    'onFileAccept',
    'onFileChange',
    'onFileReject',
    'getRootNode',
  ])

  const env = useEnvironment()

  const context = useFileUpload({
    getRootNode: env.getDocument,
    onFileChange: onFilesChange,
    ...options,
  })

  const styles = useMultiStyleConfig('SuiFileUpload', {
    styleConfig: styleConfig ?? fileUploadTheme,
    size,
    variant,
    colorScheme,
  })

  const renderContext: FileUploadRenderContext = {
    ...pick(context, [
      'acceptedFiles',
      'rejectedFiles',
      'clearFiles',
      'createFileUrl',
      'deleteFile',
      'getFileSize',
      'dragging',
      'focused',
      'openFilePicker',
      'setFiles',
    ]),
    open: context.openFilePicker,
    files: context.acceptedFiles,
  }

  return (
    <FileUploadStylesProvider value={styles}>
      <FileUploadProvider value={context}>
        <chakra.div
          ref={ref}
          {...containerProps}
          {...context.getRootProps()}
          __css={styles.container}
        >
          <input ref={inputRef} {...context.getHiddenInputProps()} />
          {runIfFn(children, renderContext)}
        </chakra.div>
      </FileUploadProvider>
    </FileUploadStylesProvider>
  )
})

export const FileUploadDropzone = forwardRef((props, ref) => {
  const { children, ...rest } = props

  const { getDropzoneProps } = useFileUploadContext()

  const styles = useFileUploadStyles()

  const { onClick, ...dropzoneProps } = getDropzoneProps()

  return (
    <chakra.div ref={ref} {...rest} {...dropzoneProps} __css={styles.dropzone}>
      {children}
    </chakra.div>
  )
})

export const FileUploadTrigger = forwardRef<ButtonProps, 'button'>(
  (props, ref) => {
    const { children, ...rest } = props

    const { getTriggerProps } = useFileUploadContext()

    const styles = useFileUploadStyles()

    return (
      <chakra.button
        ref={ref}
        {...rest}
        {...getTriggerProps()}
        __css={styles.button}
      >
        {children}
      </chakra.button>
    )
  }
)

export interface FileUploadPreviewProps extends Omit<ImageProps, 'src'> {
  file: File
}

export const FileUploadPreview = forwardRef<FileUploadPreviewProps, 'img'>(
  (props, ref) => {
    const { file, ...rest } = props
    const [src, setSrc] = React.useState<string>()
    const cleanup = React.useRef<VoidFunction | null>(null)

    const { createFileUrl } = useFileUploadContext()

    React.useEffect(() => {
      if (file) {
        cleanup.current = createFileUrl(file, (url) => setSrc(url))
      }

      return () => {
        if (cleanup.current) {
          cleanup.current()
          cleanup.current = null
        }
      }
    }, [file])

    return <Image ref={ref} {...rest} src={src} />
  }
)
