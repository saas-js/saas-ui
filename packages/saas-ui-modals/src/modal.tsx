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
  title: React.ReactNode
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
        <ModalHeader>{title}</ModalHeader>
        {!hideCloseButton && <ModalCloseButton />}
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export interface ModalProps extends BaseModalProps {
  /**
   * The modal footer, wrapped with `ModalFooter`
   */
  footer?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { children, footer, ...rest } = props
  return (
    <BaseModal {...rest}>
      <ModalBody>{children}</ModalBody>

      {footer && <ModalFooter>{footer}</ModalFooter>}
    </BaseModal>
  )
}
