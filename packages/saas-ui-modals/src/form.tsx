import * as React from 'react'

import { ModalBody, ModalFooter, Button, forwardRef } from '@chakra-ui/react'
import { runIfFn } from '@saas-ui/react-utils'

import {
  Form,
  AutoFields,
  SubmitButton,
  FormProps,
  FieldValues,
  FieldResolver,
  FieldProps,
} from '@saas-ui/forms'

import { BaseModal, BaseModalProps } from './modal'

export interface FormDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TSchema = any,
  TFieldTypes = FieldProps<TFieldValues>
> extends Omit<BaseModalProps, 'children'>,
    Pick<
      FormProps<TFieldValues, TContext, TSchema, TFieldTypes>,
      | 'schema'
      | 'defaultValues'
      | 'values'
      | 'context'
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
      | 'resetOptions'
      | 'children'
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
   * A schema field resolver used to auto generate form fields.
   */
  fieldResolver?: FieldResolver
}
/**
 * Can be used to quickly request information from people without leaving the current page.
 *
 * @see Docs https://saas-ui.dev/docs/components/overlay/form-dialog
 */
export const FormDialog = forwardRef(
  <
    TFieldValues extends FieldValues = FieldValues,
    TContext extends object = object
  >(
    props: FormDialogProps<TFieldValues, TContext>,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const {
      children,
      schema,
      resolver,
      fieldResolver,
      defaultValues,
      values,
      context,
      onChange,
      onSubmit,
      onError,
      mode,
      reValidateMode,
      shouldFocusError = true,
      shouldUnregister,
      shouldUseNativeValidation,
      criteriaMode,
      delayError = 100,
      cancelLabel = 'Cancel',
      submitLabel = 'Submit',
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
      values,
      context,
      onChange,
      onSubmit,
      onError,
      mode,
      reValidateMode,
      shouldFocusError,
      shouldUnregister,
      shouldUseNativeValidation,
      criteriaMode,
      delayError,
    }

    return (
      <BaseModal isOpen={isOpen} onClose={onClose} {...rest}>
        <Form {...formProps} ref={ref}>
          {(form) => (
            <>
              <ModalBody>
                {runIfFn(children, form) || (
                  <AutoFields
                    schema={schema}
                    fieldResolver={fieldResolver}
                    focusFirstField
                  />
                )}
              </ModalBody>

              {footer || (
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    {cancelLabel}
                  </Button>
                  <SubmitButton>{submitLabel}</SubmitButton>
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
    ref?: React.ForwardedRef<HTMLFormElement>
  }
) => React.ReactElement
