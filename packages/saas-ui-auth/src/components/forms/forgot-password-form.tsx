import * as React from 'react'

import { Form, FormLayout, Field, FormProps } from '@saas-ui/forms'

import { LoginButton } from './login-button'

interface SubmitParams {
  email: string
  [key: string]: any
}

export interface ForgotPasswordFormProps
  extends Omit<FormProps<SubmitParams>, 'children'> {
  emailLabel?: string
  helpText?: string
  submitLabel?: string
  children?: React.ReactNode
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  submitLabel,
  emailLabel,
  helpText,
  children,
  ...formProps
}) => {
  return (
    <Form<SubmitParams> defaultValues={{ email: '' }} {...formProps}>
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

ForgotPasswordForm.defaultProps = {
  submitLabel: 'Reset password',
  emailLabel: 'Your email address',
}

ForgotPasswordForm.displayName = 'ForgotPasswordForm'
