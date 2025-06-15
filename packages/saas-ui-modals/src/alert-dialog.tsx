import * as React from 'react'

import { Button, ButtonProps, type HTMLChakraProps } from '@chakra-ui/react'
import { callAll } from '@saas-ui/core/utils'
import { Dialog } from '@saas-ui/react/dialog'

export interface AlertDialogProps
  extends Omit<
    Dialog.RootProps,
    'leastDestructiveRef' | 'onOpenChange' | 'open'
  > {
  /**
   * Whether the dialog is open
   */
  open: boolean
  /**
   * Callback when the dialog is opened or closed
   */
  onOpenChange: (details: { open: boolean }) => void
  /**
   * The dialog title
   */
  title?: React.ReactNode
  translations?: {
    cancel?: React.ReactNode
    confirm?: React.ReactNode
    close?: React.ReactNode
  }
  slotProps?: {
    cancel?: ButtonProps
    confirm?: ButtonProps
    footer?: HTMLChakraProps<'div'>
  }
  /**
   * Close the dialog on cancel
   * @default true
   */
  closeOnCancel?: boolean
  /**
   * Close the dialog on confirm
   * @default true
   */
  closeOnConfirm?: boolean
  /**
   * Hide the backdrop
   */
  backdrop?: boolean
  /**
   * Hide the close button
   */
  hideCloseButton?: boolean
  /**
   * Defines which button gets initial focus
   * https://www.w3.org/TR/wai-aria-practices/#alertdialog
   */
  leastDestructiveFocus?: 'cancel' | 'confirm'
  /**
   * Function that's called when cancel is clicked
   */
  onCancel?: () => void
  /**
   * Function that's called when confirm is clicked.
   */
  onConfirm?: () => Promise<void> | void
}

export const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  const {
    title,
    translations,
    slotProps,
    open,
    closeOnCancel = true,
    closeOnConfirm = true,
    leastDestructiveFocus = 'cancel',
    onOpenChange,
    onCancel,
    onConfirm,
    children,
    ...rest
  } = props

  const cancelRef = React.useRef(null)
  const confirmRef = React.useRef(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConfirm = async () => {
    try {
      const result = onConfirm?.()
      if (typeof result?.then === 'function') {
        setIsLoading(true)
        await result
      }

      closeOnConfirm && onOpenChange({ open: false })
      /* eslint-disable no-useless-catch */
    } catch (e: any) {
      throw e
    } finally {
      setIsLoading(false)
    }
    /* eslint-enable */
  }

  const titleId = React.useId()
  const contentId = React.useId()

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      aria-labelledby={titleId}
      aria-describedby={contentId}
      {...rest}
      initialFocusEl={() =>
        leastDestructiveFocus === 'cancel'
          ? cancelRef.current
          : confirmRef.current
      }
    >
      <Dialog.Content>
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
              onCancel?.()

              closeOnCancel && onOpenChange({ open: false })
            })}
          >
            {slotProps?.cancel?.children || translations?.cancel || 'Cancel'}
          </Button>
          <Button
            ref={confirmRef}
            variant="solid"
            disabled={isLoading}
            {...slotProps?.confirm}
            onClick={callAll(handleConfirm, slotProps?.confirm?.onClick)}
          >
            {slotProps?.confirm?.children || translations?.confirm || 'OK'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
