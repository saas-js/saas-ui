'use client'

import { LinkButton } from '@/components/link-button'
import {
  Badge,
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  List,
  Separator,
  Span,
  Stack,
  Tabs,
  Text,
} from '@saas-ui/react'
import { BsDiscord } from 'react-icons/bs'
import { TbBlocks, TbCheck, TbHeartHandshake } from 'react-icons/tb'

export function PricingTable(props: { lastUpdated?: string | null }) {
  return (
    <Stack gap="0">
      <Tabs.Root variant="enclosed" defaultValue="nextjs" position="static">
        <Tabs.List>
          <Tabs.Trigger value="nextjs">Next.js</Tabs.Trigger>
          <Tabs.Trigger value="tanstack-start">Tanstack Start</Tabs.Trigger>
          <Tabs.Trigger value="all-access">
            All access <Badge colorPalette="accent">40%+ off</Badge>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.ContentGroup>
          <Tabs.Content value="tanstack-start">
            <PricingTableTanstackStart lastUpdated={props.lastUpdated} />
          </Tabs.Content>
          <Tabs.Content value="nextjs">
            <PricingTableNextjs lastUpdated={props.lastUpdated} />
          </Tabs.Content>
          <Tabs.Content value="all-access">
            <PricingTableAllAccess lastUpdated={props.lastUpdated} />
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>

      <Grid
        borderStyle="dashed"
        borderWidth="1px"
        templateColumns={{
          base: '1fr',
          lg: 'repeat(3, 1fr)',
        }}
        p="12"
        gap="12"
        mb="12"
      >
        <GridItem>
          <HStack alignItems="center" mb="1">
            <BsDiscord />
            <Heading as="h5" textStyle="md" fontWeight="medium">
              Private Discord
            </Heading>
          </HStack>
          <Text textStyle="sm" color="fg.subtle">
            Get expert help and support from the Saas.js team and community.
          </Text>
        </GridItem>
        <GridItem>
          <HStack alignItems="center" mb="1">
            <TbHeartHandshake />
            <Heading as="h5" textStyle="md" fontWeight="medium">
              160+ hours saved
            </Heading>
          </HStack>
          <Text textStyle="sm" color="fg.subtle">
            Skip the boilerplate and focus on what makes your product unique.
          </Text>
        </GridItem>
        <GridItem>
          <HStack alignItems="center" mb="1">
            <TbBlocks />
            <Heading as="h5" textStyle="md" fontWeight="medium">
              Architecture that scales
            </Heading>
          </HStack>
          <Text textStyle="sm" color="fg.subtle">
            Built on 20 years of experience, Saas.js is designed to scale.
          </Text>
        </GridItem>
      </Grid>
    </Stack>
  )
}

const products = {
  allAccess: {
    single: 'a7e3b6dd-1054-480e-82ce-722b747cce90',
    team: '01fc3405-c2d0-43e8-995d-e6ec656b7a99',
  },
  nextjs: {
    single: '38a826b4-2ddf-4a6a-8127-ff5947a1960c',
    team: '9c011d4c-f8e6-439d-b76f-f4340282af1b',
  },
  tanstackStart: {
    single: '0032394c-c572-47b9-9cf0-ecfb8e1b42a3',
    team: '60764372-7039-4734-a402-b6e608b9bf9d',
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

export function PricingTableAllAccess(props: { lastUpdated?: string | null }) {
  const { individual, team } = useCheckoutUrls('allAccess')

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
          p="12"
          lg={{
            borderLeftWidth: '1px',
            borderStyle: 'dashed',
          }}
        >
          <Text fontSize="sm" color="fg.subtle">
            Single license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Individuals
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $457
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              Single developer license for unlimited self-hosted projects.
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item fontWeight="medium">
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                All starter kits
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Saas UI Pro blocks and templates
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

          <LinkButton
            variant="glass"
            colorPalette="accent"
            width="full"
            href={individual}
          >
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
          p="12"
        >
          <Text fontSize="sm" color="fg.subtle">
            Team license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Teams
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $897
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

          <LinkButton
            variant="glass"
            colorPalette="accent"
            width="full"
            href={team}
          >
            Buy now
          </LinkButton>
        </Box>

        <Box
          textStyle="md"
          p="12"
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
            Starting at $1000/month
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

          <LinkButton href="mailto:hello@saas-ui.dev" width="full">
            Get in touch
          </LinkButton>
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

export function PricingTableTanstackStart(props: {
  lastUpdated?: string | null
}) {
  const { individual, team } = useCheckoutUrls('tanstackStart')

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
          p="12"
          lg={{
            borderLeftWidth: '1px',
            borderStyle: 'dashed',
          }}
        >
          <Text fontSize="sm" color="fg.subtle">
            Single license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Individuals
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $297
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              Single developer license for unlimited self-hosted projects.
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item fontWeight="medium">
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Tanstack Start kit
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
              <List.Item>
                <br />
              </List.Item>
            </List.Root>
          </Box>

          <LinkButton
            variant="glass"
            colorPalette="accent"
            width="full"
            href={individual}
          >
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
          p="12"
        >
          <Text fontSize="sm" color="fg.subtle">
            Team license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Teams
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $747
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

          <LinkButton
            variant="glass"
            colorPalette="accent"
            width="full"
            href={team}
          >
            Buy now
          </LinkButton>
        </Box>

        <Box
          textStyle="md"
          p="12"
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
            Starting at $1000/month
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

          <LinkButton href="mailto:hello@saas-ui.dev" width="full">
            Get in touch
          </LinkButton>
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

export function PricingTableNextjs(props: { lastUpdated?: string | null }) {
  const { individual, team } = useCheckoutUrls('nextjs')

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
          p="12"
          lg={{
            borderLeftWidth: '1px',
            borderStyle: 'dashed',
          }}
        >
          <Text fontSize="sm" color="fg.subtle">
            Single license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Individuals
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $297
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              Single developer license for unlimited self-hosted projects.
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item fontWeight="medium">
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Next.js starter kit
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
              <List.Item>
                <br />
              </List.Item>
            </List.Root>
          </Box>

          <LinkButton
            variant="glass"
            colorPalette="accent"
            width="full"
            href={individual}
          >
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
          p="12"
        >
          <Text fontSize="sm" color="fg.subtle">
            Team license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Teams
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $747
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

          <LinkButton
            variant="glass"
            colorPalette="accent"
            width="full"
            href={team}
          >
            Buy now
          </LinkButton>
        </Box>

        <Box
          textStyle="md"
          p="12"
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
            Starting at $1000/month
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

          <LinkButton href="mailto:hello@saas-ui.dev" width="full">
            Get in touch
          </LinkButton>
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
