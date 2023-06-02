import * as React from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogProps,
  ButtonGroup,
  ButtonGroupProps,
  Button,
  ButtonProps,
} from '@chakra-ui/react'

export interface ConfirmDialogProps
  extends Omit<AlertDialogProps, 'leastDestructiveRef'> {
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
  buttonGroupProps?: ButtonGroupProps
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
    buttonGroupProps,
    isOpen,
    closeOnCancel = true,
    closeOnConfirm = true,
    leastDestructiveFocus = 'cancel',
    onClose,
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

      closeOnConfirm && onClose()
      /* eslint-disable no-useless-catch */
    } catch (e: any) {
      throw e
    } finally {
      setIsLoading(false)
    }
    /* eslint-enable */
  }
  console.log(isLoading)
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
      leastDestructiveRef={
        leastDestructiveFocus === 'cancel' ? cancelRef : confirmRef
      }
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup {...buttonGroupProps}>
              <Button
                ref={cancelRef}
                {...cancelProps}
                onClick={() => {
                  onCancel?.()

                  closeOnCancel && onClose()
                }}
              >
                {cancelProps?.children || cancelLabel}
              </Button>
              <Button
                ref={confirmRef}
                isLoading={isLoading}
                {...confirmProps}
                onClick={handleConfirm}
              >
                {confirmProps?.children || confirmLabel}
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
