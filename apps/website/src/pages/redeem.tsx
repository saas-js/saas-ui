import { Box, Card, CardBody, Heading } from '@chakra-ui/react'
import { Container, Text, VStack } from '@chakra-ui/react'

import { useRouter } from 'next/router'

import Section from '@/components/marketing/section-wrapper'

import SEO from '@/components/seo'

import { RedeemForm } from '@/components/redeem-form'
import { Auth, AvailableProviders, useAuth } from '@saas-ui/auth'
import { FaDiscord, FaGoogle } from 'react-icons/fa6'

const providers: AvailableProviders = {
  google: {
    name: 'Google',
    icon: () => <FaGoogle size="1.1rem" color="#DB4437" />,
  },
  discord: {
    name: 'Discord',
    icon: () => <FaDiscord size="1.1rem" color="#7289da" />,
    scopes: 'guilds.join',
  },
}

const getAbsoluteUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return path
  }
  const url = new URL(path, window.location.origin)
  return url.toString() + window.location.search
}

const Redeem = () => {
  const router = useRouter()
  const auth = useAuth()

  let content
  if (auth.isAuthenticated) {
    content = (
      <Section>
        <VStack fontSize="lg" alignItems="center">
          <Heading as="h2" size="xl">
            Redeem your license key
          </Heading>
          <Text textAlign="center" color="muted">
            {router.query.sale_id
              ? 'Thanks for your purchase! Activate your license below.'
              : 'You can find your license key in the purchase confirmation e-mail.'}
          </Text>

          <Text textAlign="center" color="muted" mb="10">
            After activating you will get access to our private Github
            repository,
            <br />
            blocks and private Discord channels where you can get support.
          </Text>

          <RedeemForm maxW="xl" />
        </VStack>
      </Section>
    )
  } else {
    content = (
      <Section>
        <VStack alignItems="center">
          <Heading as="h2" size="xl">
            Redeem your license key
          </Heading>

          <Box as="p" textAlign="center" color="muted" mb="20">
            Please create an account or log in to continue
          </Box>

          <Card maxW="400px" w="full" mx="auto">
            <CardBody>
              <Auth
                providers={providers}
                view="signup"
                redirectUrl={getAbsoluteUrl('/redeem')}
              />
            </CardBody>
          </Card>
        </VStack>
      </Section>
    )
  }

  return (
    <Box>
      <SEO
        title="Redeem your license key"
        description="You can redeem your license key here."
        titleTemplate="%s - The frontend stack for SaaS companies"
      />

      <Box mb={8} w="full">
        <Box>
          <Container maxW="container.xl">{content}</Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Redeem

export async function getStaticProps() {
  return {
    props: {
      header: {
        position: 'fixed',
        variant: 'dark',
      },
    },
  }
}
