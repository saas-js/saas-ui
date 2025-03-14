import * as React from 'react'

import { Clipboard as ChakraClipboard } from '@chakra-ui/react/clipboard'

import { Button, type ButtonProps } from '../button'
import { IconButton, type IconButtonProps } from '../icon-button'
import { CheckIcon, CopyIcon } from '../icons'
import { Input, type InputProps } from '../input'

const ClipboardIcon = React.forwardRef<
  HTMLDivElement,
  ChakraClipboard.IndicatorProps
>(function ClipboardIndicator(props, ref) {
  const { children = <CopyIcon />, copied = <CheckIcon />, ...rest } = props
  return (
    <ChakraClipboard.Indicator copied={copied} {...rest} ref={ref}>
      {children}
    </ChakraClipboard.Indicator>
  )
})

const ClipboardCopyText = React.forwardRef<
  HTMLDivElement,
  ChakraClipboard.IndicatorProps
>(function ClipboardCopyText(props, ref) {
  const { children = 'Copy', copied = 'Copied', ...rest } = props
  return (
    <ChakraClipboard.Indicator copied={copied} {...rest} ref={ref}>
      {children}
    </ChakraClipboard.Indicator>
  )
})

interface ClipboardButtonProps extends ButtonProps {
  icon?: React.ReactNode
  copiedIcon?: React.ReactNode
  copied?: string
}

const ClipboardButton = React.forwardRef<
  HTMLButtonElement,
  ClipboardButtonProps
>(function ClipboardButton(props, ref) {
  const { icon, copiedIcon, copied, children, ...rest } = props
  return (
    <ChakraClipboard.Trigger asChild>
      <Button ref={ref} {...rest}>
        <ClipboardIcon copied={copiedIcon}>{icon}</ClipboardIcon>
        <ClipboardCopyText copied={copied}>{children}</ClipboardCopyText>
      </Button>
    </ChakraClipboard.Trigger>
  )
})

interface ClipboardIconButtonProps extends IconButtonProps {
  icon?: React.ReactNode
  copiedIcon?: React.ReactNode
}

const ClipboardIconButton = React.forwardRef<
  HTMLButtonElement,
  ClipboardIconButtonProps
>(function ClipboardIconButton(props, ref) {
  const { icon, copiedIcon, ...rest } = props
  return (
    <ChakraClipboard.Trigger asChild>
      <IconButton ref={ref} size="xs" {...rest}>
        <ClipboardIcon copied={copiedIcon}>{icon}</ClipboardIcon>
      </IconButton>
    </ChakraClipboard.Trigger>
  )
})

const ClipboardInput = React.forwardRef<HTMLInputElement, InputProps>(
  function ClipboardInputElement(props, ref) {
    return (
      <ChakraClipboard.Input asChild>
        <Input ref={ref} {...props} />
      </ChakraClipboard.Input>
    )
  },
)

const ClipboardRoot = ChakraClipboard.Root
const ClipboardLabel = ChakraClipboard.Label

export {
  ClipboardButton as Button,
  ClipboardIconButton as IconButton,
  ClipboardInput as Input,
  ClipboardLabel as Label,
  ClipboardRoot as Root,
}

type ClipboardRootProps = ChakraClipboard.RootProps

export type { ClipboardRootProps as RootProps }
