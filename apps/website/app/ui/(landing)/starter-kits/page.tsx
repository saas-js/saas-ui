import { ActionArrow } from '@/components/action-arrow'
import { LinkButton } from '@/components/link-button'
import { GetStartedSection } from '@/components/site/get-started.section'
import { Subheading } from '@/components/site/typography'
import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  Container,
  HStack,
  Heading,
  List,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { TbCheck } from 'react-icons/tb'

export const metadata: Metadata = {
  title: 'SaaS Starter Kits',
  description:
    'Production-ready SaaS starter kits for TanStack Start and Next.js with Better Auth, Stripe billing, multi-tenant workspaces, tRPC, and Saas UI — now available at saas-js.com.',
  openGraph: {
    images: '/og?site=sui&title=SaaS%20Starter%20Kits',
  },
}

const kits = [
  {
    name: 'TanStack Start Starter Kit',
    badge: 'Vite + TanStack Router',
    logo: '/img/frameworks/tanstack.svg',
    logoAlt: 'TanStack Start logo',
    description:
      'A full-stack SaaS boilerplate on TanStack Start with typed search params, isomorphic functions, nested routing, and universal deployment.',
    highlights: [
      'Typed search params and nested workspace routing',
      'Full-document SSR for marketing, client-side app shell',
      'Better Auth, Stripe billing, multi-tenant workspaces',
      'PostgreSQL + Drizzle ORM + end-to-end typed tRPC',
    ],
    href: 'https://www.saas-js.com',
    docsHref: 'https://www.saas-js.com/docs/starter-kits/tanstack-start',
    cta: 'Explore TanStack Start kit',
  },
  {
    name: 'Next.js Starter Kit',
    badge: 'App Router',
    logo: '/img/frameworks/nextjs.svg',
    logoAlt: 'Next.js logo',
    description:
      'A production-ready SaaS boilerplate on Next.js App Router with server-prefetched tRPC queries, Turbopack, and built-in SEO.',
    highlights: [
      'App Router with server-prefetched tRPC queries',
      'Fast local development with Turbopack',
      'Better Auth, Stripe billing, multi-tenant workspaces',
      'PostgreSQL + Drizzle ORM + Playwright & Vitest in CI',
    ],
    href: 'https://www.saas-js.com/nextjs',
    docsHref: 'https://www.saas-js.com/docs/starter-kits/nextjs',
    cta: 'Explore Next.js kit',
  },
]

const stackItems = [
  {
    title: 'Authentication',
    tech: 'Better Auth',
    description:
      'Email and password, social login, magic links, 2FA, passkeys, SSO, and email verification out of the box.',
  },
  {
    title: 'Billing',
    tech: 'Stripe',
    description:
      'Subscriptions, tiered, metered, and usage-based pricing, entitlements, grandfathering, and webhooks.',
  },
  {
    title: 'Multi-tenant workspaces',
    tech: 'Scoped data layer',
    description:
      'Workspaces, teammate invites, roles, and actor-based scope filters so queries stay tenant-isolated by default.',
  },
  {
    title: 'Database & API',
    tech: 'PostgreSQL + Drizzle + tRPC',
    description:
      'Typed schema, migrations, seeding, and end-to-end type-safe API routes with React Query integration.',
  },
  {
    title: 'UI & Dashboard shell',
    tech: 'Saas UI + Chakra UI',
    description:
      'Navigation, data tables, filters, forms, and empty states styled with themeable tokens and Storybook stories.',
  },
  {
    title: 'Email & Testing',
    tech: 'React Email + Playwright + Vitest',
    description:
      'Editable transactional email templates with Resend, plus end-to-end and unit tests running in GitHub Actions.',
  },
]

