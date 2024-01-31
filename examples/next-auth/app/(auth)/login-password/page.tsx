'use client'

import { Stack, Card, CardBody } from '@chakra-ui/react'
import { Auth, useAuth } from '@saas-ui/auth'
import { useRouter } from 'next/navigation'
import React from 'react'

import { SaasUILogo } from '@saas-ui/assets'

export default function LoginPage() {
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
          <Auth type="password" />
        </CardBody>
      </Card>
    </Stack>
  )
}
