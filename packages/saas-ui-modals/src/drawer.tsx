import * as React from 'react'

import { Drawer as ChakraDrawer, IconButton } from '@chakra-ui/react'
import { MaybeRenderProp, runIfFn } from '@saas-ui/core/utils'

export interface BaseDrawerProps
  extends Omit<ChakraDrawer.RootProps, 'children'> {
  /**
   * The drawer title
   */
  title: React.ReactNode
  /**
   * Whether the modal is open
   */
  open: boolean
  /**
   * Callback when the drawer is opened or closed
   */
  onOpenChange: (details: ChakraDrawer.OpenChangeDetails) => void
  /**
   * The drawer children
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
   * Hide the backdrop
   */
  hideBackdrop?: boolean
  /**
   * Props for the modal header
   */
  headerProps?: ChakraDrawer.HeaderProps
  /**
   * Props for the modal content
   */
  contentProps?: ChakraDrawer.ContentProps
  /**
   * Props for the modal footer
   */
  footerProps?: ChakraDrawer.FooterProps
}

export const BaseDrawer: React.FC<BaseDrawerProps> = (props) => {
  const {
    title,
    children,
    footer,
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
    <ChakraDrawer.Root open={open} onOpenChange={onOpenChange} {...rest}>
      {!hideBackdrop && <ChakraDrawer.Backdrop />}
      <ChakraDrawer.Positioner>
        <ChakraDrawer.Content {...contentProps}>
          {title && (
            <ChakraDrawer.Header {...headerProps}>{title}</ChakraDrawer.Header>
          )}
          {!hideCloseButton && (
            <ChakraDrawer.CloseTrigger>
              <IconButton variant="ghost" />
            </ChakraDrawer.CloseTrigger>
          )}
          <ChakraDrawer.Context>
            {({ open, setOpen }) => runIfFn(children, { open, setOpen })}
          </ChakraDrawer.Context>
          {footer && (
            <ChakraDrawer.Footer {...footerProps}>{footer}</ChakraDrawer.Footer>
          )}
        </ChakraDrawer.Content>
      </ChakraDrawer.Positioner>
    </ChakraDrawer.Root>
  )
}

export interface DrawerProps extends BaseDrawerProps {
  /**
   * Drawer footer content, wrapped with `DrawerFooter`
   */
  footer?: React.ReactNode
}

export const Drawer: React.FC<DrawerProps> = (props) => {
  const { children, ...rest } = props
  return (
    <BaseDrawer {...rest}>
      <ChakraDrawer.Body>
        <ChakraDrawer.Context>
          {({ open, setOpen }) => runIfFn(children, { open, setOpen })}
        </ChakraDrawer.Context>
      </ChakraDrawer.Body>
    </BaseDrawer>
  )
}
