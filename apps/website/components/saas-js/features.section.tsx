import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  Container,
  Flex,
  Grid,
  HStack,
  Heading,
  List,
  Separator,
  Span,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react'
import { Section } from '#components/ui/section'
import Image from 'next/image'
import Link from 'next/link'
import { TbCheck } from 'react-icons/tb'

import { ActionArrow } from '../action-arrow'
import { ProBadge } from '../pro/pro-badge'

export function FeaturesSection() {
  return (
    <Section.Root borderTopWidth="1px" borderStyle="dashed" py="20">
      <Container maxW="8xl">
        <Stack mb="16" gap="4">
          <Heading as="h3" textStyle="4xl">
            Built on TanStack Start
          </Heading>
          <Text textStyle="lg" color="fg.subtle" fontWeight="medium" maxW="xl">
            The fastest full-stack React framework for building dashboard-heavy
            SaaS products. Type-safe routing, built-in caching, and SSR when you
            need it.
          </Text>
        </Stack>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          borderTopWidth="1px"
          borderStyle="dashed"
          position="relative"
          gap="0"
          _after={{
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            height: '100%',
            borderLeftWidth: '1px',
            borderStyle: 'dashed',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            display: { base: 'none', md: 'block' },
          }}
        >
          <FeatureCard
            title="Auth"
            description="Customizable auth system built on Better Auth, or use your own auth provider."
            logos={['/img/frameworks/better-auth.svg']}
            features={[
              'Email & password',
              'Social login',
              'Magic links',
              '2FA',
              'RBAC',
              'Email verification',
              'Passkeys',
              'SSO',
            ]}
          />

          <FeatureCard
            title="Workspaces"
            description="Allow users to create, manage, and invite other users to their own workspaces."
            features={[
              'RBAC',
              'Multi-tenancy',
              'Block workspaces',
              'Invite users',
              'Manage roles',
            ]}
          />

          <FeatureCard
            title="Billing"
            description="Built-in billing with Stripe, or use your own billing provider. Automatically sync your billing configuration with Stripe."
            logos={['/img/frameworks/stripe.svg']}
            features={[
              'Subscriptions',
              'Automatic Stripe setup',
              'Tiered pricing',
              'Metered pricing',
              'Usage-based pricing',
              'Entitlements',
              'Pricing tables',
              'Grandfathering',
            ]}
          />

          <FeatureCard
            title="Database"
            description="Built on the world's most proven database. PostgreSQL managed by Drizzle ORM. Run it locally, use Supabase, or on the edge with Neon.."
            logos={['/img/frameworks/drizzle.svg']}
            featureColumns={2}
            features={[
              'PostgreSQL',
              'Migrations & seeding',
              'Optimized queries',
              'Edge-ready',
            ]}
          />

          <FeatureCard
            title="API"
            description="End-to-end typesafe API with tRPC. Built fast without breaking anything. Fully portable, run it in a route function or fully standalone as your backend grows."
            logos={['/img/frameworks/trpc.svg']}
            features={[
              'Type-safe',
              'React Query integration',
              'Permissions & roles',
              'Subscriptions (Live data)',
              'SSR & RSC support',
            ]}
          />

          <FeatureCard
            title="Beautiful UI"
            description="Meticulously crafted theme that works with Chakra UI and Panda CSS. Built-in components, hooks, and utilities that work together seamlessly."
            logos={[
              '/img/frameworks/chakra-ui.svg',
              '/img/frameworks/pandacss.svg',
            ]}
            features={[
              'Customizable token system',
              'Pre-built components',
              'Storybooks',
              'Accessible',
            ]}
          />

          <FeatureCard
            title="Transactional Emails"
            description="Beautiful, easily customisable transactional emails. Integrate with Resend, or use your own SMTP provider."
            logos={[
              '/img/frameworks/resend.svg',
              '/img/frameworks/react-email.png',
            ]}
            features={[
              'Built-in templates',
              'Template editor',
              'Custom SMTP support',
            ]}
          />

          <FeatureCard
            title="Testing &amp; Linting"
            description="End-to-end and unit testing setup for agent back pressure, ship with confidence."
            logos={[
              '/img/frameworks/playwright.svg',
              '/img/frameworks/vitest.svg',
              '/img/frameworks/github.svg',
            ]}
            features={['Playwright', 'Vitest', 'Github Actions']}
          />
        </Grid>
      </Container>
    </Section.Root>
  )
}

