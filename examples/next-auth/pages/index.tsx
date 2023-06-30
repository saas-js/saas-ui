import { Box, Button } from '@chakra-ui/react'
import { Loader, useAuth } from '@saas-ui/react'
import NextLink from 'next/link'

const IndexPage = () => {
  const { isLoggingIn, user, logOut } = useAuth()

  if (isLoggingIn) {
    return <Loader variant="fullscreen" />
  } else if (!user) {
    return (
      <Box>
        <NextLink href="/login" legacyBehavior>
          <Button>Log in</Button>
        </NextLink>
      </Box>
    )
  }

  return (
    <Box>
      Logged in as: {user.email}.{' '}
      <Button onClick={() => logOut()}>Log out</Button>
    </Box>
  )
}

export default IndexPage
