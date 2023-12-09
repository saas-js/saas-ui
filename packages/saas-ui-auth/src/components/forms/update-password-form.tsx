import * as React from 'react'

import {
  Form,
  FormProps,
  FormLayout,
  Field,
  UseFormReturn,
  FieldValues,
} from '@saas-ui/forms'

import { LoginButton } from '../login-button'

export interface UpdatePasswordSubmitParams {
  password: string
  confirmPassword: string
  [key: string]: any
}

export interface UpdatePasswordFormProps<
  Params extends FieldValues = UpdatePasswordSubmitParams
> extends Omit<FormProps<any, Params>, 'children'> {
  passwordLabel?: string
  confirmLabel?: string
  helpText?: string
  submitLabel?: string
  children?: React.ReactNode
}

export const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  submitLabel = 'Update password',
  passwordLabel = 'New password',
  confirmLabel = 'Confirm password',
  helpText,
  children,
  ...formProps
}) => {
  const formRef =
    React.useRef<UseFormReturn<UpdatePasswordSubmitParams, object>>(null)

  const validatePassword = React.useCallback((confirmPassword: string) => {
    const password = formRef.current?.getValues('password')
    return confirmPassword === password
  }, [])

  return (
    <Form
      defaultValues={{ password: '', confirmPassword: '' }}
      formRef={formRef}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="password"
          label={passwordLabel}
          type="password"
          rules={{ required: true }}
          autoComplete="current-password"
        />

        <Field
          name="confirmPassword"
          label={confirmLabel}
          type="password"
          rules={{ validate: validatePassword }}
          autoComplete="new-password"
        />

        {children}

        <LoginButton type="submit" width="full">
          {submitLabel}
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

UpdatePasswordForm.displayName = 'UpdatePasswordForm'
