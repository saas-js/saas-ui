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
} from '@chakra-ui/react'

export interface BaseModalProps extends ChakraModalProps {
  /**
   * The modal title
   */
  title?: React.ReactNode
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
    ...rest
  } = props
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
      {!hideOverlay && <ModalOverlay />}
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        {!hideCloseButton && <ModalCloseButton />}
        {children}
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  )
}

export const Modal: React.FC<BaseModalProps> = (props) => {
  const { children, ...rest } = props
  return (
    <BaseModal {...rest}>
      <ModalBody>{children}</ModalBody>
    </BaseModal>
  )
}
