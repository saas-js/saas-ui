import * as React from 'react'

import { Box, Link } from '@chakra-ui/react'

import { LoginForm, SignupForm, AuthFormProps } from './auth-form'
import { AvailableProviders } from '.'

const ACTIONS: ActionsMap = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOTTEN_PASSWORD: 'forgot_password',
  UPDATE_PASSWORD: 'update_password',
  OTP: 'otp',
}

interface ActionsMap {
  [key: string]: ActionType
}

type ActionType =
  | 'login'
  | 'signup'
  | 'forgot_password'
  | 'update_password'
  | 'otp'

interface AuthProps
  extends Omit<AuthFormProps, 'action' | 'defaultValues' | 'onSubmit'> {
  action?: ActionType
  providers?: AvailableProviders
  signupLink?: React.ReactNode
  loginLink?: React.ReactNode
}

export const Auth: React.FC<AuthProps> = ({
  action = ACTIONS.LOGIN,
  providers,
  signupLink,
  loginLink,
  ...rest
}) => {
  const [authAction, setAuthAction] = React.useState(action)

  React.useEffect(() => {
    setAuthAction(action)
  }, [action])

  switch (authAction) {
    case ACTIONS.LOGIN:
      return (
        <LoginForm providers={providers} {...rest}>
          <AuthLink
            onClick={() => setAuthAction(ACTIONS.SIGNUP)}
            link={signupLink}
          />
        </LoginForm>
      )
    case ACTIONS.SIGNUP:
      return (
        <SignupForm providers={providers} {...rest}>
          <AuthLink
            onClick={() => setAuthAction(ACTIONS.LOGIN)}
            link={loginLink}
          />
        </SignupForm>
      )
    case ACTIONS.FORGOTTEN_PASSWORD:
    case ACTIONS.UPDATE_PASSWORD:
    case ACTIONS.OTP:
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
