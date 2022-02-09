import * as React from 'react'

import { Box, Link } from '@chakra-ui/react'

import { LoginForm, SignupForm, AuthFormProps } from './auth-form'
import { OtpForm } from './otp-form'
import { AvailableProviders } from '.'

export const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOTTEN_PASSWORD: 'forgot_password',
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
}

export const Auth: React.FC<AuthProps> = ({
  view = VIEWS.LOGIN,
  providers,
  signupLink,
  loginLink,
  ...rest
}) => {
  const [authView, setAuthView] = React.useState(view)

  React.useEffect(() => {
    setAuthView(view)
  }, [view])

  switch (authView) {
    case VIEWS.LOGIN:
      return (
        <LoginForm providers={providers} {...rest}>
          <AuthLink
            onClick={() => setAuthView(VIEWS.SIGNUP)}
            link={signupLink}
          />
        </LoginForm>
      )
    case VIEWS.SIGNUP:
      return (
        <SignupForm providers={providers} {...rest}>
          <AuthLink onClick={() => setAuthView(VIEWS.LOGIN)} link={loginLink} />
        </SignupForm>
      )
    case VIEWS.FORGOTTEN_PASSWORD:
    case VIEWS.UPDATE_PASSWORD:
    case VIEWS.OTP:
      return <OtpForm />
  }

  return null
}

export interface AuthLinkProps {
  link: React.ReactNode
  onClick: (e: React.MouseEvent) => void
}

export const AuthLink = ({ link, onClick }: AuthLinkProps) => {
  return (
    <Box align="center" py="8">
      {typeof link === 'string' ? <Link onClick={onClick}>{link}</Link> : link}
    </Box>
  )
}

Auth.defaultProps = {
  signupLink: "Don't have an account yet? Sign up.",
  loginLink: 'Already have an account? Log in.',
}
