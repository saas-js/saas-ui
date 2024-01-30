'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Stack, Card, CardBody } from '@chakra-ui/react'
import { SaasUILogo } from '@saas-ui/assets'
import { Auth, AvailableProviders, useAuth } from '@saas-ui/auth'

import { FaGithub } from 'react-icons/fa'

const providers: AvailableProviders = {
  github: {
    icon: FaGithub,
    name: 'Github',
  },
}

export default function SignupPage() {
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
      <SaasUILogo width="120px" />
      <Card width="380px" maxW="container.md">
        <CardBody>
          <Auth providers={providers} type="magiclink" view="signup" />
        </CardBody>
      </Card>
    </Stack>
  )
}
