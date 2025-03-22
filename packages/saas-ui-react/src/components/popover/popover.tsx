import { type RefObject, forwardRef } from 'react'

import { Popover as ChakraPopover } from '@chakra-ui/react/popover'
import { Portal } from '@chakra-ui/react/portal'

import { CloseButton as CloseButtonBase } from '#components/close-button/index.ts'

export interface ContentProps extends ChakraPopover.ContentProps {
  portalled?: boolean
  portalRef?: RefObject<HTMLElement>
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  function PopoverContent(props, ref) {
    // TODO: fix this, somehow the experimental dts build fails when deconstructing props
    const portalled = props.portalled ?? false
    const portalRef = props.portalRef ?? undefined
    const children = props.children ?? null

    delete props.portalled
    delete props.portalRef
    delete props.children

    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content ref={ref} {...props}>
            {children}
          </ChakraPopover.Content>
        </ChakraPopover.Positioner>
      </Portal>
    )
  },
)

export const Arrow = forwardRef<HTMLDivElement, ChakraPopover.ArrowProps>(
  function PopoverArrow(props, ref) {
    return (
      <ChakraPopover.Arrow {...props} ref={ref}>
        <ChakraPopover.ArrowTip />
      </ChakraPopover.Arrow>
    )
  },
)

export const CloseButton = forwardRef<
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
export const Context = ChakraPopover.Context

export type RootProps = ChakraPopover.RootProps
