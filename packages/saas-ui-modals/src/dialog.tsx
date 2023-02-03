import * as React from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogProps,
} from '@chakra-ui/react'

import {
  ButtonGroup,
  ButtonGroupProps,
  Button,
  ButtonProps,
} from '@saas-ui/button'

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
   * Function that's called when confirm is clicked
   */
  onConfirm?: () => void
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
                {cancelProps?.children || cancelProps?.label || cancelLabel}
              </Button>
              <Button
                ref={confirmRef}
                {...confirmProps}
                onClick={() => {
                  onConfirm?.()

                  closeOnConfirm && onClose()
                }}
              >
                {confirmProps?.children || confirmProps?.label || confirmLabel}
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
