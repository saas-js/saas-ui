import { Stack } from '@chakra-ui/react'
import {
  Auth,
  AvailableProviders,
  Card,
  CardBody,
  useAuth,
} from '@saas-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

import { FaGithub } from 'react-icons/fa'
import { Logo } from '../components/Logo'

const providers: AvailableProviders = {
  github: {
    icon: FaGithub,
    name: 'Github',
  },
}

const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

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
          <Auth providers={providers} method="magic" />
        </CardBody>
      </Card>
    </Stack>
  )
}

export default LoginPage
