import Logo from '@/components/saas-ui'
import SaasUIGlyph from '@/components/saas-ui-glyph'
import { Card, CardBody, Center, Container } from '@chakra-ui/react'
import { AvailableProviders, LoginView } from '@saas-ui/auth'
import { FaDiscord, FaGoogle } from 'react-icons/fa'

const providers: AvailableProviders = {
  google: {
    name: 'Google',
    icon: () => <FaGoogle size="1.1rem" color="#DB4437" />,
  },
  discord: {
    name: 'Discord',
    icon: () => <FaDiscord size="1.1rem" color="#7289da" />,
  },
}

export default function LoginPage() {
  return (
    <Center h="calc(100vh - 260px)">
      <Container maxW="container.sm" py="20">
        <Card>
          <CardBody>
            <Center py="8">
              <SaasUIGlyph width="48px" />
            </Center>
            <LoginView
              title="Log in to Saas UI"
              providers={providers}
              submitLabel="Log in with Email"
            />
          </CardBody>
        </Card>
      </Container>
    </Center>
  )
}
