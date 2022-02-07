import * as React from 'react'

import { chakra, HTMLChakraProps, forwardRef } from '@chakra-ui/react'

import {
  useForm,
  FormProvider,
  UseFormProps,
  FieldErrors,
  FieldValues,
} from 'react-hook-form'

import { yupResolver } from './resolvers/yup'

interface FormOptions {
  schema?: any
  submitLabel?: false | string
  onSubmit: (arg: any) => Promise<any> | void
  onError?: (errors: FieldErrors) => void
}

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends UseFormProps<TFieldValues>,
    Omit<HTMLChakraProps<'form'>, 'onSubmit' | 'onError'>,
    FormOptions {}

/**
 * @todo Figure out how to pass down FieldValues to all Field components,
 * if at all possible.
 */
export const Form = forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    props: FormProps<TFieldValues>,
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
      onSubmit,
      onError,
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

    // @todo remove yup dependency and just use resolver prop?
    if (schema) {
      form.resolver = yupResolver(schema)
    }

    const methods = useForm<TFieldValues>(form)
    const { handleSubmit } = methods

    return (
      <FormProvider {...methods}>
        <chakra.form
          ref={ref}
          onSubmit={handleSubmit(onSubmit, onError)}
          {...rest}
        >
          {children}
        </chakra.form>
      </FormProvider>
    )
  }
) as <TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues> & { ref?: React.ForwardedRef<HTMLFormElement> }
) => React.ReactElement
