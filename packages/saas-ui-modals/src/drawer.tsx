import * as React from 'react'

import {
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerCloseButton,
  DrawerProps as ChakraDrawerProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalFooterProps,
} from '@chakra-ui/react'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { runIfFn } from '@chakra-ui/utils'

export interface BaseDrawerProps extends Omit<ChakraDrawerProps, 'children'> {
  /**
   * The drawer title
   */
  title: React.ReactNode
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
   * Hide the overflow
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

export const BaseDrawer: React.FC<BaseDrawerProps> = (props) => {
  const {
    title,
    children,
    footer,
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
    <ChakraDrawer isOpen={isOpen} onClose={onClose} {...rest}>
      {!hideOverlay && <DrawerOverlay />}
      <DrawerContent {...contentProps}>
        {title && <DrawerHeader {...headerProps}>{title}</DrawerHeader>}
        {!hideCloseButton && <DrawerCloseButton />}
        {runIfFn(children, {
          isOpen,
          onClose,
        })}
        {footer && <DrawerFooter {...footerProps}>{footer}</DrawerFooter>}
      </DrawerContent>
    </ChakraDrawer>
  )
}

export interface DrawerProps extends BaseDrawerProps {
  /**
   * Drawer footer content, wrapped with `DrawerFooter`
   */
  footer?: React.ReactNode
}

export const Drawer: React.FC<DrawerProps> = (props) => {
  const { children, isOpen, onClose, ...rest } = props
  return (
    <BaseDrawer isOpen={isOpen} onClose={onClose} {...rest}>
      <DrawerBody>
        {runIfFn(children, {
          isOpen,
          onClose,
        })}
      </DrawerBody>
    </BaseDrawer>
  )
}
