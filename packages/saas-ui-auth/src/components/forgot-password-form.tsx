import * as React from 'react'

import { __DEV__ } from '@chakra-ui/utils'

import {
  Form,
  FormLayout,
  Field,
  FormProps,
  SubmitHandler,
  FieldErrors,
} from '@saas-ui/forms'

import { useResetPassword } from '../provider'

import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

interface SubmitParams {
  email: string
  [key: string]: any
}

export interface ForgotPasswordFormProps
  extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
  label?: string
  helpText?: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: FieldErrors<SubmitParams>) => void
  submitLabel?: string
  renderSuccess?: (data: any) => React.ReactElement
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
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

  const handleSubmit: SubmitHandler<SubmitParams> = (params) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  if (data) {
    return renderSuccess(data)
  }

  return (
    <Form
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

if (__DEV__) {
  ForgotPasswordForm.displayName = 'ForgotPasswordForm'
}
