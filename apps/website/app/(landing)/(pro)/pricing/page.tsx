import { ActionArrow } from '@/components/action-arrow'
import { LinkButton } from '@/components/link-button'
import { CustomersSection } from '@/components/site/customers.section'
import { Octokit } from '@octokit/rest'
import {
  Accordion,
  Box,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
} from '@saas-ui/react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { PricingTable } from './components/pricing-table'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pricing for the Pro plan',
}

export default async function Page() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN,
  })

  const nextjs = await octokit.repos.get({
    owner: 'saas-js',
    repo: 'saas-ui-pro-nextjs-starter-kit',
  })

  const tanstack = await octokit.repos.get({
    owner: 'saas-js',
    repo: 'vite-tanstack-router-starter-kit',
  })

  const nextjsUpdated = nextjs?.data.updated_at
    ? new Date(nextjs.data.updated_at)
    : null
  const tanstackUpdated = tanstack?.data.updated_at
    ? new Date(tanstack.data.updated_at)
    : null

  const dates = [nextjsUpdated, tanstackUpdated].filter(Boolean)

  const latestUpdate =
    dates.length > 0
      ? Math.max(...dates.map((date) => date!.getTime()))
      : new Date().getTime()

  return (
    <Stack gap="12">
      <Container maxW="6xl" position="static">
        <Hero />

        <PricingTable
          lastUpdated={new Date(latestUpdate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        />

        <CustomersSection />
      </Container>

      <Benefits />

      <FAQ />
    </Stack>
  )
}

function Hero() {
  return (
    <Stack mt="24" pt="12" alignItems="flex-start" gap="4">
      <Box
        as="span"
        fontSize="xs"
        borderWidth="1px"
        borderRadius="full"
        px="2"
        py="0.5"
        fontWeight="medium"
        textAlign="center"
      >
        Pricing
      </Box>
      <Stack gap="5" maxW="4xl" alignItems="center" mb="8">
        <Heading
          as="h1"
          fontSize="4xl"
          lineHeight="1"
          textWrap="balance"
          maxW="md"
        >
          Find the right plan for your needs
        </Heading>
      </Stack>
    </Stack>
  )
}

function FAQ() {
  return (
    <Container maxW="6xl" py="20">
      <HStack gap="20" alignItems="flex-start">
        <Stack flex="1" alignItems="flex-start" pt="2">
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Frequently asked questions
          </Heading>

          <Text fontWeight="medium" color="fg.subtle">
            Can't find what you're looking for? Join our Discord community.
          </Text>

          <ButtonGroup>
            <LinkButton
              href="/discord"
              variant="plain"
              colorPalette="accent"
              size="lg"
            >
              Join Discord <ActionArrow />
            </LinkButton>
          </ButtonGroup>
        </Stack>

        <Stack gap="4" flex="1">
          <Accordion.Root width="full" collapsible>
            <Accordion.Item value="1">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                How many products can I use Saas UI Pro for?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                The individual license can be used for unlimited self hosted
                SaaS products or internal tools and maximum one client project.
                You can buy as many licenses as you need. The unlimited license
                does not have any restrictions.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="2">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                Does Saas UI include Figma, Sketch or other design files?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                Yes, we have a free Figma community and a Pro libary,{' '}
                <Link href="/pro/figma">more information.</Link>
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="3">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                What does the lifetime access mean?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                The Saas UI Pro license is perpetual, you will have access to
                all assets of the Saas UI Pro library forever.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="4">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                Do you offer refunds?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                No, due to the nature of the product being a digital download we
                do not offer refunds. We encourage you to try to open source and
                free components and read through the Pro documentation carefully
                to see if the product is a good fit.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="4">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                Do you offer support?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                Once you sign up you get access to our Discord community, where
                you can ask questions, report bugs or feature requests and get
                help from other customers. If you require more specialised
                support or consultancy contact us at hello@saas-ui.dev
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Stack>
      </HStack>
    </Container>
  )
}

function Benefits() {
  return (
    <Box
      position="relative"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderStyle="dashed"
    >
      <Container maxW="6xl" position="static">
        <HStack>
          <Stack flex="1">
            <Stack py="20" gap="8">
              <Heading
                as="h3"
                fontSize="6xl"
                lineHeight="1"
                fontWeight="medium"
              >
                Build, launch, and scale with Saas UI Pro
              </Heading>

              <Text fontWeight="medium" color="fg.subtle">
                Saas UI Pro is a comprehensive solution for building, launching
                and scaling your SaaS. It includes everything you need to build
                a professional and scalable SaaS.
              </Text>
            </Stack>
          </Stack>
          <Stack
            borderLeftWidth="1px"
            borderStyle="dashed"
            flex="1"
            display={{
              base: 'none',
              md: 'flex',
            }}
          ></Stack>
        </HStack>
      </Container>
    </Box>
  )
}
