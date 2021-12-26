import * as React from 'react'

import { chakra, HTMLChakraProps, forwardRef } from '@chakra-ui/react'

import {
  useForm,
  FormProvider,
  UseFormProps,
  FieldErrors,
} from 'react-hook-form'

import { resolver } from './resolvers/yup'

interface FormOptions {
  schema?: any
  submitLabel?: false | string
}

export interface FormProps extends HTMLChakraProps<'form'>, FormOptions {
  defaultValues: Record<string, any>
  onSubmit: (arg: any) => Promise<any> | void
  onError?: (errors: FieldErrors) => void
  children?: React.ReactNode
}

export const Form = forwardRef<FormProps, 'form'>(
  ({ schema, defaultValues, onSubmit, onError, children, ...props }, ref) => {
    const form: UseFormProps = { mode: 'all', defaultValues }

    if (schema) {
      form.resolver = resolver(schema)
    }

    const methods = useForm(form)
    const { handleSubmit } = methods

    return (
      <FormProvider {...methods}>
        <chakra.form
          ref={ref}
          onSubmit={handleSubmit(onSubmit, onError)}
          {...props}
        >
          {children}
        </chakra.form>
      </FormProvider>
    )
  }
)
