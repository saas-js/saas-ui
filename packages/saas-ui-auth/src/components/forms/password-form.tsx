import * as React from 'react'

import { Form, FormProps, FormLayout, Field } from '@saas-ui/forms'

import { LoginButton } from './login-button'

interface SubmitParams {
  email: string
  password: string
  rememberMe?: boolean
  [key: string]: any
}

export interface PasswordFormProps
  extends Omit<FormProps<SubmitParams>, 'children'> {
  submitLabel?: string
  emailLabel?: string
  passwordLabel?: string
  children?: React.ReactNode
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  submitLabel = 'Log in',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  defaultValues,
  children,
  ...formProps
}) => {
  return (
    <Form<SubmitParams>
      defaultValues={{ email: '', password: '', ...defaultValues }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="email"
          label={emailLabel}
          type="email"
          rules={{ required: true }}
          autoComplete="email"
        />
        <Field
          name="password"
          label={passwordLabel}
          type="password"
          rules={{ required: true }}
          autoComplete="current-password"
        />

        {children}

        <LoginButton type="submit" width="full">
          {submitLabel}
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

PasswordForm.displayName = 'PasswordForm'
