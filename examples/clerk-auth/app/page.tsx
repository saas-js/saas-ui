'use client'

import { Box, Button, Center } from '@chakra-ui/react'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'
import { useAuth } from '@saas-ui/auth'
import NextLink from 'next/link'

const IndexPage = () => {
  const { isLoggingIn, user, logOut } = useAuth()

  if (isLoggingIn) {
    return (
      <LoadingOverlay variant="fullscreen">
        <LoadingSpinner />
      </LoadingOverlay>
    )
  } else if (!user) {
    return (
      <Center h="$100vh">
        <NextLink href="/login" legacyBehavior>
          <Button variant="primary" size="lg">
            Log in
          </Button>
        </NextLink>
      </Center>
    )
  }

  return (
    <Center h="$100vh">
      Logged in as: {user.email}.{' '}
      <Button onClick={() => logOut()}>Log out</Button>
    </Center>
  )
}

export default IndexPage
