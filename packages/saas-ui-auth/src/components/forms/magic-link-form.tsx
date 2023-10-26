import * as React from 'react'

import { Form, FormLayout, Field, FormProps, FieldValues } from '@saas-ui/forms'
import { LoginButton } from '../login-button'

export interface MagicLinkFormProps<
  Params extends FieldValues = MagicLinkSubmitParams
> extends Omit<FormProps<any, Params>, 'children'> {
  submitLabel?: string
  emailLabel?: string
  children?: React.ReactNode
}

export interface MagicLinkSubmitParams {
  email: string
  [key: string]: any
}

export const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
  submitLabel = 'Continue with Email',
  emailLabel = 'Email',
  children,
  ...formProps
}) => {
  return (
    <Form defaultValues={{ email: '' }} {...formProps}>
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
