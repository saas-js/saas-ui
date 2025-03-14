import { forwardRef } from 'react'

import { Dialog as ChakraDialog } from '@chakra-ui/react/dialog'
import { Portal } from '@chakra-ui/react/portal'

import { CloseButton as CloseButtonBase } from '#components/close-button'

export { DialogContext } from '@ark-ui/react/dialog'

export interface ContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  backdrop?: boolean
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  function DialogContent(props, ref) {
    const {
      children,
      portalled = true,
      portalRef,
      backdrop = true,
      ...rest
    } = props

    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && <ChakraDialog.Backdrop />}
        <ChakraDialog.Positioner>
          <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
            {children}
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    )
  },
)

export const CloseButton = forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialog.CloseTrigger {...props} asChild>
      <CloseButtonBase size="sm" ref={ref}>
        {props.children}
      </CloseButtonBase>
    </ChakraDialog.CloseTrigger>
  )
})

export const CloseTrigger = ChakraDialog.CloseTrigger

export type RootProps = ChakraDialog.RootProps

export const Root = ChakraDialog.Root
export const Context = ChakraDialog.Context
export const Footer = ChakraDialog.Footer
export const Header = ChakraDialog.Header
export const Body = ChakraDialog.Body
export const Backdrop = ChakraDialog.Backdrop
export const Title = ChakraDialog.Title
export const Description = ChakraDialog.Description
export const Trigger = ChakraDialog.Trigger
export const ActionTrigger = ChakraDialog.ActionTrigger
