import * as React from 'react'

import {
  Form,
  FormLayout,
  FormProps,
  PinField,
  FieldValues,
} from '@saas-ui/forms'

import { LoginButton } from '../login-button'

export interface OtpSubmitParams {
  otp: string
  [key: string]: any
}

export interface OtpFormProps<Params extends FieldValues = OtpSubmitParams>
  extends Omit<FormProps<any, Params>, 'chilren'> {
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
