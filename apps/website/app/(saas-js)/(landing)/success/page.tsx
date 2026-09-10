import { Container, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { Polar } from '@polar-sh/sdk'
import { redirect } from 'next/navigation'

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN ?? '',
})

export default async function SuccessPage(props: {
  searchParams: Promise<{ checkout_id: string; customer_session_token: string }>
}) {
  const { checkout_id } = await props.searchParams

  const checkout = await polar.checkouts.get({
    id: checkout_id,
  })

  if (!checkout) {
    throw redirect('/')
  }

  return (
    <Container maxW="4xl">
      <VStack py="20" gap="10" minH="50vh">
        <Stack width="full" alignItems="flex-start">
          <Heading size="4xl" mb="2">
            Thanks for your purchase
          </Heading>

          <Text>
            Please check your email for instructions on how to access your
            purchase.
          </Text>
        </Stack>
      </VStack>
    </Container>
  )
}
