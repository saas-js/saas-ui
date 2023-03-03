import * as React from 'react'

import {
  Form,
  FormProps,
  FormLayout,
  Field,
  UseFormReturn,
} from '@saas-ui/forms'

import { LoginButton } from './login-button'

interface SubmitParams {
  password: string
  confirmPassword: string
  [key: string]: any
}

export interface UpdatePasswordFormProps
  extends Omit<FormProps<SubmitParams>, 'children'> {
  passwordLabel?: string
  confirmLabel?: string
  helpText?: string
  submitLabel?: string
  renderSuccess?: (data: any) => React.ReactElement
  children?: React.ReactNode
}

export const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  submitLabel,
  passwordLabel,
  confirmLabel,
  helpText,
  children,
  ...formProps
}) => {
  const formRef = React.useRef<UseFormReturn<SubmitParams>>(null)

  const validatePassword = React.useCallback((confirmPassword: string) => {
    const password = formRef.current?.getValues('password')
    return confirmPassword === password
  }, [])

  return (
    <Form<SubmitParams>
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

UpdatePasswordForm.defaultProps = {
  submitLabel: 'Update password',
  passwordLabel: 'New password',
  confirmLabel: 'Confirm password',
}

UpdatePasswordForm.displayName = 'UpdatePasswordForm'
