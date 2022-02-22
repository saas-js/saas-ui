import * as React from 'react'

import { Box, Link } from '@chakra-ui/react'

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
   * - forgot_password (not implemented yet)
   * - update_password (not implemented yet)
   * - otp
   */
  view?: ViewType
  /**
   * The OAuth providers that are supported.
   */
  providers?: AvailableProviders
  /**
   * Customize the signup link under the log in form.
   */
  signupLink?: React.ReactNode
  /**
   * Customize the login link under the sign up form.
   */
  loginLink?: React.ReactNode
  forgotLink?: React.ReactNode

  noAccount?: React.ReactNode
  haveAccount?: React.ReactNode
}

export const Auth: React.FC<AuthProps> = (props) => {
  const {
    view = VIEWS.LOGIN,
    providers,
    signupLink,
    loginLink,
    forgotLink,
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
              link={loginLink}
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
  return (
    <Box align="center" py="8" fontSize="md">
      {label}{' '}
      {typeof link === 'string' ? <Link onClick={onClick}>{link}</Link> : link}
    </Box>
  )
}

Auth.defaultProps = {
  noAccount: 'No account yet?',
  haveAccount: 'Already have an account?',
  signupLink: 'Sign up',
  loginLink: 'Log in',
  forgotLink: 'Forgot password?',
}
