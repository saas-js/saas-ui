import { supabase } from '@/lib/supabase'
import { Center, Container } from '@chakra-ui/react'
import { LoadingOverlay, LoadingSpinner, LoadingText } from '@saas-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CliPage() {
  const router = useRouter()

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )

  async function exchangeToken() {
    const url = new URL(`http://localhost:${router.query.port}`)

    console.log(url.toString())

    const session = await supabase.auth.getSession()

    if (!session.data.session?.access_token) {
      url.pathname = '/cancel'
      router.push(url)
      return
    }

    url.pathname = '/callback'
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.data.session?.access_token}`,
      },
    })

    if (response.ok) {
      url.pathname = '/success'
      router.push(url)
      setStatus('success')
    } else {
      url.pathname = '/error'
      router.push(url)
      setStatus('error')
    }
  }

  useEffect(() => {
    if (router.isReady) {
      exchangeToken()
    }
  }, [router.isReady])

  return (
    <Center h="calc(100vh - 260px)" minH="500px">
      <Container maxW="container.sm" py="20">
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>Logging you in</LoadingText>
        </LoadingOverlay>
      </Container>
    </Center>
  )
}