export default function StarterKitsPage() {
  return (
    <>
      <Box as="section" pt="24" pb="16">
        <Container maxW="6xl">
          <Stack alignItems="center" textAlign="center" gap="6">
            <Badge variant="outline" size="lg" colorPalette="accent">
              Now available at saas-js.com
            </Badge>

            <Stack gap="4" maxW="4xl" alignItems="center">
              <Heading
                as="h1"
                textStyle={{ base: '4xl', md: '6xl' }}
                lineHeight="1.08"
                textWrap="balance"
              >
                Looking for our SaaS starter kits?
              </Heading>
              <Subheading>
                Our production-ready starter kits for TanStack Start and Next.js
                now live at saas-js.com — built on Saas UI with auth, Stripe
                billing, multi-tenant workspaces, and a typed tRPC stack.
              </Subheading>
            </Stack>

            <ButtonGroup
              gap="3"
              flexDirection={{ base: 'column', sm: 'row' }}
              alignItems="center"
            >
              <LinkButton
                href="https://www.saas-js.com"
                variant="glass"
                colorPalette="accent"
                size="lg"
                data-group=""
              >
                Visit saas-js.com <ActionArrow />
              </LinkButton>
              <LinkButton
                href="https://www.saas-js.com/pricing"
                variant="outline"
                size="lg"
              >
                View pricing
              </LinkButton>
            </ButtonGroup>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" mt="16">
            {kits.map((kit) => (
              <Card.Root
                key={kit.name}
                bg="bg.panel"
                borderWidth="1px"
                borderColor="border.subtle"
                size="lg"
              >
                <Card.Body gap="6" display="flex" flexDirection="column">
                  <HStack justify="space-between" align="center">
                    <HStack gap="3">
                      <Image
                        src={kit.logo}
                        alt={kit.logoAlt}
                        width={28}
                        height={28}
                      />
                      <Heading as="h2" textStyle="xl">
                        {kit.name}
                      </Heading>
                    </HStack>
                    <Badge variant="subtle" colorPalette="gray">
                      {kit.badge}
                    </Badge>
                  </HStack>

                  <Text color="fg.muted">{kit.description}</Text>

                  <List.Root variant="plain" gap="2.5" flex="1">
                    {kit.highlights.map((item) => (
                      <List.Item
                        key={item}
                        display="flex"
                        alignItems="flex-start"
                        gap="2"
                        textStyle="sm"
                      >
                        <List.Indicator color="accent.solid" mt="0.5">
                          <TbCheck />
                        </List.Indicator>
                        <Text>{item}</Text>
                      </List.Item>
                    ))}
                  </List.Root>

                  <ButtonGroup gap="3" pt="2" flexWrap="wrap">
                    <LinkButton
                      href={kit.href}
                      variant="glass"
                      colorPalette="accent"
                      size="md"
                      data-group=""
                    >
                      {kit.cta} <ActionArrow />
                    </LinkButton>
                    <LinkButton href={kit.docsHref} variant="outline" size="md">
                      Documentation
                    </LinkButton>
                  </ButtonGroup>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" borderTopWidth="1px" borderStyle="dashed" py="16">
        <Container maxW="6xl">
          <Stack gap="10">
            <Stack gap="3" maxW="2xl">
              <Heading as="h2" textStyle="3xl">
                Everything a SaaS needs before customer one
              </Heading>
              <Text color="fg.muted" textStyle="lg">
                Both starter kits share the same battle-tested foundation,
                designed for human teams and coding agents alike.
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="6">
              {stackItems.map((item) => (
                <Card.Root
                  key={item.title}
                  bg="bg.panel"
                  borderWidth="1px"
                  borderColor="border.subtle"
                >
                  <Card.Body gap="2">
                    <Text
                      textStyle="xs"
                      color="accent.solid"
                      fontWeight="medium"
                    >
                      {item.tech}
                    </Text>
                    <Heading as="h3" textStyle="md">
                      {item.title}
                    </Heading>
                    <Text textStyle="sm" color="fg.muted">
                      {item.description}
                    </Text>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <GetStartedSection />
    </>
  )
}
