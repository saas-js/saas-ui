import * as React from 'react'

import { Form, FormLayout, Field, FormProps, FieldValues } from '@saas-ui/forms'

import { LoginButton } from '../login-button'

export interface ForgotPasswordSubmitParams {
  email: string
  [key: string]: any
}

export interface ForgotPasswordFormProps<
  Params extends FieldValues = ForgotPasswordSubmitParams
> extends Omit<FormProps<any, Params>, 'children'> {
  emailLabel?: string
  helpText?: string
  submitLabel?: string
  children?: React.ReactNode
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  submitLabel = 'Reset password',
  emailLabel = 'Your email address',
  helpText,
  children,
  ...formProps
}) => {
  return (
    <Form defaultValues={{ email: '' }} {...formProps}>
      <FormLayout>
        <Field
          name="email"
          label={emailLabel}
          type="email"
          rules={{ required: true }}
          autoComplete="email"
        />

        {children}

        <LoginButton type="submit" width="full">
          {submitLabel}
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

ForgotPasswordForm.displayName = 'ForgotPasswordForm'
