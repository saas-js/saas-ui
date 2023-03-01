import * as React from 'react'

import { chakra, HTMLChakraProps, forwardRef } from '@chakra-ui/react'
import { cx, runIfFn } from '@chakra-ui/utils'

import {
  useForm,
  FormProvider,
  UseFormProps,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  SubmitErrorHandler,
  ResolverOptions,
  ResolverResult,
  WatchObserver,
} from 'react-hook-form'
import { objectFieldResolver, FieldResolver } from './field-resolver'
import { MaybeRenderProp } from '@chakra-ui/react-utils'

export type { UseFormReturn, FieldValues, SubmitHandler }

import { Field as DefaultField, FieldProps } from './field'

interface FormRenderContext<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
> extends UseFormReturn<TFieldValues, TContext> {
  Field: React.FC<FieldProps<TFieldValues>>
}

interface FormOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TSchema = any
> {
  /**
   * The form schema, supports Yup, Zod, and AJV.
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
  children?: MaybeRenderProp<FormRenderContext<TFieldValues, TContext>>
}

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TSchema = any
> extends UseFormProps<TFieldValues, TContext>,
    Omit<
      HTMLChakraProps<'form'>,
      'children' | 'onChange' | 'onSubmit' | 'onError'
    >,
    FormOptions<TFieldValues, TContext, TSchema> {}

export const Form = forwardRef(
  <
    TFieldValues extends FieldValues = FieldValues,
    TContext extends object = object,
    TSchema = any
  >(
    props: FormProps<TFieldValues, TContext, TSchema>,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const {
      mode = 'all',
      resolver,
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

    if (schema && !resolver) {
      form.resolver = Form.getResolver?.(schema)
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

    const Field: React.FC<FieldProps<TFieldValues>> = React.useMemo(
      () => (props) => <DefaultField<TFieldValues> {...props} />,
      []
    )

    return (
      <FormProvider {...methods}>
        <chakra.form
          ref={ref}
          onSubmit={handleSubmit(onSubmit, onError)}
          {...rest}
          className={cx('sui-form', props.className)}
        >
          {runIfFn(children, {
            Field,
            ...methods,
          })}
        </chakra.form>
      </FormProvider>
    )
  }
) as (<
  TFieldValues extends FieldValues,
  TContext extends object = object,
  TSchema = any
>(
  props: FormProps<TFieldValues, TContext, TSchema> & {
    ref?: React.ForwardedRef<HTMLFormElement>
  }
) => React.ReactElement) & {
  displayName?: string
  getResolver?: GetResolver
  getFieldResolver: GetFieldResolver
}

Form.getFieldResolver = objectFieldResolver

Form.displayName = 'Form'

export type GetResolver = <
  TFieldValues extends FieldValues,
  TContext extends object
>(
  schema: any
) => (
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>>

export type GetFieldResolver = (schema: any) => FieldResolver

export interface CreateFormProps {
  resolver?: GetResolver
}

export function createForm<Schema = any>({ resolver }: CreateFormProps) {
  const CreateForm = <
    TFieldValues extends FieldValues,
    TContext extends object = object,
    TSchema extends Schema = Schema
  >(
    props: FormProps<TFieldValues, TContext, TSchema>
  ) => {
    const { schema, ...rest } = props
    return <Form resolver={resolver?.(props.schema)} {...rest} />
  }

  return CreateForm
}
