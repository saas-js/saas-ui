'use client'

import { Authenticated } from '@/components/Authenticated'
import { Box, Button } from '@chakra-ui/react'
import { useAuth } from '@saas-ui/auth'

export default function HomePage() {
  const { user, logOut } = useAuth()
  console.log('user', user)
  return (
    <Authenticated>
      <Box>
        Logged in as: {user?.email}.{' '}
        <Button onClick={() => logOut()}>Log out</Button>
      </Box>
    </Authenticated>
  )
}
