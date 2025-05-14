import React, { forwardRef } from 'react'

import { FieldValues } from 'react-hook-form'

import { AutoFields } from './fields'
import { Form, FormProps } from './form'
import { FormLayout } from './form-layout'
import { SubmitButton } from './submit-button'

interface AutoFormOptions {
  /**
   * The submit button label.
   * Pass `null` to render no submit button.
   */
  submitLabel?: React.ReactNode
  /**
   * The schema.
   * Supports object schema, Zod, Yup or Ajv (JSON Schema).
   * @see https://www.saas-ui.dev/docs/forms/auto-form
   */
  schema: any
  /**
   * The field resolver.
   */
  fieldResolver?: any
}

export interface AutoFormProps<
  TFieldValues extends FieldValues,
  TContext extends object = object,
> extends Omit<
      FormProps<TFieldValues, TContext>,
      'schema' | 'children' | 'fieldResolver'
    >,
    AutoFormOptions {
  children?: React.ReactNode
}
/**
 * The wrapper component that manages context and state.
 *
 * @see Docs https://saas-ui.dev/docs/components/forms/auto-form
 */
export const AutoForm = forwardRef(
  <
    TFieldValues extends FieldValues = FieldValues,
    TContext extends object = object,
  >(
    props: AutoFormProps<TFieldValues, TContext>,
    ref: React.ForwardedRef<HTMLFormElement>,
  ) => {
    const {
      schema,
      submitLabel = 'Submit',
      fieldResolver,
      children,
      ...rest
    } = props

    return (
      <Form {...rest} schema={schema} ref={ref}>
        <FormLayout>
          {<AutoFields schema={schema} fieldResolver={fieldResolver} />}
          {submitLabel && <SubmitButton>{submitLabel}</SubmitButton>}
          {children}
        </FormLayout>
      </Form>
    )
  },
)

AutoForm.displayName = 'AutoForm'
