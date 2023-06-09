import * as React from 'react'

import { chakra, Link } from '@chakra-ui/react'

import { AuthFormOptions } from './auth-form'
import { LoginView, SignupView } from './login-view'
import { ForgotPasswordView } from './forgot-password-view'
import { UpdatePasswordView } from './update-password-view'
import { OtpView } from './otp-view'
import { AvailableProviders } from './forms/providers'
import { FormProps } from '@saas-ui/forms'
import { error } from 'console'

export const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOT_PASSWORD: 'forgot_password',
  UPDATE_PASSWORD: 'update_password',
  OTP: 'otp',
} as const

type ValueOf<T> = T[keyof T]
type ViewType = ValueOf<typeof VIEWS>

export interface AuthProps
  extends AuthFormOptions,
    Omit<
      FormProps<any, any>,
      'title' | 'action' | 'defaultValues' | 'onSubmit' | 'onError' | 'children'
    > {
  /**
   * Sets the visible authentication form.
   * Supported views are:
   * - login
   * - signup
   * - forgot_password
   * - update_password
   * - otp
   */
  view?: ViewType
  /**
   * The OAuth providers that are supported.
   */
  providers?: AvailableProviders
  /**
   * Customize the signup link under the log in form.
   * @default "Sign up"
   */
  signupLink?: React.ReactNode
  /**
   * Customize the login link under the sign up form.
   * @default "Log in"
   */
  loginLink?: React.ReactNode
  /**
   * The forgot password link
   * @default "Forgot password?"
   */
  forgotLink?: React.ReactNode
  /**
   * Back to log in link
   * @default "Back to log in"
   */
  backLink?: React.ReactNode
  /**
   * Text shown before the signupLink
   * @default "No account?"
   */
  noAccount?: React.ReactNode
  /**
   * Text shown before the loginLink
   * @default "Already have an account?"
   */
  haveAccount?: React.ReactNode
  /**
   * Called when a login or signup request fails.
   * @param view The current active view
   * @param error
   */
  onError?: (view: ViewType, error: Error) => void
}

export const Auth: React.FC<AuthProps> = (props) => {
  const {
    view = VIEWS.LOGIN,
    providers,
    signupLink = 'Sign up',
    loginLink = 'Log in',
    forgotLink = 'Forgot password?',
    backLink = 'Back to log in',
    noAccount = 'No account yet?',
    haveAccount = 'Already have an account?',
    onError,
    ...rest
  } = props

  const { type } = rest

  const [authView, setAuthView] = React.useState(view)

  React.useEffect(() => {
    setAuthView(view)
  }, [view])

  const errorHandler = React.useCallback(
    (view: ViewType) => (error: Error) => {
      if (authView === view && onError) {
        onError(view, error)
      }
    },
    [authView]
  )

  switch (authView) {
    case VIEWS.LOGIN:
      return (
        <LoginView
          providers={providers}
          onError={errorHandler(VIEWS.LOGIN)}
          footer={
            <AuthLink
              onClick={() => setAuthView(VIEWS.SIGNUP)}
              label={noAccount}
              link={signupLink}
            />
          }
          {...rest}
        >
          {type === 'password' &&
            (typeof forgotLink === 'string' ? (
              <Link
                fontSize="md"
                color="muted"
                float="right"
                onClick={() => setAuthView(VIEWS.FORGOT_PASSWORD)}
              >
                {forgotLink}
              </Link>
            ) : (
              forgotLink
            ))}
        </LoginView>
      )
    case VIEWS.SIGNUP:
      return (
        <SignupView
          providers={providers}
          onError={errorHandler(VIEWS.SIGNUP)}
          footer={
            <AuthLink
              onClick={() => setAuthView(VIEWS.LOGIN)}
              label={haveAccount}
              link={loginLink}
            />
          }
          {...rest}
        />
      )
    case VIEWS.FORGOT_PASSWORD:
      return (
        <ForgotPasswordView
          onError={errorHandler(VIEWS.FORGOT_PASSWORD)}
          footer={
            <AuthLink
              onClick={() => setAuthView(VIEWS.LOGIN)}
              link={backLink}
            />
          }
          {...rest}
        />
      )
    case VIEWS.UPDATE_PASSWORD:
      return (
        <UpdatePasswordView
          onError={errorHandler(VIEWS.UPDATE_PASSWORD)}
          {...rest}
        />
      )
    case VIEWS.OTP:
      return <OtpView onError={errorHandler(VIEWS.OTP)} {...rest} />
  }

  return null
}

interface AuthLinkProps {
  label?: React.ReactNode
  link: React.ReactNode
  onClick: (e: React.MouseEvent) => void
}

const AuthLink = ({ label, link, onClick }: AuthLinkProps) => {
  const styles = {
    textAlign: 'center',
    py: 8,
    fontSize: 'md',
  }
  return (
    <chakra.div __css={styles}>
      {label && <chakra.span color="muted">{label}</chakra.span>}{' '}
      {typeof link === 'string' ? <Link onClick={onClick}>{link}</Link> : link}
    </chakra.div>
  )
}

Auth.displayName = 'Auth'