function FeatureCard(props: {
  title: string
  description: string
  logos?: string[]
  featureColumns?: number
  features: string[]
}) {
  return (
    <Card.Root
      variant="outline"
      border="0"
      bg="none"
      borderBottomWidth="1px"
      borderStyle="dashed"
      borderColor="border"
      rounded="0"
      py="16"
      css={{
        '&:nth-child(even)': {
          ps: { base: '0', md: '16' },
        },
        '&:nth-child(odd)': {
          pe: { base: '0', md: '16' },
        },
      }}
    >
      <Card.Header p="0">
        <Card.Title textStyle="2xl">{props.title}</Card.Title>
        <Card.Description fontSize="lg" color="fg.subtle" textWrap="pretty">
          {props.description}
        </Card.Description>
      </Card.Header>
      <Card.Body p="0" pt="4">
        <Flex mb="4" gap="2">
          {props.logos?.map((logo) => (
            <Image
              key={logo}
              src={logo}
              alt={props.title}
              width={32}
              height={32}
            />
          ))}
        </Flex>

        <List.Root
          variant="plain"
          textStyle="md"
          color="fg.muted"
          display="grid"
          gridTemplateColumns={{
            base: `repeat(${Math.min(props.featureColumns ?? 3, 2)}, 1fr)`,
            md: `repeat(${props.featureColumns ?? 3}, 1fr)`,
          }}
          gap="2"
          fontSize="sm"
        >
          {props.features.map((feature) => (
            <List.Item key={feature}>
              <List.Indicator color="fg" asChild>
                <TbCheck />
              </List.Indicator>
              {feature}
            </List.Item>
          ))}
        </List.Root>
      </Card.Body>
    </Card.Root>
  )
}

function PrimaryFeatureCard(props: {
  title: string
  description: string
  featureColumns?: number
  features?: string[]
  children?: React.ReactNode
}) {
  return (
    <Card.Root
      position="relative"
      zIndex={2}
      variant="outline"
      border="0"
      borderBottomWidth="1px"
      borderStyle="dashed"
      borderColor="border"
      rounded="0"
      py="16"
      gridColumn={{ base: 'span 1', md: 'span 2' }}
      bg="bg.muted"
    >
      <Card.Header p="0">
        <Card.Title textStyle="4xl">{props.title}</Card.Title>
        <Card.Description fontSize="lg" color="fg.subtle" textWrap="pretty">
          {props.description}
        </Card.Description>
      </Card.Header>
      <Card.Body
        p="0"
        pt="4"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="4"
      >
        <List.Root
          variant="plain"
          textStyle="md"
          color="fg.muted"
          display="grid"
          gridTemplateColumns={{
            base: `repeat(${Math.min(props.featureColumns ?? 3, 2)}, 1fr)`,
            md: `repeat(${props.featureColumns ?? 3}, 1fr)`,
          }}
          gap="2"
          fontSize="sm"
        >
          {props.features?.map((feature) => (
            <List.Item key={feature}>
              <List.Indicator color="fg" asChild>
                <TbCheck />
              </List.Indicator>
              {feature}
            </List.Item>
          ))}
        </List.Root>

        {props.children}
      </Card.Body>
    </Card.Root>
  )
}

function TertiaryFeatureCard(props: {
  title: string
  description: string
  featureColumns?: number
  features?: string[]
  children?: React.ReactNode
}) {
  return (
    <Card.Root
      variant="outline"
      bg={{
        _light: 'white/40',
        _dark: 'white/5',
      }}
      width="260px"
    >
      <Box height="200px"></Box>
      <Card.Header>
        <Card.Title textStyle="md" color="fg.muted" fontWeight="medium">
          {props.title}
        </Card.Title>
        <Card.Description fontSize="md" color="fg" fontWeight="semibold">
          {props.description}
        </Card.Description>
      </Card.Header>
    </Card.Root>
  )
}
