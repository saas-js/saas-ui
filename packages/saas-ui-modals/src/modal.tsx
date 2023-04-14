import * as React from 'react'

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps as ChakraModalProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalFooterProps,
} from '@chakra-ui/react'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { runIfFn } from '@chakra-ui/utils'

export interface BaseModalProps extends Omit<ChakraModalProps, 'children'> {
  /**
   * The modal title
   */
  title?: React.ReactNode
  /**
   * The modal children
   */
  children: MaybeRenderProp<{
    isOpen: boolean
    onClose: () => void
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
  hideOverlay?: boolean
  /**
   * Props for the modal header
   */
  headerProps?: ModalHeaderProps
  /**
   * Props for the modal content
   */
  contentProps?: ModalContentProps
  /**
   * Props for the modal footer
   */
  footerProps?: ModalFooterProps
}

export const BaseModal: React.FC<BaseModalProps> = (props) => {
  const {
    title,
    footer,
    children,
    isOpen,
    onClose,
    hideCloseButton,
    hideOverlay,
    headerProps,
    contentProps,
    footerProps,
    ...rest
  } = props
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
      {!hideOverlay && <ModalOverlay />}
      <ModalContent {...contentProps}>
        {title && <ModalHeader {...headerProps}>{title}</ModalHeader>}
        {!hideCloseButton && <ModalCloseButton />}
        {runIfFn(children, {
          isOpen,
          onClose,
        })}
        {footer && <ModalFooter {...footerProps}>{footer}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  )
}

export const Modal: React.FC<BaseModalProps> = (props) => {
  const { children, isOpen, onClose, ...rest } = props
  return (
    <BaseModal {...rest} isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        {runIfFn(children, {
          isOpen,
          onClose,
        })}
      </ModalBody>
    </BaseModal>
  )
}
