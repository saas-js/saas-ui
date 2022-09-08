import * as React from 'react'

import { ModalBody, ModalFooter, Button, forwardRef } from '@chakra-ui/react'
import { runIfFn } from '@chakra-ui/utils'

import {
  Form,
  Fields,
  SubmitButton,
  FormProps,
  FieldValues,
  FieldResolver,
  UseFormReturn,
} from '@saas-ui/forms'

import { BaseModal, BaseModalProps } from './modal'

export interface FormDialogProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<BaseModalProps, 'children'>,
    Pick<
      FormProps<TFieldValues>,
      | 'schema'
      | 'defaultValues'
      | 'onChange'
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
  /**
   * A schema field resolver used to auto generate form fields.
   */
  fieldResolver?: FieldResolver
}

export const FormDialog = forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: FormDialogProps<TFieldValues>,
    ref: React.ForwardedRef<UseFormReturn<TFieldValues>>
  ) => {
    const {
      children,
      schema,
      resolver,
      fieldResolver,
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
      resolver,
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

    return (
      <BaseModal isOpen={isOpen} onClose={onClose} {...rest}>
        <Form {...formProps}>
          {(form) => (
            <>
              <ModalBody>
                {runIfFn(children, form) || (
                  <Fields
                    schema={schema}
                    fieldResolver={fieldResolver}
                    focusFirstField
                  />
                )}
              </ModalBody>

              {footer || (
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    {cancelLabel || 'Cancel'}
                  </Button>
                  <SubmitButton>{submitLabel || 'Submit'}</SubmitButton>
                </ModalFooter>
              )}
            </>
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
