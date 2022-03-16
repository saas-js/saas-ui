import * as React from 'react'

import {
  Form,
  FormProps,
  FormLayout,
  Field,
  SubmitHandler,
  FieldErrors,
} from '@saas-ui/forms'

import { useLogin, AuthActionEnum } from '../provider'

import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

interface SubmitParams {
  email: string
  password: string
  rememberMe?: boolean
  [key: string]: any
}

export interface PasswordFormProps
  extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
  schema?: any
  action?: AuthActionEnum
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: FieldErrors<SubmitParams>) => void
  submitLabel?: string
  defaultValues?: Record<string, any>
  renderSuccess?: (data: any) => React.ReactElement
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  action = 'logIn',
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

  const handleSubmit: SubmitHandler<SubmitParams> = (params) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  // Show a default success message on signup.
  if (isResolved && action === 'signUp') {
    return renderSuccess(data)
  }

  return (
    <Form
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
