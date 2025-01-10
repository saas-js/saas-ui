import * as React from 'react'

import { type HTMLChakraProps } from '@chakra-ui/react'
import { MaybeRenderProp, runIfFn } from '@saas-ui/core/utils'
import { Drawer as BaseDrawer } from '@saas-ui/react/drawer'

export interface DrawerProps extends Omit<BaseDrawer.RootProps, 'children'> {
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
  onOpenChange: (details: { open: boolean }) => void
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
  headerProps?: HTMLChakraProps<'div'>
  /**
   * Props for the modal content
   */
  contentProps?: BaseDrawer.ContentProps
  /**
   * Props for the modal footer
   */
  footerProps?: HTMLChakraProps<'div'>
  /**
   * Props for the modal body
   */
  bodyProps?: HTMLChakraProps<'div'>
}

export const Drawer: React.FC<DrawerProps> = (props) => {
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
    bodyProps,
    footerProps,
    ...rest
  } = props
  return (
    <BaseDrawer.Root open={open} onOpenChange={onOpenChange} {...rest}>
      {!hideBackdrop && <BaseDrawer.Backdrop />}
      <BaseDrawer.Content {...contentProps}>
        {title && (
          <BaseDrawer.Header {...headerProps}>{title}</BaseDrawer.Header>
        )}
        {!hideCloseButton && <BaseDrawer.CloseButton />}
        <BaseDrawer.Body {...bodyProps}>
          <BaseDrawer.Context>
            {({ open, setOpen }) => runIfFn(children, { open, setOpen })}
          </BaseDrawer.Context>
        </BaseDrawer.Body>
        {footer && (
          <BaseDrawer.Footer {...footerProps}>{footer}</BaseDrawer.Footer>
        )}
      </BaseDrawer.Content>
    </BaseDrawer.Root>
  )
}
