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
} from '@saas-ui/react'
import { Button, Section } from '@saas-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { TbCheck } from 'react-icons/tb'

import { ActionArrow } from '../action-arrow'
import { ProBadge } from '../pro/pro-badge'

export function FeaturesSection() {
  return (
    <Section.Root borderTopWidth="1px" borderStyle="dashed" py="20">
      <Container maxW="8xl">
        <Stack mb="16">
          <Heading as="h3" textStyle="4xl">
            Complete, integrated systems
          </Heading>
          <Text
            textStyle="lg"
            color="fg.subtle"
            fontWeight="medium"
            maxW="340px"
          >
            Not just components. Production-ready features that work together
            seamlessly.
          </Text>
        </Stack>

        <Grid
          templateColumns="repeat(2, 1fr)"
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

          <PrimaryFeatureCard
            title="Workspaces"
            description="Allow users to create, manage, and invite other users to their own workspaces."
            features={['RBAC', 'Multi-tenancy', 'Block workspaces']}
          />
        </Grid>

        <HStack
          overflowX="auto"
          gap="4"
          alignItems="stretch"
          py="16"
          borderBottomWidth="1px"
          borderStyle="dashed"
        >
          <TertiaryFeatureCard
            title="Feature flags"
            description="Control access to features and functionality."
          />
          <TertiaryFeatureCard
            title="TypeScript"
            description="Type-safe from front to backend."
          />
          <TertiaryFeatureCard
            title="Notifications"
            description="Notification preferences for your users."
          />
          <TertiaryFeatureCard
            title="Marketing"
            description="Email marketing and newsletter preferences."
          />
          <TertiaryFeatureCard
            title="Analytics"
            description="Track user behavior and engagement."
          />
        </HStack>
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
          ps: '16',
        },
        '&:nth-child(odd)': {
          pe: '16',
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
          gridTemplateColumns={`repeat(${props.featureColumns ?? 3}, 1fr)`}
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
      gridColumn="span 2"
      bg="bg.muted"
    >
      <Card.Header p="0" textAlign="center">
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
        gap="4"
        alignItems="center"
      >
        <List.Root
          variant="plain"
          textStyle="md"
          color="fg.muted"
          display="grid"
          gridTemplateColumns={`repeat(${props.featureColumns ?? 3}, 1fr)`}
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
      <Box height="300px"></Box>
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
