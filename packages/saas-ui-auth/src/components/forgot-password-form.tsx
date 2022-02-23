import * as React from 'react'

import { Form, FormLayout, Field } from '@saas-ui/forms'

import { useResetPassword } from '../provider'

import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

interface SubmitParams {
  email: string
}

export interface ForgotPasswordFormProps {
  schema?: any
  label?: string
  helpText?: string
  onSuccess?: (error: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
  submitLabel?: string
  renderSuccess?: (data: any) => React.ReactElement
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  schema,
  onSuccess = () => null,
  onError = () => null,
  onValidationError,
  submitLabel,
  label,
  helpText,
  children,
  renderSuccess = () => (
    <AuthFormSuccess
      title="Success!"
      description="Please check your email for instructions to reset your password."
    />
  ),
  ...formProps
}) => {
  const [{ isLoading, data }, submit] = useResetPassword()

  const handleSubmit = (params: SubmitParams) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  if (data) {
    return renderSuccess(data)
  }

  return (
    <Form
      schema={schema}
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ email: '' }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="email"
          label={label}
          type="email"
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

ForgotPasswordForm.defaultProps = {
  submitLabel: 'Reset password',
  label: 'Your email address',
}
