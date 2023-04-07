import { SubmitHandler } from '@saas-ui/forms'
import { useUpdatePassword } from '../provider'
import { AuthFormContainer, AuthViewOptions, AuthFormTitle } from './auth-form'
import {
  UpdatePasswordForm,
  UpdatePasswordFormProps,
  UpdatePasswordSubmitParams,
} from './forms/update-password-form'
import { AuthFormSuccess } from './success'

export interface UpdatePasswordViewProps
  extends AuthViewOptions,
    Omit<UpdatePasswordFormProps, 'title' | 'action' | 'onError' | 'onSubmit'> {
  renderSuccess?: (data: any) => React.ReactElement
}

export const UpdatePasswordView: React.FC<UpdatePasswordViewProps> = (
  props
) => {
  const {
    title,
    footer,
    onSuccess,
    onError,
    onValidationError,
    renderSuccess = () => (
      <AuthFormSuccess
        title="Your password has been updated"
        description="You can now log in with your new password."
      />
    ),
    ...rest
  } = props

  const [{ data, isResolved }, submit] = useUpdatePassword()

  const handleSubmit: SubmitHandler<UpdatePasswordSubmitParams> = ({
    password,
  }) => {
    return submit({ password }).then(onSuccess).catch(onError)
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
        <UpdatePasswordForm
          {...rest}
          onError={onValidationError}
          onSubmit={handleSubmit}
        />
      )}

      {footer}
    </AuthFormContainer>
  )
}

UpdatePasswordView.defaultProps = {
  title: 'Choose a new password',
}

UpdatePasswordView.displayName = 'UpdatePasswordView'
