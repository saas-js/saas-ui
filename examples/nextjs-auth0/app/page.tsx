'use client'

import { Box, Button } from '@chakra-ui/react'
import { useAuth, Authenticated } from '@saas-ui/auth'

export default function HomePage() {
  const { user, logIn, logOut } = useAuth()

  return (
    <Authenticated
      onUnauthenticated={() => console.log('unauthenticated')}
      fallback={({ isLoading }) => {
        if (isLoading) {
          return <Box>Loading...</Box>
        }

        return (
          <Button onClick={() => logIn({})} variant="primary">
            Log in
          </Button>
        )
      }}
    >
      <Box>
        Logged in as: {user?.email}.{' '}
        <Button onClick={() => logOut()}>Log out</Button>
      </Box>
    </Authenticated>
  )
}
