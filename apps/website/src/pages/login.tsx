import SaasUIGlyph from '@/components/saas-ui-glyph'
import { getAbsoluteUrl } from '@/utils/get-absolute-url'
import { Center, Container } from '@chakra-ui/react'
import { AvailableProviders, LoginView } from '@saas-ui/auth'
import { useSnackbar } from '@saas-ui/react'
import { useRouter } from 'next/router'
import { FaDiscord, FaGithub } from 'react-icons/fa'

const providers: AvailableProviders = {
  github: {
    name: 'Github',
    icon: () => <FaGithub size="1.1rem" />,
  },
  discord: {
    name: 'Discord',
    icon: () => <FaDiscord size="1.1rem" color="#7289da" />,
    scopes: 'guilds.join',
  },
}

export default function LoginPage() {
  const router = useRouter()

  const redirectUrl = router.query.redirectUrl?.toString() || ''

  const snackbar = useSnackbar()

  return (
    <Center h="calc(100vh - 260px)" minH="500px">
      <Container maxW="container.sm" py="20">
        <Center py="8">
          <SaasUIGlyph width="48px" />
        </Center>
        <LoginView
          title="Log in to Saas UI"
          providers={providers}
          redirectUrl={getAbsoluteUrl(redirectUrl)}
          onError={(e) => snackbar.error(e.message)}
          fields={{
            submit: {
              children: 'Log in with Email',
            },
          }}
        />
      </Container>
    </Center>
  )
}
