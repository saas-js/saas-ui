import * as React from 'react'

import { Form, FormLayout, Field, FormProps } from '@saas-ui/forms'
import { LoginButton } from './login-button'

export interface MagicLinkFormProps
  extends Omit<FormProps<SubmitParams>, 'children'> {
  submitLabel?: string
  emailLabel?: string
  children?: React.ReactNode
}

interface SubmitParams {
  email: string
  [key: string]: any
}

export const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
  action = 'logIn',
  submitLabel = 'Continue with Email',
  emailLabel = 'Email',
  defaultValues,
  children,
  ...formProps
}) => {
  return (
    <Form<SubmitParams>
      defaultValues={{ email: '', ...defaultValues }}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="email"
          label={emailLabel}
          type="email"
          rules={{ required: true }}
          autoComplete="email"
        />

        {children}

        <LoginButton type="submit" width="full">
          {submitLabel}
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

MagicLinkForm.displayName = 'MagicLinkForm'
