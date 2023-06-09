import { HTMLChakraProps, ThemingProps } from '@chakra-ui/react'
import { SubmitHandler } from '@saas-ui/forms'
import { useAuth, useLogin } from '../provider'
import {
  AuthFormOptions,
  AuthViewOptions,
  AuthFormContainer,
  AuthFormTitle,
  AuthFormDivider,
} from './auth-form'
import { MagicLinkForm, MagicLinkSubmitParams } from './forms/magic-link-form'
import { PasswordForm, PasswordSubmitParams } from './forms/password-form'
import { Providers } from './forms/providers'
import { AuthFormSuccess } from './success'

export const LoginView: React.FC<AuthViewOptions & AuthFormOptions> = (
  props
) => {
  if (props.type === 'password') {
    return <PasswordView {...props} />
  }

  return <MagicLinkView {...props} />
}

export const SignupView: React.FC<AuthViewOptions & AuthFormOptions> = (
  props
) => {
  return <LoginView action="signUp" {...props} />
}

SignupView.defaultProps = {
  title: 'Sign up',
  submitLabel: 'Sign up',
}

SignupView.displayName = 'SignupView'

interface PasswordViewProps extends AuthViewOptions, AuthFormOptions {
  renderSuccess?: (data: any) => React.ReactElement
}

const PasswordView: React.FC<PasswordViewProps> = (props) => {
  const {
    onSuccess,
    onError,
    renderSuccess = () => (
      <AuthFormSuccess
        title="Success!"
        description="Check your mailbox to verify your account."
      />
    ),
    action,
    title,
    providers,
    providerLabel,
    dividerLabel,
    footer,
    oauthRedirectUrl,
    ...formProps
  } = props
  const [{ isResolved, data }, submit] = useLogin({ action })

  const handleSubmit: SubmitHandler<PasswordSubmitParams> = (params) => {
    return submit(params).then(onSuccess).catch(onError)
  }

  // Show a default success message on signup.
  const isSuccess = isResolved && action === 'signUp'
  if (isResolved && action === 'signUp') {
    return renderSuccess(data)
  }

  const wrapperProps = {
    providers,
    title,
    providerLabel,
    dividerLabel,
    footer,
    oauthRedirectUrl,
  }

  return (
    <AuthFormWrapper {...wrapperProps}>
      {isSuccess ? (
        renderSuccess(data)
      ) : (
        <PasswordForm onSubmit={handleSubmit} {...formProps} />
      )}
    </AuthFormWrapper>
  )
}

interface MagicLinkViewProps extends AuthViewOptions, AuthFormOptions {
  renderSuccess?: (data: any) => React.ReactElement
}

const MagicLinkView: React.FC<MagicLinkViewProps> = (props) => {
  const {
    onSuccess,
    onError,
    renderSuccess = (data: any) => (
      <AuthFormSuccess
        title="Check your mailbox"
        description={
          `We've sent a magic link to ${data?.email}` || 'your email address'
        }
      />
    ),
    title,
    action,
    providers,
    providerLabel,
    dividerLabel,
    footer,
    oauthRedirectUrl,
    ...formProps
  } = props

  const [{ isLoading, isResolved, data }, submit] = useLogin({
    action,
  })

  const handleSubmit: SubmitHandler<MagicLinkSubmitParams> = ({ email }) => {
    return submit({ email }).then(onSuccess).catch(onError)
  }

  const wrapperProps = {
    providers,
    title,
    providerLabel,
    dividerLabel,
    footer,
    oauthRedirectUrl,
  }

  return (
    <AuthFormWrapper {...wrapperProps}>
      {isResolved ? (
        renderSuccess(data)
      ) : (
        <MagicLinkForm {...formProps} onSubmit={handleSubmit} />
      )}
    </AuthFormWrapper>
  )
}

LoginView.defaultProps = {
  title: 'Log in',
  submitLabel: 'Log in',
}

LoginView.displayName = 'LoginView'

interface AuthFormWrapperProps
  extends AuthFormOptions,
    Omit<HTMLChakraProps<'div'>, 'title'>,
    ThemingProps<'SuiAuthForm'> {}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = (props) => {
  const {
    providers,
    title,
    providerLabel,
    dividerLabel,
    footer,
    children,
    oauthRedirectUrl,
    ...rest
  } = props

  const { logIn } = useAuth()

  const signInWith = (provider: string) => {
    return logIn({ provider }, { redirectTo: oauthRedirectUrl })
  }

  return (
    <AuthFormContainer {...rest}>
      {typeof title === 'string' ? (
        <AuthFormTitle>{title}</AuthFormTitle>
      ) : (
        title
      )}
      {providers && (
        <>
          <Providers
            providers={providers}
            labelPrefix={providerLabel}
            onSignIn={signInWith}
          />
          <AuthFormDivider label={dividerLabel} />
        </>
      )}

      {children}

      {footer}
    </AuthFormContainer>
  )
}

AuthFormWrapper.defaultProps = {
  type: 'magiclink',
  providerLabel: 'Continue with',
  dividerLabel: 'or continue with',
}

AuthFormWrapper.displayName = 'AuthForm'
