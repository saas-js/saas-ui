import * as React from 'react'

import { Form, FormLayout, Field } from '@saas-ui/forms'

import { useLogin, AuthActionEnum } from '../provider'

import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

interface SubmitParams {
  email: string
  password: string
  rememberMe?: boolean
}

export interface PasswordFormProps {
  schema?: any
  action?: AuthActionEnum
  onSuccess?: (error: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
  submitLabel?: string
  defaultValues?: Record<string, any>
  renderSuccess?: (data: any) => React.ReactElement
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  action = 'logIn',
  schema,
  onSuccess = () => null,
  onError = () => null,
  onValidationError,
  submitLabel = 'Log in',
  defaultValues,
  children,
  renderSuccess = () => (
    <AuthFormSuccess
      title="Success!"
      description="Check your mailbox to verify your account."
    />
  ),
  ...formProps
}) => {
  const [{ isLoading, isResolved, data }, submit] = useLogin({ action })

  const handleSubmit = (params: SubmitParams) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  // Show a default success message on signup.
  if (isResolved && action === 'signUp') {
    return renderSuccess(data)
  }

  return (
    <Form
      schema={schema}
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ email: '', password: '', ...defaultValues }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="email"
          label="Email"
          type="email"
          rules={{ required: true }}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          rules={{ required: true }}
        />

        {children}

        <LoginButton type="submit" isFullWidth isLoading={isLoading}>
          {submitLabel}
        </LoginButton>
      </FormLayout>
    </Form>
  )
}
