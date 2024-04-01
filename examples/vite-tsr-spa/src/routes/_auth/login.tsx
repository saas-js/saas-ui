import { Center, Container } from '@chakra-ui/react'
import { LoginView } from '@saas-ui/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: Login,
})

function Login() {
  return (
    <Container maxW="container.sm" mx="auto">
      <Center minH="$100vh">
        <LoginView />
      </Center>
    </Container>
  )
}
