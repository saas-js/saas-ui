import { Container, Stack, Text, useTheme } from '@chakra-ui/react'
import * as React from 'react'

import { StoryFn } from '@storybook/react'

import {
  AuthProvider,
  Auth,
  AvailableProviders,
  OtpForm,
  User,
  AuthParams,
  ForgotPasswordView,
  UpdatePasswordView,
  AuthProviderProps,
  AuthProps,
  useAuth,
} from '../src'

import { Field } from '@saas-ui/forms'

import { FaGoogle, FaGithub } from 'react-icons/fa'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
    } else if (!email && !password && !provider) {
      throw new Error('Login failed')
    }

    return {
      id: 1,
      email,
    } as unknown as User
  },
  onSignup: async (params: AuthParams) => {
    console.log('onSignup', params)
    const { email } = params
    return { id: 1, email } as unknown as User
  },
  onVerifyOtp: async () => true,
  onResetPassword: async (params: AuthParams) => true,
  onUpdatePassword: async (params: AuthParams) => true,
}

export default {
  title: 'Components/Auth/Auth',
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

const Template: StoryFn<AuthProps> = (args) => <Auth {...args} />

export const Basic = Template.bind({})

export const Providers = Template.bind({})
Providers.args = {
  providers: availableProviders,
}

export const ButtonColor = () => {
  const theme = useTheme()

  theme.components.LoginButton = {
    defaultProps: {
      variant: 'solid',
      colorScheme: 'cyan',
    },
  }

  return (
    <Stack width="md">
      <Auth providers={availableProviders} />
    </Stack>
  )
}

export const Password = Template.bind({})
Password.args = {
  type: 'password',
}

export const Otp = Template.bind({})
Otp.args = {
  view: 'otp',
}

export const Signup = Template.bind({})
Signup.args = {
  type: 'password',
  view: 'signup',
}

export const SignupWithCustomFields = () => (
  <Auth providers={availableProviders} type="password" view="signup">
    <Field name="company" label="Company" rules={{ required: true }} />
    <Text fontSize="md" color="muted">
      By signing up your agree to our terms and conditions.
    </Text>
  </Auth>
)

export const ForgotPassword = Template.bind({})
ForgotPassword.args = {
  view: 'forgot_password',
}

export const UpdatePassword = Template.bind({})
UpdatePassword.args = {
  view: 'update_password',
}
