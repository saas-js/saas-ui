import * as React from 'react'

import {
  ModalBody,
  ModalFooter,
  Button,
  forwardRef,
  ButtonProps,
} from '@chakra-ui/react'
import { runIfFn } from '@saas-ui/react-utils'

import {
  Form,
  AutoFields,
  SubmitButton,
  FormProps,
  FieldValues,
  FieldResolver,
  FieldProps,
  FormType,
  DefaultFieldOverrides,
  WithFields,
} from '@saas-ui/forms'

import {
  Form as YupForm,
  AnyObjectSchema,
  YupFormType,
} from '@saas-ui/forms/yup'
import { Form as ZodForm, ZodFormType } from '@saas-ui/forms/zod'

import { BaseModal, BaseModalProps } from './modal'

export type FormDialogFieldOverrides = DefaultFieldOverrides & {
  cancel?: ButtonProps
}

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
   * A schema field resolver used to auto generate form fields.
   */
  fieldResolver?: FieldResolver
  /**
   * Field overrides
   */
  fields?: FormDialogFieldOverrides
}

const useFormProps = (props: FormDialogProps) => {
  const {
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
    fields,
    ...modalProps
  } = props

  const formProps = {
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
    fields,
  }

  return { modalProps, formProps, fields }
}

/**
 * Todo make this dynamic to support other schema types
 */
type MergeDialogProps<T> = T extends YupFormType<
  infer FieldDefs,
  infer ExtraProps,
  infer ExtraOverrides,
  'yup'
>
  ? YupFormType<
      FieldDefs,
      ExtraProps & Omit<BaseModalProps, 'children'>,
      ExtraOverrides & FormDialogFieldOverrides
    >
  : T extends ZodFormType<
      infer FieldDefs,
      infer ExtraProps,
      infer ExtraOverrides,
      'zod'
    >
  ? ZodFormType<
      FieldDefs,
      ExtraProps & Omit<BaseModalProps, 'children'>,
      ExtraOverrides & FormDialogFieldOverrides
    >
  : T extends FormType<infer FieldDefs, infer ExtraProps, infer ExtraOverrides>
  ? FormType<
      FieldDefs,
      ExtraProps & Omit<BaseModalProps, 'children'>,
      ExtraOverrides & FormDialogFieldOverrides
    >
  : never

type IsSchemaType<T, Schema, FieldDefs> = T extends DefaultFormType<FieldDefs>
  ? T extends (
      props: FormProps<infer TFieldValues, infer TContext, infer TSchema>
    ) => any
    ? Schema extends TSchema
      ? true
      : false
    : false
  : false

export type DefaultFormType<
  FieldDefs = any,
  ExtraProps = object,
  ExtraOverrides = FormDialogFieldOverrides
> = (<
  TFieldValues extends Record<string, any> = any,
  TContext extends object = object,
  TSchema = unknown
>(
  props: any
) => React.ReactElement) & {
  displayName?: string
  id?: string
}

export function createFormDialog<
  FieldDefs = any,
  ExtraProps = object,
  ExtraOverrides = FormDialogFieldOverrides,
  TFormType extends DefaultFormType<
    FieldDefs,
    ExtraProps,
    ExtraOverrides
  > = DefaultFormType<FieldDefs, ExtraProps, ExtraOverrides>
>(Form: TFormType) {
  const Dialog = forwardRef<any, 'div'>((props, ref) => {
    const { isOpen, onClose, footer, children, ...rest } = props
    const { modalProps, formProps, fields } = useFormProps(rest)
    return (
      <BaseModal {...modalProps} isOpen={isOpen} onClose={onClose}>
        <Form ref={ref} {...(formProps as any)}>
          {(form: any) => (
            <>
              <ModalBody>{runIfFn(children, form) || <AutoFields />}</ModalBody>

              {footer || (
                <ModalFooter>
                  <Button
                    variant="ghost"
                    mr={3}
                    onClick={onClose}
                    {...fields?.cancel}
                  >
                    {fields?.cancel?.children ?? 'Cancel'}
                  </Button>
                  <SubmitButton {...fields?.submit} />
                </ModalFooter>
              )}
            </>
          )}
        </Form>
      </BaseModal>
    )
  }) as MergeDialogProps<TFormType>

  Dialog.displayName = `${Form.displayName || Form.name}Dialog`

  return Dialog
}

/**
 * Can be used to quickly request information from people without leaving the current page.
 *
 * @see Docs https://saas-ui.dev/docs/components/overlay/form-dialog
 */
export const FormDialog = createFormDialog(Form)
