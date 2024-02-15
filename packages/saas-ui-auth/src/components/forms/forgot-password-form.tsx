import * as React from 'react'

import { Form, FormLayout, Field, FormProps, FieldValues } from '@saas-ui/forms'

import { LoginButton } from '../login-button'

export interface ForgotPasswordSubmitParams {
  email: string
  [key: string]: any
}

export interface ForgotPasswordFormProps<
  Params extends FieldValues = ForgotPasswordSubmitParams,
> extends Omit<FormProps<any, Params>, 'children'> {
  children?: React.ReactNode
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  children,
  ...formProps
}) => {
  return (
    <Form defaultValues={{ email: '' }} {...formProps}>
      <FormLayout>
        <Field
          name="email"
          label="Your email address"
          type="email"
          rules={{ required: true }}
          autoComplete="email"
        />

        {children}

        <LoginButton type="submit" width="full">
          Reset password
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

ForgotPasswordForm.displayName = 'ForgotPasswordForm'
