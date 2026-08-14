'use client'

import * as React from 'react'

import {
  Button,
  type ButtonProps,
  type HTMLChakraProps,
} from '@chakra-ui/react'

import { Dialog } from '../dialog/index.ts'
import { Drawer as DrawerPrimitive } from '../drawer/index.ts'

type MaybeRenderProp<T> = React.ReactNode | ((props: T) => React.ReactNode)

function runIfFn<T>(value: MaybeRenderProp<T>, props: T) {
  return typeof value === 'function' ? value(props) : value
}

function callAll<T extends (...args: any[]) => void>(
  ...callbacks: Array<T | undefined>
) {
  return (...args: Parameters<T>) => {
    callbacks.forEach((callback) => callback?.(...args))
  }
}

export interface ModalProps extends Omit<Dialog.RootProps, 'children'> {
  title?: React.ReactNode
  open: boolean
  onOpenChange: (details: { open: boolean }) => void
  children?: MaybeRenderProp<{
    open: boolean
    setOpen: (open: boolean) => void
  }>
  footer?: React.ReactNode
  hideCloseButton?: boolean
  hideBackdrop?: boolean
  headerProps?: HTMLChakraProps<'div'>
  contentProps?: Dialog.ContentProps
  bodyProps?: HTMLChakraProps<'div'>
  footerProps?: HTMLChakraProps<'div'>
}

export const Modal = (props: ModalProps) => {
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
    ...rootProps
  } = props

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...rootProps}>
      <Dialog.Content backdrop={!hideBackdrop} {...contentProps}>
        {title && <Dialog.Header {...headerProps}>{title}</Dialog.Header>}
        {!hideCloseButton && <Dialog.CloseButton />}
        <Dialog.Body {...bodyProps}>
          {runIfFn(children, {
            open,
            setOpen: (open) => onOpenChange({ open }),
          })}
        </Dialog.Body>
        {footer && <Dialog.Footer {...footerProps}>{footer}</Dialog.Footer>}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export interface DrawerProps extends Omit<
  DrawerPrimitive.RootProps,
  'children'
> {
  title?: React.ReactNode
  open: boolean
  onOpenChange: (details: { open: boolean }) => void
  children?: MaybeRenderProp<{
    open: boolean
    setOpen: (open: boolean) => void
  }>
  footer?: React.ReactNode
  hideCloseButton?: boolean
  hideBackdrop?: boolean
  headerProps?: HTMLChakraProps<'div'>
  contentProps?: DrawerPrimitive.ContentProps
  bodyProps?: HTMLChakraProps<'div'>
  footerProps?: HTMLChakraProps<'div'>
}

export const Drawer = (props: DrawerProps) => {
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
    ...rootProps
  } = props

  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      {...rootProps}
    >
      {!hideBackdrop && <DrawerPrimitive.Backdrop />}
      <DrawerPrimitive.Content {...contentProps}>
        {title && (
          <DrawerPrimitive.Header {...headerProps}>
            {title}
          </DrawerPrimitive.Header>
        )}
        {!hideCloseButton && <DrawerPrimitive.CloseButton />}
        <DrawerPrimitive.Body {...bodyProps}>
          {runIfFn(children, {
            open,
            setOpen: (open) => onOpenChange({ open }),
          })}
        </DrawerPrimitive.Body>
        {footer && (
          <DrawerPrimitive.Footer {...footerProps}>
            {footer}
          </DrawerPrimitive.Footer>
        )}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Root>
  )
}

export interface AlertDialogProps extends Omit<
  Dialog.RootProps,
  'children' | 'initialFocusEl' | 'onOpenChange' | 'open'
> {
  open: boolean
  onOpenChange: (details: { open: boolean }) => void
  title?: React.ReactNode
  children?: React.ReactNode
  translations?: {
    cancel?: React.ReactNode
    confirm?: React.ReactNode
  }
  slotProps?: {
    cancel?: ButtonProps
    confirm?: ButtonProps
    footer?: HTMLChakraProps<'div'>
  }
  closeOnCancel?: boolean
  closeOnConfirm?: boolean
  backdrop?: boolean
  hideCloseButton?: boolean
  leastDestructiveFocus?: 'cancel' | 'confirm'
  onCancel?: () => Promise<void> | void
  onConfirm?: () => Promise<void> | void
}

export const AlertDialog = (props: AlertDialogProps) => {
  const {
    title,
    translations,
    slotProps,
    open,
    closeOnCancel = true,
    closeOnConfirm = true,
    leastDestructiveFocus = 'cancel',
    backdrop = true,
    hideCloseButton,
    onOpenChange,
    onCancel,
    onConfirm,
    children,
    ...rootProps
  } = props
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const confirmRef = React.useRef<HTMLButtonElement>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const titleId = React.useId()
  const contentId = React.useId()

  const handleConfirm = async () => {
    try {
      const result = onConfirm?.()
      if (result instanceof Promise) {
        setIsLoading(true)
        await result
      }
      if (closeOnConfirm) onOpenChange({ open: false })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      role="alertdialog"
      size="sm"
      aria-labelledby={titleId}
      aria-describedby={contentId}
      initialFocusEl={() =>
        leastDestructiveFocus === 'cancel'
          ? cancelRef.current
          : confirmRef.current
      }
      {...rootProps}
    >
      <Dialog.Content backdrop={backdrop}>
        {!hideCloseButton && <Dialog.CloseButton />}
        <Dialog.Header>
          <Dialog.Title id={titleId}>{title}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body id={contentId}>{children}</Dialog.Body>
        <Dialog.Footer {...slotProps?.footer}>
          <Button
            ref={cancelRef}
            variant="ghost"
            colorPalette="gray"
            {...slotProps?.cancel}
            onClick={callAll(slotProps?.cancel?.onClick, () => {
              void onCancel?.()
              if (closeOnCancel) onOpenChange({ open: false })
            })}
          >
            {slotProps?.cancel?.children || translations?.cancel || 'Cancel'}
          </Button>
          <Button
            ref={confirmRef}
            variant="solid"
            loading={isLoading}
            {...slotProps?.confirm}
            onClick={callAll(handleConfirm, slotProps?.confirm?.onClick)}
          >
            {slotProps?.confirm?.children || translations?.confirm || 'Confirm'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
