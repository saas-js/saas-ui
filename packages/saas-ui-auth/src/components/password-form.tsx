import * as React from 'react'

import { Form, FormLayout, Field } from '@saas-ui/forms'

import { useLogin } from '../provider'

import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

interface SubmitParams {
  email: string
  password: string
}

export interface PasswordFormProps {
  schema?: any
  action?: 'login' | 'signup'
  onSuccess?: (error: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
  submitLabel?: string
  defaultValues?: Record<string, any>
  renderSuccess?: (data: any) => React.ReactElement
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  action = 'login',
  schema,
  onSuccess = () => {},
  onError = () => {},
  onValidationError,
  submitLabel = 'Sign in',
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
  const [{ isLoading, data }, submit] = useLogin({ action })

  const handleSubmit = (params: SubmitParams) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  if (data && action === 'signup') {
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
          placeholder="Email address"
          type="email"
          rules={{ required: true }}
        />
        <Field
          name="password"
          placeholder="Password"
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
