import SaasUIGlyph from '@/components/saas-ui-glyph'
import { Center, Container } from '@chakra-ui/react'
import { AvailableProviders, LoginView } from '@saas-ui/auth'
import { useSnackbar } from '@saas-ui/react'
import { useRouter } from 'next/router'
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

const getAbsoluteUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return path
  }
  const url = new URL(path, window.location.origin)
  return url.toString()
}

export default function LoginPage() {
  const router = useRouter()

  const redirectUrl = router.query.redirectUrl?.toString() || ''

  const snackbar = useSnackbar()

  return (
    <Center h="calc(100vh - 260px)">
      <Container maxW="container.sm" py="20">
        <Center py="8">
          <SaasUIGlyph width="48px" />
        </Center>
        <LoginView
          title="Log in to Saas UI"
          providers={providers}
          submitLabel="Log in with Email"
          redirectUrl={getAbsoluteUrl(redirectUrl)}
          onError={(e) => snackbar.error(e.message)}
        />
      </Container>
    </Center>
  )
}
