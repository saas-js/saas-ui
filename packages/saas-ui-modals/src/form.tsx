import * as React from 'react'

import { ModalBody, ModalFooter, forwardRef } from '@chakra-ui/react'

import {
  Form,
  Fields,
  SubmitButton,
  FormProps,
  FieldValues,
  UseFormReturn,
} from '@saas-ui/forms'
import { Button } from '@saas-ui/button'

import { BaseModal, BaseModalProps } from './modal'

export interface FormDialogProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<BaseModalProps, 'children'>,
    Pick<
      FormProps<TFieldValues>,
      | 'schema'
      | 'defaultValues'
      | 'onSubmit'
      | 'onError'
      | 'resolver'
      | 'mode'
      | 'reValidateMode'
      | 'shouldFocusError'
      | 'shouldUnregister'
      | 'shouldUseNativeValidation'
      | 'criteriaMode'
      | 'delayError'
    > {
  /**
   * The modal footer, will be wrapped with `ModalFooter`.
   * Defaults to a cancel and submit button.
   */
  footer?: React.ReactNode
  /**
   * The cancel button label
   * @default "Cancel"
   */
  cancelLabel?: React.ReactNode
  /**
   * The submit button label
   * @default "Submit"
   */
  submitLabel?: React.ReactNode
  /**
   * If no children are passed, this will auto render fields based on the supplied schema.
   */
  children?: React.ReactNode
}

export const FormDialog = forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: FormDialogProps<TFieldValues>,
    ref: React.ForwardedRef<UseFormReturn<TFieldValues>>
  ) => {
    const {
      children,
      schema,
      defaultValues,
      onSubmit,
      onError,
      reValidateMode,
      shouldFocusError = true,
      shouldUnregister,
      shouldUseNativeValidation,
      criteriaMode,
      delayError,
      cancelLabel,
      submitLabel,
      footer,
      isOpen,
      onClose,
      ...rest
    } = props

    const formProps = {
      ref,
      schema,
      defaultValues,
      onSubmit,
      onError,
      reValidateMode,
      shouldFocusError,
      shouldUnregister,
      shouldUseNativeValidation,
      criteriaMode,
      delayError,
    }

    const initialRef = React.useRef<HTMLButtonElement | null>(null)

    return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        {...rest}
      >
        <Form {...formProps}>
          <ModalBody>{children || <Fields schema={schema} />}</ModalBody>

          {footer || (
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                {cancelLabel || 'Cancel'}
              </Button>
              <SubmitButton ref={initialRef}>
                {submitLabel || 'Submit'}
              </SubmitButton>
            </ModalFooter>
          )}
        </Form>
      </BaseModal>
    )
  }
) as <TFieldValues extends FieldValues>(
  props: FormDialogProps<TFieldValues> & {
    ref?: React.ForwardedRef<UseFormReturn<TFieldValues>>
  }
) => React.ReactElement
