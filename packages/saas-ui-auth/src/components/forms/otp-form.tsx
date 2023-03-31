import * as React from 'react'

import { Form, FormLayout, Field, FormProps, PinField } from '@saas-ui/forms'

import { LoginButton } from '../login-button'

export interface OtpSubmitParams {
  otp: string
  [key: string]: any
}

export interface OtpFormProps extends Omit<FormProps<any>, 'chilren'> {
  otpLabel?: string
  helpText?: string
  pinLength?: number
  submitLabel?: string
  children?: React.ReactNode
}

export const OtpForm: React.FC<OtpFormProps> = ({
  submitLabel = 'Verify',
  otpLabel,
  helpText,
  pinLength = 4,
  defaultValues,
  children,
  ...formProps
}) => {
  return (
    <Form defaultValues={{ otp: '' }} {...formProps}>
      <FormLayout>
        <PinField
          name="otp"
          label={otpLabel}
          help={helpText}
          type="pin"
          pinLength={pinLength}
          rules={{ required: true }}
        />

        {children}

        <LoginButton type="submit" width="full">
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
  otpLabel: 'Your verification code',
}

OtpForm.displayName = 'OtpForm'
