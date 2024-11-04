import * as React from 'react'

import { Button, ButtonProps, Dialog } from '@chakra-ui/react'

export interface ConfirmDialogProps
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
  onOpenChange: (details: Dialog.OpenChangeDetails) => void
  /**
   * The dialog title
   */
  title?: React.ReactNode
  /**
   * The cancel button label
   */
  cancelLabel?: React.ReactNode
  /**
   * The confirm button label
   */
  confirmLabel?: React.ReactNode
  /**
   * The cancel button props
   */
  cancelProps?: ButtonProps
  /**
   * The confirm button props
   */
  confirmProps?: ButtonProps
  /**
   * The button group props
   */
  footerProps?: Dialog.FooterProps
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
  hideBackdrop?: boolean
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

export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const {
    title,
    cancelLabel = 'Cancel',
    confirmLabel = 'Confirm',
    cancelProps,
    confirmProps,
    footerProps,
    open,
    closeOnCancel = true,
    closeOnConfirm = true,
    hideBackdrop = false,
    hideCloseButton = false,
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

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      {...rest}
      initialFocusEl={() =>
        leastDestructiveFocus === 'cancel'
          ? cancelRef.current
          : confirmRef.current
      }
    >
      {!hideBackdrop && <Dialog.Backdrop />}
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>{title}</Dialog.Header>

          <Dialog.Body>{children}</Dialog.Body>

          <Dialog.Footer {...footerProps}>
            <Button
              ref={cancelRef}
              {...cancelProps}
              onClick={() => {
                onCancel?.()

                closeOnCancel && onOpenChange({ open: false })
              }}
            >
              {cancelProps?.children || cancelLabel}
            </Button>
            <Button
              ref={confirmRef}
              disabled={isLoading}
              {...confirmProps}
              onClick={handleConfirm}
            >
              {confirmProps?.children || confirmLabel}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
