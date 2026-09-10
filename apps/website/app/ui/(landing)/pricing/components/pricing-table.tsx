'use client'

import { LinkButton } from '@/components/link-button'
import { Box, Grid, Heading, List, Separator, Span, Stack, Text } from '@chakra-ui/react'
import { TbCheck } from 'react-icons/tb'

const products = {
  pro: {
    single: '55ee6a38-3908-4263-ada3-3b99fd68b680',
    team: 'cc80aed7-78f5-4da2-a0d8-e65da2c9e837',
  },
} as const

function buildUrl(productId: string) {
  const referralId =
    typeof window !== 'undefined' ? (window as any).affonso_referral : null

  const query = new URLSearchParams()

  const metadata = referralId
    ? JSON.stringify({
        affonso_referral: referralId,
      })
    : null

  query.set('products', productId)

  if (metadata) {
    query.set('metadata', metadata)
  }

  query.set('discountId', '33cd49c1-d823-4648-9516-cb8281ab8f87')

  const url = new URL(
    '/checkout',
    process.env.NEXT_PUBLIC_URL ?? process.env.VERCEL_URL,
  )

  url.search = query.toString()

  return url.toString()
}

function useCheckoutUrls(productType: keyof typeof products) {
  const ids = products[productType]

  return {
    individual: buildUrl(ids.single),
    team: buildUrl(ids.team),
  }
}

export function PricingTable(props: { lastUpdated?: string | null }) {
  const { individual, team } = useCheckoutUrls('pro')

  return (
    <Stack>
      <Separator
        position="absolute"
        left="0"
        width="100vw"
        borderStyle="dashed"
      />
      <Separator
        position="absolute"
        left="0"
        transform="translateY(135px)"
        width="100vw"
        borderStyle="dashed"
      />
      <Grid
        templateColumns={{
          base: '1fr',
          lg: 'repeat(3, 1fr)',
        }}
        gap="0"
        w="full"
      >
        <Box
          textStyle="md"
          p="10"
          lg={{
            borderLeftWidth: '1px',
            borderStyle: 'dashed',
          }}
        >
          <Text fontSize="sm" color="fg.subtle">
            Single license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium" mb="2">
            Individuals
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $173 {` `}
            <Span as="sup" textDecoration="line-through" textStyle="sm">
              $247
            </Span>
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              Single developer license for unlimited self-hosted projects.
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Pro blocks and templates
              </List.Item>

              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Private Discord community
              </List.Item>

              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                <Span>
                  Life-time access{' '}
                  <Span textStyle="xs" color="fg.muted">
                    (Updated {props.lastUpdated})
                  </Span>
                </Span>
              </List.Item>
            </List.Root>
          </Box>

          <LinkButton variant="glass" colorPalette="accent" href={individual}>
            Buy now
          </LinkButton>
        </Box>
        <Box
          textStyle="md"
          lg={{
            borderLeftWidth: '1px',
            borderRightWidth: '1px',
            borderStyle: 'dashed',
          }}
          p="10"
        >
          <Text fontSize="sm" color="fg.subtle">
            Team license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium" mb="2">
            Teams
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $418 {` `}
            <Span as="sup" textDecoration="line-through" textStyle="sm">
              $597
            </Span>
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              For teams up to 10 developers and unlimited projects.
            </Text>

            <Text fontWeight="medium" mb="2">
              Everything in Individual plan, plus:
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Priority support and feature requests
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                <Span>
                  Life-time access{' '}
                  <Span textStyle="xs" color="fg.muted">
                    (Updated {props.lastUpdated})
                  </Span>
                </Span>
              </List.Item>
            </List.Root>
          </Box>

          <LinkButton variant="glass" colorPalette="accent" href={team}>
            Buy now
          </LinkButton>
        </Box>

        <Box
          textStyle="md"
          p="10"
          lg={{
            borderRightWidth: '1px',
            borderStyle: 'dashed',
          }}
        >
          <Text fontSize="sm" color="fg.subtle">
            Custom
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Enterprise
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            Starting at €1000/month
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              Customized plans for organizations who want to move fast.
            </Text>

            <Text fontWeight="medium" mb="2">
              Everything in Team plan, plus:
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Unlimited developers
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Dedicated support channel
              </List.Item>
            </List.Root>
          </Box>

          <LinkButton href="">Get in touch</LinkButton>
        </Box>
      </Grid>
      <Separator
        position="absolute"
        left="0"
        width="100vw"
        borderStyle="dashed"
      />
    </Stack>
  )
}
