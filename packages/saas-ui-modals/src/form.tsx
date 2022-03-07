import * as React from 'react'

import { ModalBody, ModalFooter } from '@chakra-ui/react'

import {
  Form,
  Fields,
  SubmitButton,
  FormProps,
  FieldResolver,
} from '@saas-ui/forms'
import { Button } from '@saas-ui/button'

import { BaseModal, BaseModalProps } from './modal'

export interface FormDialogProps
  extends Omit<BaseModalProps, 'children'>,
    Pick<
      FormProps,
      | 'schema'
      | 'defaultValues'
      | 'onSubmit'
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

export const FormDialog: React.FC<FormDialogProps> = (props) => {
  const {
    children,
    schema,
    resolver,
    fieldResolver,
    defaultValues,
    onSubmit,
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
    schema,
    resolver,
    defaultValues,
    onSubmit,
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
        <ModalBody>
          {children || <Fields schema={schema} fieldResolver={fieldResolver} />}
        </ModalBody>

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
