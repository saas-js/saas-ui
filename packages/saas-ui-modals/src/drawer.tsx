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
} from '@chakra-ui/react'

export interface BaseDrawerProps extends Omit<ChakraDrawerProps, 'children'> {
  /**
   * The drawer title
   */
  title: React.ReactNode
  /**
   * Hide the close button
   */
  hideCloseButton?: boolean
  /**
   * Hide the overflow
   */
  hideOverlay?: boolean
  children?: React.ReactNode
}

export const BaseDrawer: React.FC<BaseDrawerProps> = (props) => {
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
    <ChakraDrawer isOpen={isOpen} onClose={onClose} {...rest}>
      {!hideOverlay && <DrawerOverlay />}
      <DrawerContent>
        <DrawerHeader>{title}</DrawerHeader>
        {!hideCloseButton && <DrawerCloseButton />}
        {children}
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
  const { footer, children, ...rest } = props
  return (
    <BaseDrawer {...rest}>
      <DrawerBody>{children}</DrawerBody>

      {footer && <DrawerFooter>{footer}</DrawerFooter>}
    </BaseDrawer>
  )
}
