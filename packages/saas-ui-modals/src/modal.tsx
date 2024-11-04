import * as React from 'react'

import { Dialog } from '@chakra-ui/react'
import { MaybeRenderProp, runIfFn } from '@saas-ui/core/utils'
import { CloseButton } from '@saas-ui/react/close-button'

export interface BaseModalProps
  extends Omit<Dialog.RootProps, 'children' | 'onOpenChange'> {
  /**
   * The modal title
   */
  title?: React.ReactNode
  /**
   * Whether the modal is open
   */
  open: boolean
  /**
   * Callback when the modal is opened or closed
   */
  onOpenChange: (details: Dialog.OpenChangeDetails) => void
  /**
   * The modal children
   */
  children: MaybeRenderProp<{
    open: boolean
    setOpen: (open: boolean) => void
  }>
  /**
   * The modal footer
   */
  footer?: React.ReactNode
  /**
   * Hide the close button
   */
  hideCloseButton?: boolean
  /**
   * Hide the overlay
   */
  hideBackdrop?: boolean
  /**
   * Props for the modal header
   */
  headerProps?: Dialog.HeaderProps
  /**
   * Props for the modal content
   */
  contentProps?: Dialog.ContentProps
  /**
   * Props for the modal footer
   */
  footerProps?: Dialog.FooterProps
}

export const BaseModal: React.FC<BaseModalProps> = (props) => {
  const {
    title,
    footer,
    children,
    open,
    onOpenChange,
    hideCloseButton,
    hideBackdrop,
    headerProps,
    contentProps,
    footerProps,
    ...rest
  } = props
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...rest}>
      {!hideBackdrop && <Dialog.Backdrop />}
      <Dialog.Positioner>
        <Dialog.Content {...contentProps}>
          {title && <Dialog.Header {...headerProps}>{title}</Dialog.Header>}
          {!hideCloseButton && (
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          )}
          <Dialog.Context>
            {({ open, setOpen }) => runIfFn(children, { open, setOpen })}
          </Dialog.Context>
          {footer && <Dialog.Footer {...footerProps}>{footer}</Dialog.Footer>}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const Modal: React.FC<BaseModalProps> = (props) => {
  const { children, open, onOpenChange, ...rest } = props
  return (
    <BaseModal {...rest} open={open} onOpenChange={onOpenChange}>
      <Dialog.Body>
        <Dialog.Context>
          {({ open, setOpen }) => runIfFn(children, { open, setOpen })}
        </Dialog.Context>
      </Dialog.Body>
    </BaseModal>
  )
}
