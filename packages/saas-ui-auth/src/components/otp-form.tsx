import * as React from 'react'

import { Form, FormLayout, Field } from '@saas-ui/forms'

import { useOtp } from '../provider'

import { LoginButton } from './login-button'

import { AuthFormSuccess } from './success'

interface SubmitParams {
  otp: string
}

export interface OtpFormProps {
  schema?: any
  label?: string
  helpText?: string
  pinLength?: number
  onSuccess?: (error: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
  submitLabel?: string
  renderSuccess?: (data: any) => React.ReactElement
}

export const OtpForm: React.FC<OtpFormProps> = ({
  schema,
  onSuccess = () => null,
  onError = () => null,
  onValidationError,
  submitLabel = 'Verify',
  label,
  helpText,
  pinLength = 4,
  children,
  renderSuccess = () => (
    <AuthFormSuccess title="Success!" description="You are now logged in." />
  ),
  ...formProps
}) => {
  const [{ isLoading, data }, submit] = useOtp()

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
      defaultValues={{ otp: '' }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="otp"
          label={label}
          help={helpText}
          type="pin"
          pinLength={pinLength}
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

OtpForm.defaultProps = {
  helpText:
    'You can find your one-time password in the Google Authenticator or Authy app.',
  submitLabel: 'Verify',
  label: 'Your verification code',
}
