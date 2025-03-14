import * as React from 'react'

import { Popover as ChakraPopover } from '@chakra-ui/react/popover'
import { Portal } from '@chakra-ui/react/portal'

import { CloseButton as CloseButtonBase } from '#components/close-button'

interface ContentProps extends ChakraPopover.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  function PopoverContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content ref={ref} {...rest} />
        </ChakraPopover.Positioner>
      </Portal>
    )
  },
)

export const Arrow = React.forwardRef<HTMLDivElement, ChakraPopover.ArrowProps>(
  function PopoverArrow(props, ref) {
    return (
      <ChakraPopover.Arrow {...props} ref={ref}>
        <ChakraPopover.ArrowTip />
      </ChakraPopover.Arrow>
    )
  },
)

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  ChakraPopover.CloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ChakraPopover.CloseTrigger
      position="absolute"
      top="1"
      insetEnd="1"
      {...props}
      asChild
      ref={ref}
    >
      <CloseButtonBase size="sm" />
    </ChakraPopover.CloseTrigger>
  )
})

export const CloseTrigger = ChakraPopover.CloseTrigger

export const Title = ChakraPopover.Title
export const Description = ChakraPopover.Description
export const Footer = ChakraPopover.Footer
export const Header = ChakraPopover.Header
export const Root = ChakraPopover.Root
export const Body = ChakraPopover.Body
export const Trigger = ChakraPopover.Trigger

export type RootProps = ChakraPopover.RootProps
