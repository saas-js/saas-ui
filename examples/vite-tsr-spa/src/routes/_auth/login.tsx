import { Center, Container } from '@chakra-ui/react'
import { LoginView } from '@saas-ui/auth'
import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/_auth/login').createRoute({
  component: Login,
})

function Login() {
  return (
    <Container maxW="container.sm" mx="auto">
      <Center minH="$100vh">
        <LoginView redirectUrl="http://localhost:5173/getting_started" />
      </Center>
    </Container>
  )
}
