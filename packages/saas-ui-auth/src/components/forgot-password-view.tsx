import { SubmitHandler } from '@saas-ui/forms'
import { useResetPassword } from '../provider'
import {
  AuthFormContainer,
  AuthFormOptions,
  AuthFormTitle,
  AuthViewOptions,
} from './auth-form'
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
  /**
   * The URL where the user can save their new password.
   */
  redirectUrl?: string
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
    redirectUrl,
    ...rest
  } = props

  const [{ data, isResolved }, submit] = useResetPassword()

  const handleSubmit: SubmitHandler<ForgotPasswordSubmitParams> = (params) => {
    return submit(params, {
      redirectTo: redirectUrl,
    })
      .then(onSuccess)
      .catch(onError)
  }

  return (
    <AuthFormContainer>
      {typeof title === 'string' ? (
        <AuthFormTitle>{title}</AuthFormTitle>
      ) : (
        title
      )}
      {isResolved ? (
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
