import * as React from 'react'

import { chakra, Link } from '@chakra-ui/react'

import {
  LoginView,
  SignupView,
  OtpView,
  ForgotPasswordView,
  UpdatePasswordView,
  AuthFormProps,
} from './auth-form'

import { AvailableProviders } from '.'

export const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOT_PASSWORD: 'forgot_password',
  UPDATE_PASSWORD: 'update_password',
  OTP: 'otp',
}

type ViewType =
  | 'login'
  | 'signup'
  | 'forgot_password'
  | 'update_password'
  | 'otp'

export interface AuthProps
  extends Omit<AuthFormProps, 'action' | 'defaultValues' | 'onSubmit'> {
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
}

export const Auth: React.FC<AuthProps> = (props) => {
  const {
    view = VIEWS.LOGIN,
    providers,
    signupLink,
    loginLink,
    forgotLink,
    backLink,
    noAccount,
    haveAccount,
    ...rest
  } = props

  const { type } = rest

  const [authView, setAuthView] = React.useState(view)

  React.useEffect(() => {
    setAuthView(view)
  }, [view])

  switch (authView) {
    case VIEWS.LOGIN:
      return (
        <LoginView
          providers={providers}
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
          footer={
            <AuthLink
              onClick={() => setAuthView(VIEWS.LOGIN)}
              label={haveAccount}
              link={loginLink}
            />
          }
          {...rest}
        ></SignupView>
      )
    case VIEWS.FORGOT_PASSWORD:
      return (
        <ForgotPasswordView
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
      return <UpdatePasswordView {...rest} />
    case VIEWS.OTP:
      return <OtpView {...rest} />
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

Auth.defaultProps = {
  noAccount: 'No account yet?',
  haveAccount: 'Already have an account?',
  signupLink: 'Sign up',
  loginLink: 'Log in',
  forgotLink: 'Forgot password?',
  backLink: 'Back to log in',
}
