import * as React from 'react'

import {
  chakra,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useMultiStyleConfig,
  SystemStyleObject,
  createStylesContext,
  Divider,
  HStack,
  Text,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

import { FieldErrors } from '@saas-ui/forms'

import { Providers, AvailableProviders } from './forms/providers'
import { AuthTypeEnum, AuthActionEnum, useAuth } from '../provider'

const [StylesProvider, useStyles] = createStylesContext('SuiAuthForm')

export interface AuthViewOptions {
  /**
   * The submit action, `logIn` or `signUp`
   */
  action?: AuthActionEnum
  /**
   * The authentication type, `magiclink` or `password`
   */
  type?: AuthTypeEnum
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

export interface AuthFormOptions {
  /**
   * The form title
   */
  title?: React.ReactNode
  /**
   * The authentication type, `magiclink` or `password`
   */
  type?: AuthTypeEnum
  /**
   * List of OAuth providers
   */
  providers?: AvailableProviders
  /**
   * The redirect URL after successful OAuth login
   * @deprecated Use `redirectUrl` instead
   */
  oauthRedirectUrl?: string
  /**
   * The redirecet URL after succesful magic link or password login
   */
  redirectUrl?: string
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
   * The child component
   */
  children?: React.ReactNode
  /**
   * Render custom elements under the submit button
   */
  footer?: React.ReactNode
}

export interface AuthFormContainerProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'SuiAuthForm'> {}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig('SuiAuthForm', props)

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
        className={cx('sui-auth-form', props.className)}
      >
        {children}
      </chakra.div>
    </StylesProvider>
  )
}

AuthFormContainer.displayName = 'AuthFormContainer'

export interface AuthFormDividerProps {
  label?: string
}

export const AuthFormDivider: React.FC<AuthFormDividerProps> = (props) => {
  const { label, ...rest } = props
  const styles = useStyles()

  return (
    <HStack color="muted" fontSize="sm" my="4">
      <Divider {...rest} sx={styles.divider} />
      <Text flexShrink="0">{label}</Text>
      <Divider {...rest} sx={styles.divider} />
    </HStack>
  )
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
      className={cx('sui-auth-form__title', rest.className)}
    >
      {children}
    </chakra.h2>
  )
}

AuthFormTitle.displayName = 'AuthFormTitle'
