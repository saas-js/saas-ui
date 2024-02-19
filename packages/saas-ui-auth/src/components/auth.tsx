import * as React from 'react'

import { chakra, Link, useControllableState } from '@chakra-ui/react'

import { AuthFormOptions } from './auth-form'
import { LoginView, SignupView } from './login-view'
import { ForgotPasswordView } from './forgot-password-view'
import { UpdatePasswordView } from './update-password-view'
import { OtpView } from './otp-view'
import { AvailableProviders } from './forms/providers'
import { FormProps } from '@saas-ui/forms'
import { AuthFormSuccess } from './success'

export const VIEWS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOT_PASSWORD: 'forgot_password',
  UPDATE_PASSWORD: 'update_password',
  OTP: 'otp',
} as const

type ValueOf<T> = T[keyof T]
type ViewType = ValueOf<typeof VIEWS>

export type RedirectViews =
  | typeof VIEWS.LOGIN
  | typeof VIEWS.SIGNUP
  | typeof VIEWS.FORGOT_PASSWORD

export interface AuthProps
  extends Omit<AuthFormOptions, 'redirectUrl'>,
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
   * Called when the view changes.
   */
  onViewChange?(view: ViewType): void
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
   * Internationalization options for the auth form.
   */
  translations?: Partial<typeof defaultTranslations>
  /**
   * Called when a login or signup request fails.
   * @param view The current active view
   * @param error
   */
  onError?: (view: ViewType, error: Error) => void
  /**
   * Called when a login or signup request succeeds.
   * @param view The current active view
   * @param data
   */
  onSuccess?: (view: ViewType, data: any) => void
  /**
   * The redirect URL after succesful login
   * This will only redirect if implemented in the auth provider.
   */
  redirectUrl?: string | ((view: RedirectViews) => string | undefined)
}

const defaultTranslations = {
  signup: 'Sign up',
  signupSubmit: 'Sign up',
  signupSuccess: 'Success!',
  signupSuccessDescription: 'Check your mailbox to verify your account.',
  login: 'Log in',
  loginSubmit: 'Log in',
  magicLinkSuccess: 'Check your mailbox',
  magicLinkSuccessDescription: 'We have sent a magic link to {email}.',
  yourEmail: 'your email address',
  forgotPassword: 'Forgot password?',
  forgotPasswordSubmit: 'Send reset link',
  forgotPasswordSuccess: 'Password reset requested',
  forgotPasswordSuccessDescription:
    'Please check your email for instructions to reset your password.',
  updatePassword: 'Update password',
  updatePasswordSubmit: 'Update password',
  backToLogin: 'Back to log in',
  noAccount: 'No account yet?',
  haveAccount: 'Already have an account?',
  otp: 'One-time password',
  otpSubmit: 'Verify',
  otpHelp:
    'You can find your one-time password in the Google Authenticator or Authy app.',
  continueWith: 'Continue with',
  orContinueWith: 'or continue with',
  verificationCode: 'Your verification code',
  email: 'Email',
  password: 'Password',
  newPassword: 'New password',
  confirmPassword: 'Confirm password',
}

export type IntlTranslations = typeof defaultTranslations

const tpl = (value: string, data: Record<string, any>) => {
  return value.replace(/{(\w*)}/g, function (m, key) {
    return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : ''
  })
}

