import { SubmitHandler } from '@saas-ui/forms'
import { useOtp } from '../provider'
import { AuthFormContainer, AuthViewOptions, AuthFormTitle } from './auth-form'
import { OtpForm, OtpFormProps, OtpSubmitParams } from './forms/otp-form'
import { AuthFormSuccess } from './success'

export interface OtpViewProps
  extends AuthViewOptions,
    Omit<OtpFormProps, 'title' | 'action' | 'onError' | 'onSubmit'> {
  renderSuccess?: (data: any) => React.ReactElement
}

export const OtpView: React.FC<OtpViewProps> = (props) => {
  const {
    title,
    footer,
    onSuccess,
    onError,
    onValidationError,
    renderSuccess = () => (
      <AuthFormSuccess
        title="Verification succesful"
        description="You are now logged in."
      />
    ),
    ...rest
  } = props

  const [{ data }, submit] = useOtp()

  const handleSubmit: SubmitHandler<OtpSubmitParams> = async (params) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  const form = (
    <OtpForm {...rest} onError={onValidationError} onSubmit={handleSubmit} />
  )

  return (
    <AuthFormContainer>
      {typeof title === 'string' ? (
        <AuthFormTitle>{title}</AuthFormTitle>
      ) : (
        title
      )}

      {data ? renderSuccess(data) : form}

      {footer}
    </AuthFormContainer>
  )
}

OtpView.defaultProps = {
  title: 'One-time password',
}

OtpView.displayName = 'OtpView'
