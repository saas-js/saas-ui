import * as React from 'react'

import { Form, FormLayout, Field, UseFormReturn } from '@saas-ui/forms'

import { useUpdatePassword } from '../provider'

import { LoginButton } from './login-button'

interface SubmitParams {
  password: string
  confirmPassword: string
}

export interface UpdatePasswordFormProps {
  schema?: any
  label?: string
  confirmLabel?: string
  helpText?: string
  onSuccess?: (error: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: any) => void
  submitLabel?: string
  renderSuccess?: (data: any) => React.ReactElement
}

export const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  schema,
  onSuccess = () => null,
  onError = () => null,
  onValidationError,
  submitLabel,
  label,
  confirmLabel,
  helpText,
  children,
  ...formProps
}) => {
  const [{ isLoading }, submit] = useUpdatePassword()

  const formRef = React.useRef<UseFormReturn<SubmitParams>>(null)

  const handleSubmit = ({ password }: SubmitParams) => {
    return submit({ password }).then(onSuccess).catch(onError)
  }

  const validatePassword = React.useCallback((confirmPassword) => {
    const password = formRef.current?.getValues('password')
    return confirmPassword === password
  }, [])

  return (
    <Form
      schema={schema}
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ password: '', confirmPassword: '' }}
      ref={formRef}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="password"
          label={label}
          type="password"
          rules={{ required: true }}
        />

        <Field
          name="confirmPassword"
          label={confirmLabel}
          type="password"
          rules={{ validate: validatePassword }}
        />

        {children}

        <LoginButton type="submit" isFullWidth isLoading={isLoading}>
          {submitLabel}
        </LoginButton>
      </FormLayout>
    </Form>
  )
}

UpdatePasswordForm.defaultProps = {
  submitLabel: 'Update password',
  label: 'New password',
  confirmLabel: 'Confirm password',
}
