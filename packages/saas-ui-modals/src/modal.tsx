import * as React from 'react'

import type { HTMLChakraProps } from '@chakra-ui/react'
import { MaybeRenderProp, runIfFn } from '@saas-ui/core/utils'
import { Dialog as BaseDialog } from '@saas-ui/react/dialog'

export interface ModalProps extends Omit<BaseDialog.RootProps, 'children'> {
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
  onOpenChange: (details: { open: boolean }) => void
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
  headerProps?: HTMLChakraProps<'div'>
  /**
   * Props for the modal content
   */
  contentProps?: HTMLChakraProps<'div'>
  /**
   * Props for the modal body
   */
  bodyProps?: HTMLChakraProps<'div'>
  /**
   * Props for the modal footer
   */
  footerProps?: HTMLChakraProps<'div'>
}

export const Modal: React.FC<ModalProps> = (props) => {
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
    bodyProps,
    footerProps,
    ...rest
  } = props
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange} {...rest}>
      <BaseDialog.Content {...contentProps}>
        {title && (
          <BaseDialog.Header {...headerProps}>{title}</BaseDialog.Header>
        )}
        {!hideCloseButton && <BaseDialog.CloseButton />}
        <BaseDialog.Body>
          <BaseDialog.Context>
            {({ open, setOpen }) => runIfFn(children, { open, setOpen })}
          </BaseDialog.Context>
        </BaseDialog.Body>
        {footer && (
          <BaseDialog.Footer {...footerProps}>{footer}</BaseDialog.Footer>
        )}
      </BaseDialog.Content>
    </BaseDialog.Root>
  )
}