export const Auth: React.FC<AuthProps> = (props) => {
  const {
    view,
    onViewChange,
    providers,
    title,
    translations: translationsProp,
    signupLink,
    loginLink,
    forgotLink,
    backLink,
    onError,
    onSuccess,
    redirectUrl,
    fields,
    ...rest
  } = props

  const translations = { ...defaultTranslations, ...translationsProp }

  const { type } = rest

  const [authView, setAuthView] = useControllableState<ViewType>({
    defaultValue: VIEWS.LOGIN,
    value: view,
    onChange: (view) => {
      onViewChange?.(view)
    },
  })

  const errorHandler = React.useCallback(
    (view: ViewType) => (error: Error) => {
      if (authView === view && onError) {
        onError(view, error)
      }
    },
    [authView]
  )

  const successHandler = React.useCallback(
    (view: ViewType) => (data: any) => {
      if (authView === view && onSuccess) {
        onSuccess(view, data)
      }
    },
    [authView]
  )

  const getRedirectUrl = React.useCallback(
    (view: RedirectViews) => {
      if (typeof redirectUrl === 'function') {
        return redirectUrl(view)
      }
      return redirectUrl
    },
    [redirectUrl]
  )

  switch (authView) {
    case VIEWS.LOGIN:
      return (
        <LoginView
          providers={providers}
          onError={errorHandler(VIEWS.LOGIN)}
          onSuccess={successHandler(VIEWS.LOGIN)}
          footer={
            <AuthLink
              onClick={() => setAuthView(VIEWS.SIGNUP)}
              label={translations.noAccount}
              link={signupLink ?? translations.signup}
            />
          }
          redirectUrl={getRedirectUrl(VIEWS.LOGIN)}
          title={title ?? translations.login}
          providerLabel={translations.continueWith}
          dividerLabel={translations.orContinueWith}
          fields={{
            ...fields,
            email: {
              label: translations.email,
              ...fields?.email,
            },
            password: {
              label: translations.password,
              ...fields?.password,
            },
            submit: {
              children: translations.loginSubmit,
              ...fields?.submit,
            },
          }}
          renderSuccess={
            type === 'magiclink'
              ? (data) => (
                  <AuthFormSuccess
                    title={translations.magicLinkSuccess}
                    description={tpl(translations.magicLinkSuccessDescription, {
                      email: data?.email || translations.yourEmail,
                    })}
                  />
                )
              : undefined
          }
          {...rest}
        >
          {type === 'password' &&
            (!forgotLink || typeof forgotLink === 'string' ? (
              <Link
                fontSize="md"
                color="muted"
                float="right"
                onClick={() => setAuthView(VIEWS.FORGOT_PASSWORD)}
              >
                {forgotLink ?? translations.forgotPassword}
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
          onSuccess={successHandler(VIEWS.SIGNUP)}
          footer={
            <AuthLink
              onClick={() => setAuthView(VIEWS.LOGIN)}
              label={translations.haveAccount}
              link={loginLink ?? translations.login}
            />
          }
          redirectUrl={getRedirectUrl(VIEWS.SIGNUP)}
          title={title ?? translations.signup}
          providerLabel={translations.continueWith}
          dividerLabel={translations.orContinueWith}
          fields={{
            ...fields,
            email: {
              label: translations.email,
              ...fields?.label,
            },
            password: {
              label: translations.password,
              ...fields?.password,
            },
            submit: {
              children: translations.signupSubmit,
              ...fields?.submit,
            },
          }}
          renderSuccess={() => (
            <AuthFormSuccess
              title={translations.signupSuccess}
              description={translations.signupSuccessDescription}
            />
          )}
          {...rest}
        />
      )
    case VIEWS.FORGOT_PASSWORD:
      return (
        <ForgotPasswordView
          onError={errorHandler(VIEWS.FORGOT_PASSWORD)}
          onSuccess={successHandler(VIEWS.FORGOT_PASSWORD)}
          footer={
            <AuthLink
              onClick={() => setAuthView(VIEWS.LOGIN)}
              link={backLink ?? translations.backToLogin}
            />
          }
          redirectUrl={getRedirectUrl(VIEWS.FORGOT_PASSWORD)}
          title={title ?? translations.forgotPassword}
          fields={{
            ...fields,
            email: {
              label: translations.email,
              ...fields?.email,
            },
            submit: {
              children: translations.forgotPasswordSubmit,
              ...fields?.submit,
            },
          }}
          renderSuccess={() => (
            <AuthFormSuccess
              title={translations.forgotPasswordSuccess}
              description={translations.forgotPasswordSuccessDescription}
            />
          )}
          {...rest}
        />
      )
    case VIEWS.UPDATE_PASSWORD:
      return (
        <UpdatePasswordView
          onError={errorHandler(VIEWS.UPDATE_PASSWORD)}
          onSuccess={successHandler(VIEWS.UPDATE_PASSWORD)}
          title={title ?? translations.updatePassword}
          fields={{
            ...fields,
            password: {
              label: translations.newPassword,
              ...fields?.password,
            },
            confirmPassword: {
              label: translations.confirmPassword,
              ...fields?.confirmPassword,
            },
            submit: {
              children: translations.updatePasswordSubmit,
              ...fields?.submit,
            },
          }}
          {...rest}
        />
      )
    case VIEWS.OTP:
      return (
        <OtpView
          onError={errorHandler(VIEWS.OTP)}
          onSuccess={successHandler(VIEWS.OTP)}
          title={title ?? translations.otp}
          fields={{
            ...fields,
            otp: {
              label: translations.verificationCode,
              help: translations.otpHelp,
              ...fields?.otp,
            },
            submit: {
              children: translations.otpSubmit,
              ...fields?.submit,
            },
          }}
          {...rest}
        />
      )
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
    pt: 4,
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
