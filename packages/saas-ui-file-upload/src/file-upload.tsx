import * as React from 'react'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
  ButtonProps,
  Image,
  ImageProps,
} from '@chakra-ui/react'

import { pick, runIfFn, split } from '@chakra-ui/utils'
import {
  FileUploadProvider,
  useFileUpload,
  FileUploadStylesProvider,
  useFileUploadContext,
  useFileUploadStyles,
  FileUploadOptions,
  FileUploadRenderContext,
} from './file-upload-context'

import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { fileUploadTheme } from './file-upload-theme'

export interface FileUploadProps
  extends Omit<HTMLChakraProps<'div'>, 'children' | 'dir'>,
    FileUploadOptions {
  children: MaybeRenderProp<FileUploadRenderContext>
  inputRef?: React.Ref<HTMLInputElement>
}

export const FileUpload = forwardRef<FileUploadProps, 'div'>((props, ref) => {
  const { children, inputRef, ...rest } = props

  const [options, containerProps] = split(rest, [
    'accept',
    'allowDrop',
    'dir',
    'isDisabled',
    'files',
    'isValidFile',
    'locale',
    'maxFileSize',
    'maxFiles',
    'minFileSize',
    'name',
    'onFilesChange',
  ])

  const context = useFileUpload(options)

  const styles = useMultiStyleConfig('SuiFileUpload', {
    styleConfig: fileUploadTheme,
  })

  const renderContext: FileUploadRenderContext = pick(context, [
    'files',
    'clearFiles',
    'createFileUrl',
    'deleteFile',
    'getFileSize',
    'isDragging',
    'isFocused',
    'open',
    'setFiles',
  ])

  return (
    <FileUploadStylesProvider value={styles}>
      <FileUploadProvider value={context}>
        <chakra.div
          ref={ref}
          {...containerProps}
          {...context.rootProps}
          __css={styles.container}
        >
          <input ref={inputRef} {...context.hiddenInputProps} />
          {runIfFn(children, renderContext)}
        </chakra.div>
      </FileUploadProvider>
    </FileUploadStylesProvider>
  )
})

export const FileUploadDropzone = forwardRef((props, ref) => {
  const { children, ...rest } = props

  const { dropzoneProps } = useFileUploadContext()

  const styles = useFileUploadStyles()

  return (
    <chakra.div ref={ref} {...rest} {...dropzoneProps} __css={styles.dropzone}>
      {children}
    </chakra.div>
  )
})

export const FileUploadTrigger = forwardRef<ButtonProps, 'button'>(
  (props, ref) => {
    const { children, ...rest } = props

    const { triggerProps } = useFileUploadContext()

    const styles = useFileUploadStyles()

    return (
      <chakra.button
        ref={ref}
        {...rest}
        {...triggerProps}
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
