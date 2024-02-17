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
  extends Omit<FormProps<any, Params>, 'children'> {
  pinLength?: number
  children?: React.ReactNode
}

export const OtpForm: React.FC<OtpFormProps> = ({
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
          label="Your verification code"
          help="You can find your one-time password in the Google Authenticator or Authy app."
          type="pin"
          pinLength={pinLength}
          rules={{ required: true }}
        />

        {children}

        <LoginButton type="submit" width="full">
          Verify
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

OtpForm.displayName = 'OtpForm'
