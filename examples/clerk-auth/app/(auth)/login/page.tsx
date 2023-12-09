'use client'

import { Stack, Card, CardBody } from '@chakra-ui/react'
import { Auth, AvailableProviders, useAuth } from '@saas-ui/auth'
import { useRouter } from 'next/navigation'
import React from 'react'

import { FaGoogle } from 'react-icons/fa'
import { Logo } from '../../../components/Logo'
import { useSnackbar } from '@saas-ui/react'

const providers: AvailableProviders = {
  google: {
    icon: FaGoogle,
    name: 'Google',
  },
}

const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const snackbar = useSnackbar()

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated])

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      spacing="10"
    >
      <Logo width="120px" />
      <Card width="380px" maxW="container.md">
        <CardBody>
          <Auth
            providers={providers}
            type="password"
            onError={(view, error) => {
              console.log(view, error)
              switch (view) {
                case 'login':
                  snackbar.error(error.message || 'Login failed')
                  break
                case 'signup':
                  snackbar.error(error.message || 'Signup failed')
                  break
              }
            }}
          />
        </CardBody>
      </Card>
    </Stack>
  )
}

export default LoginPage
