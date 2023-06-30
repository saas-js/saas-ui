import { Container, Text } from '@chakra-ui/react'
import * as React from 'react'

import {
  AuthProvider,
  Auth,
  AvailableProviders,
  User,
  AuthParams,
  AuthProviderProps,
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

const authProvider: AuthProviderProps<any> = {
  onLogin: async (params: AuthParams) => {
    console.log('onLogin', params)
    const { email, password, provider } = params
    // email and provider login may return an empty object on success
    let response = {}
    if (email && password) {
      response = { id: 1, email }
    } else if (
      (!email && !password && !provider) ||
      email === 'error@error.com'
    ) {
      throw new Error('Login failed')
    }

    return {
      id: 1,
      email,
    } as unknown as User
  },
  onSignup: async (params: AuthParams) => {
    const { email } = params
    return { id: 1, email } as unknown as User
  },
  onVerifyOtp: async () => true,
  onResetPassword: async (params: AuthParams) => true,
  onUpdatePassword: async (params: AuthParams) => true,
}

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
}

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

export const Basic = {}

export const Providers = {
  args: {
    providers: availableProviders,
  },
}

export const ButtonColor = {
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

export const Password = {
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

export const Otp = {
  args: {
    view: 'otp',
  },
}

export const Signup = {
  args: {
    type: 'password',
    view: 'signup',
  },
}

export const SignupWithCustomFields = {
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

export const ForgotPassword = {
  args: {
    view: 'forgot_password',
  },
}

export const UpdatePassword = {
  args: {
    view: 'update_password',
  },
}

export const ErrorHandler = {
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
