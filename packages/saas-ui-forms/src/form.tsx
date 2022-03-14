import * as React from 'react'

import { chakra, HTMLChakraProps, forwardRef } from '@chakra-ui/react'

import {
  useForm,
  FormProvider,
  UseFormProps,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  SubmitErrorHandler,
  UnpackNestedValue,
  ResolverOptions,
  ResolverResult,
} from 'react-hook-form'
import { defaultFieldResolver, FieldResolver } from './field-resolver'

export type { UseFormReturn, FieldValues, SubmitHandler }

interface FormOptions<TFieldValues extends FieldValues = FieldValues> {
  /**
   * The form schema, currently supports Yup schema only.
   */
  schema?: any
  /**
   * The submit handler.
   */
  onSubmit: SubmitHandler<TFieldValues>
  /**
   * Triggers when there are validation errors.
   */
  onError?: SubmitErrorHandler<TFieldValues>
  /**
   * Ref on the HTMLFormElement.
   */
  formRef?: React.MutableRefObject<HTMLFormElement>
}

/**
 * @todo Figure out how to pass down FieldValues to all Field components,
 * if at all possible.
 */
export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends UseFormProps<TFieldValues>,
    Omit<HTMLChakraProps<'form'>, 'onSubmit' | 'onError'>,
    FormOptions<TFieldValues> {}

export const Form = forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: FormProps<TFieldValues>,
    ref: React.ForwardedRef<UseFormReturn<TFieldValues>>
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
      reValidateMode,
      shouldFocusError,
      shouldUnregister,
      shouldUseNativeValidation,
      criteriaMode,
      delayError,
    }

    if (schema && !resolver) {
      form.resolver = Form.getResolver?.(schema)
    }

    const methods = useForm<TFieldValues>(form)
    const { handleSubmit } = methods

    // This exposes the useForm api through the forwarded ref
    React.useImperativeHandle(ref, () => methods, [ref, methods])

    return (
      <FormProvider {...methods}>
        <chakra.form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit, onError)}
          {...rest}
        >
          {children}
        </chakra.form>
      </FormProvider>
    )
  }
) as (<TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues> & {
    ref?: React.ForwardedRef<UseFormReturn<TFieldValues>>
  }
) => React.ReactElement) & {
  getResolver?: GetResolver
  getFieldResolver: GetFieldResolver
}

Form.getFieldResolver = defaultFieldResolver

export type GetResolver = (
  schema: any
) => <TFieldValues extends FieldValues, TContext>(
  values: UnpackNestedValue<TFieldValues>,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>>

export type GetFieldResolver = (schema: any) => FieldResolver
