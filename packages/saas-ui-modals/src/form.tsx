import * as React from 'react'

import {
  ModalBody,
  ModalFooter,
  Button,
  forwardRef,
  ButtonProps,
} from '@chakra-ui/react'
import { callAllHandlers, runIfFn } from '@saas-ui/react-utils'

import {
  Form,
  AutoFields,
  SubmitButton,
  FormProps,
  FieldValues,
  FieldResolver,
  FieldProps,
  SubmitButtonProps,
  FormType,
  WithFields,
} from '@saas-ui/forms'

import { Form as YupForm, YupFormType } from '@saas-ui/forms/yup'

import { Form as ZodForm, ZodFormType } from '@saas-ui/forms/zod'

import { BaseModal, BaseModalProps } from './modal'
import * as z from 'zod'
import * as yup from 'yup'

export type DefaultFormDialogFieldOverrides = {
  submit?: SubmitButtonProps
  cancel?: ButtonProps
  [key: string]: any
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
  fields?: DefaultFormDialogFieldOverrides
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

type FormComponent<A = any, B = any, C = any> = (<A, B, C>(
  props: FormProps<any, any, any, any> & {
    ref?: React.ForwardedRef<HTMLFormElement>
  }
) => React.ReactElement) & {
  displayName?: string
}

export const createFormDialog = <
  TFormType extends FormComponent = FormComponent
>(
  Form: TFormType
) => {
  const Dialog = forwardRef<any, 'div'>((props, ref) => {
    const { isOpen, onClose, footer, children, ...rest } = props
    const { modalProps, formProps, fields } = useFormProps(rest)
    return (
      <BaseModal {...modalProps} isOpen={isOpen} onClose={onClose}>
        <Form ref={ref} {...(formProps as any)}>
          {(form) => (
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

  Dialog.displayName = `${Form.displayName}Dialog`

  return Dialog
}

export type DefaultFormType<FieldDefs, ExtraProps = object> = (<
  TFieldValuesOrSchema extends Record<string, any> = any,
  TContext extends object = object,
  TFormProps extends FormProps<any, any, any> = FormProps<any, any, any>
>(
  props: WithFields<TFormProps, FieldDefs> & {
    ref?: React.ForwardedRef<HTMLFormElement>
  } & ExtraProps
) => React.ReactElement) & {
  displayName?: string
}

type MergeDialogProps2<T> = T extends DefaultFormType<
  infer FieldDefs,
  infer ExtraProps
>
  ? T extends (
      props: WithFields<FormProps<infer A, infer B, infer C>, FieldDefs> &
        ExtraProps
    ) => infer R
    ? (<TFieldValuesOrSchema = A, TContext extends B = B>(
        p: Omit<BaseModalProps, 'children'> &
          WithFields<FormProps<A, B>, FieldDefs> & {
            ref?: React.ForwardedRef<HTMLFormElement>
          } & ExtraProps
      ) => R) & {
        displayName?: string
      }
    : never
  : never

type MergeDialogProps<T> = T extends DefaultFormType<
  infer FieldDefs,
  infer ExtraProps
>
  ? T extends (props: { schema: infer Schema }) => infer R
    ? Schema extends yup.AnyObjectSchema
      ? YupFormType<FieldDefs, Omit<BaseModalProps, 'children'>>
      : Schema extends z.AnyZodObject
      ? ZodFormType<FieldDefs, Omit<BaseModalProps, 'children'>>
      : FormType<FieldDefs, Omit<BaseModalProps, 'children'>>
    : never
  : undefined

/**
 * Can be used to quickly request information from people without leaving the current page.
 *
 * @see Docs https://saas-ui.dev/docs/components/overlay/form-dialog
 */
export const FormDialog = createFormDialog(Form)

const ZodFormDialog = createFormDialog(ZodForm)

const Test = () => {
  return (
    <FormDialog
      defaultValues={{
        name: 'Test',
      }}
      onSubmit={() => null}
      isOpen={true}
      onClose={() => null}
    >
      {({ Field }) => <Field name="test" type="text" />}
    </FormDialog>
  )
}

const TestZod = () => {
  return (
    <ZodFormDialog
      defaultValues={{
        name: '',
      }}
      schema={z.object({ name: z.string() })}
      onSubmit={() => null}
      isOpen={true}
      onClose={() => null}
    >
      {({ Field }) => <Field name="name" type="text" />}
    </ZodFormDialog>
  )
}

const YupFormDialog = createFormDialog(YupForm)

const TestYup = () => {
  return (
    <YupFormDialog
      schema={yup.object({ name: yup.string() })}
      onSubmit={() => null}
      isOpen={true}
      onClose={() => null}
    >
      {({ Field }) => <Field name="" type="text" />}
    </YupFormDialog>
  )
}
