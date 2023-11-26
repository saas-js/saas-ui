import { SubmitHandler } from '@saas-ui/forms'
import { useResetPassword } from '../provider'
import { AuthFormContainer, AuthFormTitle, AuthViewOptions } from './auth-form'
import {
  ForgotPasswordForm,
  ForgotPasswordFormProps,
  ForgotPasswordSubmitParams,
} from './forms/forgot-password-form'
import { AuthFormSuccess } from './success'

export interface ForgotPasswordViewProps
  extends AuthViewOptions,
    Omit<ForgotPasswordFormProps, 'title' | 'action' | 'onError' | 'onSubmit'> {
  renderSuccess?: (data: any) => React.ReactElement
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = (
  props
) => {
  const {
    title = 'Forgot password',
    footer,
    onSuccess,
    onError,
    onValidationError,
    renderSuccess = () => (
      <AuthFormSuccess
        title="Password reset requested"
        description="Please check your email for instructions to reset your password."
      />
    ),
    ...rest
  } = props

  const [{ data, isResolved }, submit] = useResetPassword()

  const handleSubmit: SubmitHandler<ForgotPasswordSubmitParams> = (params) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  const isSuccess = isResolved && data

  return (
    <AuthFormContainer>
      {typeof title === 'string' ? (
        <AuthFormTitle>{title}</AuthFormTitle>
      ) : (
        title
      )}
      {isSuccess ? (
        renderSuccess(data)
      ) : (
        <ForgotPasswordForm
          {...rest}
          onError={onValidationError}
          onSubmit={handleSubmit}
        />
      )}

      {footer}
    </AuthFormContainer>
  )
}

ForgotPasswordView.displayName = 'ForgotPasswordView'
