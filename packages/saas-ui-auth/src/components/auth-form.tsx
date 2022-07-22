import * as React from 'react'

import {
  chakra,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useMultiStyleConfig,
  SystemStyleObject,
  createStylesContext,
} from '@chakra-ui/react'
import { cx, __DEV__ } from '@chakra-ui/utils'

import { FormProps, FieldErrors } from '@saas-ui/forms'
import { Divider } from '@saas-ui/layout'

import { MagicLinkForm } from './magic-link-form'
import { PasswordForm } from './password-form'
import { OtpForm } from './otp-form'
import { Providers, AvailableProviders } from './providers'
import { AuthTypeEnum, AuthActionEnum } from '../provider'
import { ForgotPasswordForm } from './forgot-password-form'
import { UpdatePasswordForm } from './update-password-form'

const [StylesProvider, useStyles] = createStylesContext('AuthForm')

export interface AuthFormProps
  extends Omit<
      FormProps<any>,
      'defaultValues' | 'onSubmit' | 'onError' | 'title'
    >,
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
   * Children are passed down to the underlying form
   */
  children?: React.ReactNode
  /**
   * Render custom elements under the submit button
   */
  footer?: React.ReactNode
  /**
   * Callback executed after succesful login or signup
   */
  onSuccess?: (data: any) => void
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
    footer,
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
          <AuthFormDivider label={dividerLabel} />
        </>
      )}

      {form}

      {footer}
    </AuthFormContainer>
  )
}

AuthForm.defaultProps = {
  type: 'magiclink',
  providerLabel: 'Continue with',
  dividerLabel: 'or continue with',
}

if (__DEV__) {
  AuthForm.displayName = 'AuthForm'
}

export interface AuthFormContainerProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'AuthForm'> {}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig('AuthForm', props)

  const containerProps = omitThemingProps(props)

  const containerStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 'full',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.div
        __css={containerStyles}
        {...containerProps}
        className={cx('saas-auth-form', props.className)}
      >
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

if (__DEV__) {
  AuthFormContainer.displayName = 'AuthFormContainer'
}

export interface AuthFormDividerProps {
  label?: string
}

export const AuthFormDivider: React.FC<AuthFormDividerProps> = (props) => {
  const styles = useStyles()

  const dividerStyles = {
    my: 4,
    ...styles.divider,
  }

  return <Divider {...props} sx={dividerStyles} />
}

export const AuthFormTitle: React.FC<HTMLChakraProps<'h2'>> = ({
  children,
  ...rest
}) => {
  const styles = useStyles()

  const titleStyles: SystemStyleObject = {
    fontSize: '2xl',
    fontWeight: 'bold',
    textAlign: 'center',
    mb: 8,
    ...styles.title,
  }

  return (
    <chakra.h2
      __css={titleStyles}
      {...rest}
      className={cx('saas-auth-form__title', rest.className)}
    >
      {children}
    </chakra.h2>
  )
}

if (__DEV__) {
  AuthFormTitle.displayName = 'AuthFormTitle'
}

export const LoginView: React.FC<AuthFormProps> = (props) => {
  return <AuthForm action="logIn" {...props} />
}

LoginView.defaultProps = {
  title: 'Log in',
  submitLabel: 'Log in',
}

if (__DEV__) {
  LoginView.displayName = 'LoginView'
}

export const SignupView: React.FC<AuthFormProps> = (props) => {
  return <AuthForm action="signUp" {...props} />
}

SignupView.defaultProps = {
  title: 'Sign up',
  submitLabel: 'Sign up',
}

if (__DEV__) {
  SignupView.displayName = 'SignupView'
}

export const OtpView: React.FC<AuthFormProps> = (props) => {
  const { title, footer, ...rest } = props
  return (
    <AuthFormContainer>
      {typeof title === 'string' ? (
        <AuthFormTitle>{title}</AuthFormTitle>
      ) : (
        title
      )}
      <OtpForm {...rest} />

      {footer}
    </AuthFormContainer>
  )
}

OtpView.defaultProps = {
  title: 'One-time password',
}

if (__DEV__) {
  OtpView.displayName = 'OtpView'
}

export const ForgotPasswordView: React.FC<AuthFormProps> = (props) => {
  const { title, footer, ...rest } = props
  return (
    <AuthFormContainer>
      {typeof title === 'string' ? (
        <AuthFormTitle>{title}</AuthFormTitle>
      ) : (
        title
      )}
      <ForgotPasswordForm {...rest} />

      {footer}
    </AuthFormContainer>
  )
}

ForgotPasswordView.defaultProps = {
  title: 'Forgot password',
}

if (__DEV__) {
  ForgotPasswordView.displayName = 'ForgotPasswordView'
}

export const UpdatePasswordView: React.FC<AuthFormProps> = (props) => {
  const { title, footer, ...rest } = props
  return (
    <AuthFormContainer>
      {typeof title === 'string' ? (
        <AuthFormTitle>{title}</AuthFormTitle>
      ) : (
        title
      )}
      <UpdatePasswordForm {...rest} />

      {footer}
    </AuthFormContainer>
  )
}

UpdatePasswordView.defaultProps = {
  title: 'Choose a new password',
}

if (__DEV__) {
  UpdatePasswordView.displayName = 'UpdatePasswordView'
}
