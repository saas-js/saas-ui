import * as React from 'react'

import { Form, FormProps, FormLayout, Field, FieldValues } from '@saas-ui/forms'

import { LoginButton } from '../login-button'

export interface PasswordSubmitParams {
  email: string
  password: string
  rememberMe?: boolean
  [key: string]: any
}

export interface PasswordFormProps<
  Params extends FieldValues = PasswordSubmitParams,
> extends Omit<FormProps<any, Params>, 'children'> {
  children?: React.ReactNode
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  defaultValues,
  children,
  ...formProps
}) => {
  return (
    <Form defaultValues={{ email: '', password: '' }} {...formProps}>
      <FormLayout>
        <Field
          name="email"
          label="Email"
          type="email"
          rules={{ required: true }}
          autoComplete="email"
        />
        <Field
          name="password"
          label="Password"
          type="password"
          rules={{ required: true }}
          autoComplete="current-password"
        />

        {children}

        <LoginButton type="submit" width="full">
          Log in
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

PasswordForm.displayName = 'PasswordForm'
