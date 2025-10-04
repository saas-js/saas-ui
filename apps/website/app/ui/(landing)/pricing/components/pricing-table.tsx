'use client'

import { useMemo } from 'react'

import { LinkButton } from '@/components/link-button'
import {
  Badge,
  Box,
  Grid,
  Heading,
  List,
  Separator,
  Span,
  Stack,
  Tabs,
  Text,
} from '@saas-ui/react'
import { TbCheck } from 'react-icons/tb'

export function PricingTable(props: { lastUpdated?: string | null }) {
  const { individual, team } = useMemo(() => {
    const lmsq =
      typeof window !== 'undefined' ? (window as any).LemonSqueezy : null

    const urls = {
      individual:
        'https://saas-ui.lemonsqueezy.com/checkout/buy/5c76854f-738a-46b8-b32d-932a97d477f5',
      team: 'https://saas-ui.lemonsqueezy.com/checkout/buy/bda4c7f4-e012-4956-96eb-e0efca6b91b0',
    }

    if (!lmsq || !lmsq?.Affiliate) {
      return {
        individual: urls.individual,
        team: urls.team,
      }
    }

    return {
      individual: lmsq.Affiliate.Build(urls.individual),
      team: lmsq.Affiliate.Build(urls.team),
    }
  }, [])

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
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Individuals
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            €197
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
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Teams
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            €597
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
