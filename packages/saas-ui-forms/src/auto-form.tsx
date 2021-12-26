import * as React from 'react'

import { forwardRef } from '@chakra-ui/react'

import { Form, FormProps } from './form'

import { FormLayout } from './layout'
import { Fields } from './fields'
import { SubmitButton } from './submit-button'

interface AutoFormOptions {
  schema: any
  submitLabel?: false | string
}

export interface AutoFormProps
  extends Omit<FormProps, 'schema'>,
    AutoFormOptions {}

export const AutoForm = forwardRef<AutoFormProps, 'form'>(
  ({ schema, submitLabel, ...props }, ref) => {
    return (
      <Form {...props} schema={schema} ref={ref}>
        <FormLayout>
          {<Fields schema={schema} />}
          {submitLabel && <SubmitButton label={submitLabel} />}
        </FormLayout>
      </Form>
    )
  }
)

AutoForm.defaultProps = {
  submitLabel: 'Submit',
}
