import * as React from 'react'

import { __DEV__ } from '@chakra-ui/utils'

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
  extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver' | 'children'> {
  /**
   * @deprecated use passwordLabel instead
   */
  label?: string
  passwordLabel?: string
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
  passwordLabel,
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

  const validatePassword = React.useCallback((confirmPassword: string) => {
    const password = formRef.current?.getValues('password')
    return confirmPassword === password
  }, [])

  return (
    <Form<SubmitParams>
      onSubmit={handleSubmit}
      onError={onValidationError}
      defaultValues={{ password: '', confirmPassword: '' }}
      ref={formRef}
      {...formProps}
    >
      <FormLayout>
        <Field
          name="password"
          label={passwordLabel ?? label}
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

        <LoginButton type="submit" width="full" isLoading={isLoading}>
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

if (__DEV__) {
  UpdatePasswordForm.displayName = 'UpdatePasswordForm'
}
