import * as React from 'react'

import { chakra, HTMLChakraProps, forwardRef } from '@chakra-ui/react'
import { FocusableElement, cx, runIfFn } from '@chakra-ui/utils'

import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  SubmitErrorHandler,
  ResolverOptions,
  ResolverResult,
  WatchObserver,
} from 'react-hook-form'
import { FormProvider } from './form-context'
import { FieldResolver } from './field-resolver'
import { MaybeRenderProp } from '@chakra-ui/react-utils'

export type { UseFormReturn, FieldValues, SubmitHandler }

import { FieldProps, DefaultFieldOverrides } from './types'

import { Field as DefaultField } from './field'
import { FormLayout } from './layout'
import { AutoFields } from './fields'
import { SubmitButton } from './submit-button'
import { DisplayIf, DisplayIfProps } from './display-if'
import { ArrayField, ArrayFieldProps } from './array-field'
import { ObjectField, ObjectFieldProps } from './object-field'
import { UseArrayFieldReturn } from './use-array-field'

export interface FormRenderContext<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TFieldTypes = FieldProps<TFieldValues>
> extends UseFormReturn<TFieldValues, TContext> {
  Field: React.FC<TFieldTypes & React.RefAttributes<FocusableElement>>
  DisplayIf: React.FC<DisplayIfProps<TFieldValues>>
  ArrayField: React.FC<
    ArrayFieldProps<TFieldValues> & React.RefAttributes<UseArrayFieldReturn>
  >
  ObjectField: React.FC<ObjectFieldProps<TFieldValues>>
}

interface FormOptions<
  TSchema = unknown,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TFieldTypes = FieldProps<TFieldValues>
> {
  /**
   * The form schema.
   */
  schema?: TSchema
  /**
   * Triggers when any of the field change.
   */
  onChange?: WatchObserver<TFieldValues>
  /**
   * The submit handler.
   */
  onSubmit: SubmitHandler<TFieldValues>
  /**
   * Triggers when there are validation errors.
   */
  onError?: SubmitErrorHandler<TFieldValues>
  /**
   * The Hook Form state ref.
   */
  formRef?: React.RefObject<UseFormReturn<TFieldValues, TContext>>
  /**
   * The form children, can be a render prop or a ReactNode.
   */
  children?: MaybeRenderProp<
    FormRenderContext<TFieldValues, TContext, TFieldTypes>
  >
  /**
   * The field resolver, used to resolve the fields from schemas.
   */
  fieldResolver?: FieldResolver
  /**
   * Field overrides
   */
  fields?: DefaultFieldOverrides
}

export interface FormProps<
  TSchema = unknown,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TFieldTypes = FieldProps<TFieldValues>
> extends UseFormProps<TFieldValues, TContext>,
    Omit<
      HTMLChakraProps<'form'>,
      'children' | 'onChange' | 'onSubmit' | 'onError'
    >,
    FormOptions<TSchema, TFieldValues, TContext, TFieldTypes> {}

/**
 * The wrapper component provides context, state, and focus management.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/form
 */
export const Form = forwardRef(
  <
    TSchema = any,
    TFieldValues extends FieldValues = FieldValues,
    TContext extends object = object,
    TFieldTypes = FieldProps<TFieldValues>
  >(
    props: FormProps<TSchema, TFieldValues, TContext, TFieldTypes>,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const {
      mode = 'all',
      resolver,
      fieldResolver,
      fields,
      reValidateMode,
      shouldFocusError,
      shouldUnregister,
      shouldUseNativeValidation,
      criteriaMode,
      delayError,
      schema,
      defaultValues,
      values,
      context,
      resetOptions,
      onChange,
      onSubmit,
      onError,
      formRef,
      children,
      ...rest
    } = props

    const form = {
      mode,
      resolver,
      defaultValues,
      values,
      reValidateMode,
      shouldFocusError,
      shouldUnregister,
      shouldUseNativeValidation,
      criteriaMode,
      delayError,
      context,
      resetOptions,
    }

    const methods = useForm<TFieldValues, TContext>(form)
    const { handleSubmit } = methods

    // This exposes the useForm api through the forwarded ref
    React.useImperativeHandle(formRef, () => methods, [formRef, methods])

    React.useEffect(() => {
      let subscription: any
      if (onChange) {
        subscription = methods.watch(onChange)
      }
      return () => subscription?.unsubscribe()
    }, [methods, onChange])

    let _children = children
    if (!_children && fieldResolver) {
      _children = (
        <FormLayout>
          <AutoFields />
          <SubmitButton {...fields?.submit} />
        </FormLayout>
      )
    }

    return (
      <FormProvider
        {...methods}
        schema={schema}
        fieldResolver={fieldResolver}
        fields={fields}
      >
        <chakra.form
          ref={ref}
          onSubmit={handleSubmit(onSubmit, onError)}
          {...rest}
          className={cx('sui-form', props.className)}
        >
          {runIfFn(_children, {
            Field: DefaultField as any,
            DisplayIf: DisplayIf as any,
            ArrayField: ArrayField as any,
            ObjectField: ObjectField as any,
            ...methods,
          })}
        </chakra.form>
      </FormProvider>
    )
  }
) as FormComponent

export type FormComponent = (<
  TSchema = unknown,
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TFieldTypes = FieldProps<TFieldValues>
>(
  props: FormProps<TSchema, TFieldValues, TContext, TFieldTypes> & {
    ref?: React.ForwardedRef<HTMLFormElement>
  }
) => React.ReactElement) & {
  displayName?: string
}

Form.displayName = 'Form'

export type GetResolver = <
  TFieldValues extends FieldValues,
  TContext extends object
>(
  schema: unknown
) => (
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>>
