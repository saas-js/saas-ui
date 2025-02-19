'use client'

import * as React from 'react'

import { Span } from '@chakra-ui/react'
import {
  FileUpload as ChakraFileUpload,
  useFileUploadContext,
} from '@chakra-ui/react/file-upload'
import { type RecipeProps, useRecipe } from '@chakra-ui/react/styled-system'

import { Button, type ButtonProps } from '#components/button'
import { CloseButton } from '#components/close-button/close-button'

export interface RootProps extends ChakraFileUpload.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const Root = React.forwardRef<HTMLInputElement, RootProps>(
  function FileUploadRoot(props, ref) {
    const { children, inputProps, ...rest } = props
    return (
      <ChakraFileUpload.Root {...rest}>
        <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />
        {children}
      </ChakraFileUpload.Root>
    )
  },
)

export interface DropzoneProps extends ChakraFileUpload.DropzoneProps {}

export const Dropzone = React.forwardRef<HTMLInputElement, DropzoneProps>(
  function FileUploadDropzone(props, ref) {
    const { children, ...rest } = props
    return (
      <ChakraFileUpload.Dropzone ref={ref} {...rest}>
        <ChakraFileUpload.DropzoneContent>
          {children}
        </ChakraFileUpload.DropzoneContent>
      </ChakraFileUpload.Dropzone>
    )
  },
)

interface VisibilityProps {
  showSize?: boolean
  clearable?: boolean
}

interface ItemProps extends VisibilityProps {
  file: File
  icon?: React.ReactNode
}

const Item = React.forwardRef<HTMLLIElement, ItemProps>(
  function FileUploadItem(props, ref) {
    const { file, showSize, icon, clearable } = props
    return (
      <ChakraFileUpload.Item file={file} ref={ref}>
        <ChakraFileUpload.ItemPreview>{icon}</ChakraFileUpload.ItemPreview>

        {showSize ? (
          <ChakraFileUpload.ItemContent>
            <ChakraFileUpload.ItemName />
            <ChakraFileUpload.ItemSizeText />
          </ChakraFileUpload.ItemContent>
        ) : (
          <ChakraFileUpload.ItemName flex="1" />
        )}

        {clearable && (
          <ChakraFileUpload.ItemDeleteTrigger asChild>
            <CloseButton size="xs" />
          </ChakraFileUpload.ItemDeleteTrigger>
        )}
      </ChakraFileUpload.Item>
    )
  },
)

interface ListProps extends VisibilityProps, ChakraFileUpload.ItemGroupProps {
  files?: File[]
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  function FileUploadList(props, ref) {
    const { showSize, clearable, files, ...rest } = props

    const fileUpload = useFileUploadContext()
    const acceptedFiles = files ?? fileUpload.acceptedFiles

    if (acceptedFiles.length === 0) return null

    return (
      <ChakraFileUpload.ItemGroup ref={ref} {...rest}>
        {acceptedFiles.map((file) => (
          <Item
            key={file.name}
            file={file}
            showSize={showSize}
            clearable={clearable}
          />
        ))}
      </ChakraFileUpload.ItemGroup>
    )
  },
)

type Assign<T, U> = Omit<T, keyof U> & U

export interface InputProps extends Assign<ButtonProps, RecipeProps<'input'>> {
  placeholder?: React.ReactNode
}

export const Input = React.forwardRef<HTMLButtonElement, InputProps>(
  function FileInput(props, ref) {
    const inputRecipe = useRecipe({ key: 'input' })
    const [recipeProps, restProps] = inputRecipe.splitVariantProps(props)
    const { placeholder = 'Select file(s)', ...rest } = restProps
    return (
      <ChakraFileUpload.Trigger asChild>
        <Button
          unstyled
          py="0"
          ref={ref}
          {...rest}
          css={[inputRecipe(recipeProps), props.css]}
        >
          <ChakraFileUpload.Context>
            {({ acceptedFiles }) => {
              if (acceptedFiles.length === 1) {
                return <span>{acceptedFiles[0].name}</span>
              }
              if (acceptedFiles.length > 1) {
                return <span>{acceptedFiles.length} files</span>
              }
              return <Span color="fg.subtle">{placeholder}</Span>
            }}
          </ChakraFileUpload.Context>
        </Button>
      </ChakraFileUpload.Trigger>
    )
  },
)

export const Label = ChakraFileUpload.Label
export const ClearTrigger = ChakraFileUpload.ClearTrigger
export const Trigger = ChakraFileUpload.Trigger
