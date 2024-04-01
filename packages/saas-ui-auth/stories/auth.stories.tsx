import { Meta, StoryObj } from '@storybook/react'
import { Container, Text } from '@chakra-ui/react'
import * as React from 'react'

import {
  AuthProvider,
  Auth,
  AvailableProviders,
  User,
  AuthParams,
  AuthProviderProps,
  AuthProps,
} from '../src'

import { Field } from '@saas-ui/forms'

import { FaGoogle, FaGithub } from 'react-icons/fa'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from '@saas-ui/core'

const passwordSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required().label('Email'),
  password: Yup.string().min(4).required().label('Password'),
})

type CustomUser = {
  id: number
  email: string
}

const createAuthService = (): AuthProviderProps<CustomUser> => {
  let user: CustomUser | null = null
  return {
    onLogin: async (params: AuthParams) => {
      console.log('onLogin', params)
      const { email, password, provider } = params
      // email and provider login may return an empty object on success
      if (email && password) {
        user = { id: 1, email }
        return user
      } else if (
        (!email && !password && !provider) ||
        email === 'error@error.com'
      ) {
        throw new Error('Login failed')
      }
    },
    onSignup: async (params: AuthParams) => {
      if (params.email) {
        user = { id: 2, email: params.email }
        return user
      }
    },
    onVerifyOtp: async (params: AuthParams) => {
      return true // check if params.otp is valid
    },
    onLogout: async () => {
      user = null
    },
    onAuthStateChange: (callback) => {
      // Set up and event handler that calls `callback(user)` with the current user or undefined if the user is logged out
      return () => {
        // Remove the event handler
      }
    },
    onLoadUser: async () => {
      console.log('onLoadUser', user)
      return user
    },
    onGetToken: async () => {
      // return a session token if it's supported.
      console.log('onGetToken', user?.email)
      return user?.email
    },
    onResetPassword: async (params: AuthParams) => {
      // send a reset password email
    },
    onUpdatePassword: async (params: AuthParams) => {
      // update the user's password, eg after sending a reset password email
    },
  }
}

const authProvider = createAuthService()

export default {
  title: 'Components/Auth/Auth',
  component: Auth,
  decorators: [
    (StoryFn: any) => (
      <AuthProvider {...authProvider}>
        <Container mt="40px" width="md">
          <StoryFn />
        </Container>
      </AuthProvider>
    ),
  ],
} as Meta

type Story = StoryObj<AuthProps>

const availableProviders: AvailableProviders = {
  google: {
    icon: FaGoogle,
    name: 'Google',
  },
  github: {
    icon: FaGithub,
    name: 'Github',
  },
}

export const Basic: Story = {}

export const Providers: Story = {
  args: {
    providers: availableProviders,
  },
}

export const ButtonColor: Story = {
  args: {
    providers: availableProviders,
    fields: {
      submit: {
        variant: 'solid',
        colorScheme: 'cyan',
      },
    },
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    fields: {
      email: {
        rules: {
          required: 'Email is a required field',
        },
      },
      password: {
        rules: {
          required: 'Password is a required field',
          minLength: {
            value: 4,
            message: 'Password must be at least 4 characters',
          },
        },
      },
    },
  },
}

export const Otp: Story = {
  args: {
    view: 'otp',
  },
}

export const Signup: Story = {
  args: {
    type: 'password',
    view: 'signup',
  },
}

export const SignupWithCustomFields: Story = {
  render() {
    return (
      <Auth providers={availableProviders} type="password" view="signup">
        <Field name="company" label="Company" rules={{ required: true }} />
        <Text fontSize="md" color="muted">
          By signing up your agree to our terms and conditions.
        </Text>
      </Auth>
    )
  },
}

export const ForgotPassword: Story = {
  args: {
    view: 'forgot_password',
  },
}

export const UpdatePassword: Story = {
  args: {
    view: 'update_password',
  },
}

export const ErrorHandler: Story = {
  render: () => {
    const snackbar = useSnackbar()

    return (
      <Auth
        title="Type error@error.com to show an error"
        onError={(view, error) => {
          if (view === 'login' && error) {
            snackbar.error(error.message)
          }
        }}
      />
    )
  },
}

export const SuccessHandler: Story = {
  render: () => {
    const snackbar = useSnackbar()

    return (
      <Auth
        onSuccess={(view, data) => {
          if (view === 'login') {
            snackbar.success('Login succesful')
          }
        }}
      />
    )
  },
}

export const Translations: Story = {
  args: {
    type: 'password',
    providers: availableProviders,
    translations: {
      signup: 'Aanmelden',
      signupSubmit: 'Aanmelden',
      login: 'Inloggen',
      loginSubmit: 'Inloggen',
      forgotPassword: 'Wachtwoord vergeten?',
      forgotPasswordSubmit: 'Stuur reset link',
      updatePassword: 'Wachtwoord wijzigen',
      updatePasswordSubmit: 'Wachtwoord opslaan',
      backToLogin: 'Terug naar inloggen',
      noAccount: 'Nog geen account?',
      haveAccount: 'Reeds aangemeld?',
      otpSubmit: 'Verifiëren',
      continueWith: 'Doorgaan met',
      orContinueWith: 'of doorgaan met',
      email: 'E-mail',
      password: 'Wachtwoord',
    },
  },
}
