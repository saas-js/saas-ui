import * as React from 'react'

import {
  Form,
  FormProps,
  FormLayout,
  Field,
  UseFormReturn,
  SubmitHandler,
  FieldErrors,
} from '@saas-ui/forms'

import { useUpdatePassword } from '../provider'

import { LoginButton } from './login-button'

interface SubmitParams {
  password: string
  confirmPassword: string
  [key: string]: any
}

export interface UpdatePasswordFormProps
  extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
  label?: string
  confirmLabel?: string
  helpText?: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onValidationError?: (error: FieldErrors<SubmitParams>) => void
  submitLabel?: string
  renderSuccess?: (data: any) => React.ReactElement
}

export const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
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

  const handleSubmit: SubmitHandler<SubmitParams> = ({ password }) => {
    return submit({ password }).then(onSuccess).catch(onError)
  }

  const validatePassword = React.useCallback((confirmPassword) => {
    const password = formRef.current?.getValues('password')
    return confirmPassword === password
  }, [])

  return (
    <Form
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
