import * as React from 'react'

import {
  chakra,
  useStyles,
  StylesProvider,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useColorModeValue,
} from '@chakra-ui/react'

import { FormProps, FieldErrors } from '@saas-ui/forms'
import { useMultiStyleConfig } from '@saas-ui/system'

import { MagicLinkForm } from './magic-link-form'
import { PasswordForm } from './password-form'
import { Providers, AvailableProviders } from './providers'
import { AuthTypeEnum, AuthActionEnum } from '../provider'

export interface AuthFormProps
  extends Omit<FormProps, 'defaultValues' | 'onSubmit' | 'onError' | 'title'>,
    ThemingProps<'AuthForm'> {
  /**
   * The authentication type, `magiclink` or `password`
   */
  type?: AuthTypeEnum
  /**
   * List of OAuth providers
   */
  providers?: AvailableProviders
  /**
   * The submit action, `logIn` or `signUp`
   */
  action?: AuthActionEnum
  /**
   * React-hook-form schema
   */
  schema?: any
  /**
   * The form title
   */
  title?: React.ReactNode
  /**
   * Label for the submit button
   * @default "Sign in"
   */
  submitLabel?: string
  /**
   * Label for the provider buttons
   * @default "Continue with"
   */
  providerLabel?: string
  /**
   * Label for the divider between oath and the form
   * @default "or continue with"
   */
  dividerLabel?: string
  /**
   * Callback executed after succesful login or signup
   */
  onSuccess?: () => void
  /**
   * Error handler if login or signup fails
   */
  onError?: (error: Error) => void
  /**
   * Callback executed when there are validation errors
   */
  onValidationError?: (errors: FieldErrors) => void
}

export const AuthForm: React.FC<AuthFormProps> = (props) => {
  const {
    type,
    providers,
    title,
    providerLabel,
    dividerLabel,
    children,
    ...formProps
  } = props

  let form
  if (type === 'password') {
    form = <PasswordForm {...formProps} />
  } else {
    form = <MagicLinkForm {...formProps} />
  }

  return (
    <AuthFormContainer>
      {typeof title === 'string' ? (
        <AuthFormTitle>{title}</AuthFormTitle>
      ) : (
        title
      )}
      {providers && (
        <>
          <Providers providers={providers} label={providerLabel} />
          <AuthFormDivider label={dividerLabel}></AuthFormDivider>
        </>
      )}

      {form}

      {children}
    </AuthFormContainer>
  )
}

AuthForm.defaultProps = {
  type: 'magiclink',
  providerLabel: 'Continue with',
  dividerLabel: 'or continue with',
}

export interface AuthFormContainerProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'AuthForm'> {}

const AuthFormContainer: React.FC<AuthFormContainerProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig('AuthForm', props)

  const containerProps = omitThemingProps(props)

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 'full',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div __css={containerStyles} {...containerProps}>
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

export interface AuthFormDividerProps {
  label?: string
}

export const AuthFormDivider: React.FC<AuthFormDividerProps> = ({
  label,
  ...rest
}) => {
  const styles = useStyles()

  const line = {
    borderBottomWidth: '1px',
    content: '""',
    position: 'relative',
    display: 'inline-block',
    width: '50%',
    top: '50%',
  }

  const dividerStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    py: 8,
    color: useColorModeValue('gray.400', 'whiteAlpha.300'),
    _before: line,
    _after: line,
    ...styles.divider,
  }

  const labelStyles = {
    display: 'inline-block',
    flexShrink: 0,
    mx: 2,
  }

  return (
    <chakra.div __css={dividerStyles} {...rest}>
      {label && <chakra.span __css={labelStyles}>{label}</chakra.span>}
    </chakra.div>
  )
}

export const AuthFormTitle: React.FC<HTMLChakraProps<'h2'>> = ({
  children,
  ...rest
}) => {
  const styles = useStyles()

  const titleStyles = {
    fontSize: '2xl',
    fontWeight: 'bold',
    textAlign: 'center',
    mb: 8,
    ...styles.title,
  }

  return (
    <chakra.h2 __css={titleStyles} {...rest}>
      {children}
    </chakra.h2>
  )
}

export const LoginForm: React.FC<AuthFormProps> = (props) => {
  return <AuthForm action="logIn" {...props} />
}

LoginForm.defaultProps = {
  title: 'Log in',
  submitLabel: 'Log in',
}

export const SignupForm: React.FC<AuthFormProps> = (props) => {
  return <AuthForm action="signUp" {...props} />
}

SignupForm.defaultProps = {
  title: 'Sign up',
  submitLabel: 'Sign up',
}
