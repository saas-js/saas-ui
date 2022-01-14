import { Container, Stack, useTheme } from '@chakra-ui/react'
import * as React from 'react'

import { AuthProvider, Auth, AvailableProviders, OtpForm, User } from '../src'

import { FaGoogle, FaGithub } from 'react-icons/fa'

const authProvider = {
  onLogin: () =>
    Promise.resolve({ id: 1, email: 'hello@saas-ui.dev' } as unknown as User),
  onSignup: () =>
    Promise.resolve({ id: 1, email: 'hello@saas-ui.dev' } as unknown as User),
  onVerify: () => Promise.resolve(true),
}

export default {
  title: 'Components/Auth/Auth',
  decorators: [
    (Story: any) => (
      <AuthProvider {...authProvider}>
        <Container mt="40px">
          <Story />
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
export const basic = () => (
  <Stack width="md">
    <Auth />
  </Stack>
)

export const providers = () => (
  <Stack width="md">
    <Auth providers={availableProviders} />
  </Stack>
)

export const buttonColor = () => {
  const theme = useTheme()

  theme.components.LoginButton = {
    defaultProps: {
      colorScheme: 'primary',
    },
  }

  return (
    <Stack width="md">
      <Auth providers={availableProviders} />
    </Stack>
  )
}

export const password = () => (
  <Stack width="md">
    <Auth providers={availableProviders} type="password" />
  </Stack>
)

export const otp = () => (
  <Stack width="md">
    <OtpForm />
  </Stack>
)

export const signup = () => (
  <Stack width="md">
    <Auth providers={availableProviders} type="password" action="signup" />
  </Stack>
)
