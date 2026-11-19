import { highlightCode } from '@/lib/highlight-code'
import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'

import { Section } from '#components/ui/section'

import {
  ApiStage,
  AuthStage,
  BillingStage,
  DatabaseStage,
  EmailStage,
  FlagsStage,
  TestingStage,
  UiStage,
  WorkspacesStage,
} from './features/feature-stages'
import {
  billingConfigCode,
  flagsCode,
  routerCode,
  schemaCode,
  specCode,
} from './features/snippets'

// This section renders on the homepage and on both starter-kit pages. It was
// hardcoded to TanStack Start, so /nextjs told visitors the Next.js kit was
// built on a different framework.
const frameworkCopy = {
  'tanstack-start': {
    heading: 'Built on TanStack Start',
    description:
      'The fastest full-stack React framework for building dashboard-heavy SaaS products. Type-safe routing, built-in caching, and SSR when you need it.',
  },
  nextjs: {
    heading: 'Built on Next.js',
    description:
      'The React framework your team already knows. App Router, server components and streaming, typed end to end, and deployable anywhere you like.',
  },
} as const

/** Shiki emits one `<span class="line">` per line; flag the 1-based `lines`. */
export function markLines(html: string, lines: number[]) {
  let line = 0
  return html.replace(/<span class="line">/g, (match) => {
    line += 1
    return lines.includes(line) ? '<span class="line is-marked">' : match
  })
}

export async function FeaturesSection({
  framework = 'tanstack-start',
}: {
  framework?: keyof typeof frameworkCopy
}) {
  const { heading, description } = frameworkCopy[framework]

  const [configHtml, flagsHtml, schemaHtml, routerHtml, specHtml] =
    await Promise.all([
      highlightCode(billingConfigCode, { lang: 'ts' }),
      highlightCode(flagsCode, { lang: 'ts' }),
      highlightCode(schemaCode, { lang: 'ts' }),
      highlightCode(routerCode, { lang: 'ts' }),
      highlightCode(specCode, { lang: 'ts' }),
    ])

  return (
    <Section.Root py={{ base: '16', md: '24' }} borderTopWidth="1px">
      <Container maxW="8xl">
        <Stack mb="16" gap="4">
          <Heading as="h3" textStyle="4xl">
            {heading}
          </Heading>
          <Text textStyle="lg" color="fg.subtle" fontWeight="medium" maxW="xl">
            {description}
          </Text>
        </Stack>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
          columnGap={{ md: '10', xl: '16' }}
          rowGap={{ base: '16', md: '24' }}
        >
          <FeatureTile
            label="Auth"
            title="Sign in, every way your users expect."
            description="Built on Better Auth, with the login, signup and security screens already designed. Bring your own provider if you prefer."
            logos={['/img/frameworks/better-auth.svg']}
            stage={<AuthStage />}
            features={[
              'Email & password',
              'Social login',
              'Magic links',
              '2FA',
              'Passkeys',
              'Email verification',
              'RBAC',
              'SSO',
            ]}
          />

          <FeatureTile
            label="Workspaces"
            title="Every customer gets a workspace."
            description="Multi-tenancy from the first commit. Users create workspaces, invite their team and manage roles, all scoped per workspace."
            stage={<WorkspacesStage />}
            features={[
              'Multi-tenancy',
              'Invite users',
              'Manage roles',
              'RBAC',
              'Block workspaces',
            ]}
          />

          <FeatureTile
            label="Billing"
            title="Plans in code. Synced to Stripe."
            description="Define plans, trials and per-seat prices in one config file. One command sets them up in Stripe, and the billing pages are ready."
            logos={['/img/frameworks/stripe.svg']}
            stage={<BillingStage configHtml={markLines(configHtml, [7])} />}
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

          <FeatureTile
            label="Feature flags"
            logos={['/img/frameworks/openfeature.svg']}
            title="Ship behind flags. Bring any provider."
            description="Built on the OpenFeature standard. Reflag is wired up out of the box, and any other OpenFeature provider drops in without touching your feature code."
            stage={<FlagsStage setupHtml={markLines(flagsHtml, [5])} />}
            features={[
              'OpenFeature',
              'Reflag',
              'Server & client flags',
              'Workspace targeting',
              'Gradual rollouts',
              'Any OpenFeature provider',
            ]}
          />

          <FeatureTile
            label="Database"
            title="A typed schema on PostgreSQL."
            description="Drizzle ORM with migrations and seed data. Every table is scoped to a workspace. Run it locally, on Supabase, or at the edge with Neon."
            logos={['/img/frameworks/drizzle.svg']}
            stage={<DatabaseStage schemaHtml={markLines(schemaHtml, [4])} />}
            features={[
              'PostgreSQL',
              'Migrations & seeding',
              'Optimized queries',
              'Edge-ready',
            ]}
          />

          <FeatureTile
            label="API"
            title="End-to-end types, no codegen."
            description="tRPC routers with workspace-scoped procedures and role checks. Change a field on the server and your editor knows on the client."
            logos={['/img/frameworks/trpc.svg']}
            stage={<ApiStage routerHtml={markLines(routerHtml, [10])} />}
            features={[
              'Type-safe',
              'React Query integration',
              'Permissions & roles',
              'Subscriptions (Live data)',
              'SSR & RSC support',
            ]}
          />

          <FeatureTile
            label="UI components"
            title="Components that belong together."
            description="A crafted theme for Chakra UI and Panda CSS, with the app shell, forms and settings pages built on the same tokens."
            logos={[
              '/img/frameworks/chakra-ui.svg',
              '/img/frameworks/pandacss.svg',
            ]}
            stage={<UiStage />}
            features={[
              'Customizable token system',
              'Pre-built components',
              'Storybooks',
              'Accessible',
            ]}
          />

          <FeatureTile
            label="Transactional emails"
            title="Emails that look the part."
            description="React Email templates for invites, email confirmation and password resets. Send them with Resend or your own SMTP server."
            logos={[
              '/img/frameworks/resend.svg',
              '/img/frameworks/react-email.png',
            ]}
            stage={<EmailStage />}
            features={[
              'Built-in templates',
              'Template editor',
              'Custom SMTP support',
            ]}
          />

          <FeatureTile
            label="Testing & linting"
            title="Back pressure for your agents."
            description="Playwright, Vitest and GitHub Actions come set up, so you and your agents find out about a regression before it merges."
            logos={[
              '/img/frameworks/playwright.svg',
              '/img/frameworks/vitest.svg',
              '/img/frameworks/github.svg',
            ]}
            stage={<TestingStage specHtml={markLines(specHtml, [7])} />}
            features={['Playwright', 'Vitest', 'GitHub Actions']}
            wide
          />
        </Grid>
      </Container>
    </Section.Root>
  )
}

/** A feature with a product mockup. Also used on the keyword landing pages. */
export function FeatureTile(props: {
  label?: string
  title: string
  description: string
  logos?: string[]
  stage: React.ReactNode
  features?: string[]
  /** Heading level, so the tile fits the page's outline. Defaults to h4. */
  headingAs?: 'h3' | 'h4'
  /** Span both columns, copy beside the stage. Used to close an odd grid. */
  wide?: boolean
}) {
  const copy = (
    <>
      {props.label && (
        <HStack
          gap="2"
          mb="4"
          color="fg.muted"
          textStyle="sm"
          fontWeight="medium"
        >
          {props.logos?.map((logo) => (
            <Image key={logo} src={logo} alt="" width={20} height={20} />
          ))}
          <Text as="span">{props.label}</Text>
        </HStack>
      )}

      <Heading
        as={props.headingAs ?? 'h4'}
        fontSize={{ base: '2xl', md: '3xl' }}
        lineHeight="1.15"
        fontWeight="medium"
        letterSpacing="-0.025em"
        textWrap="balance"
        mb="3"
      >
        {props.title}
      </Heading>
      <Text textStyle="lg" color="fg.subtle" textWrap="pretty" maxW="lg">
        {props.description}
      </Text>
    </>
  )

  const features = props.features?.length ? (
    <Box as="ul" display="flex" flexWrap="wrap" gap="1.5" listStyle="none">
      {props.features.map((feature) => (
        <Box
          as="li"
          key={feature}
          display="inline-flex"
          alignItems="center"
          h="7"
          px="2.5"
          rounded="full"
          bg="bg.panel"
          borderWidth="1px"
          borderColor="border"
          color="fg.muted"
          textStyle="xs"
          fontWeight="medium"
          whiteSpace="nowrap"
        >
          {feature}
        </Box>
      ))}
    </Box>
  ) : null

  const stage = <Box aria-hidden="true">{props.stage}</Box>

  if (props.wide) {
    return (
      <Grid
        as="article"
        gridColumn={{ md: 'span 2' }}
        templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
        columnGap={{ md: '16', xl: '24' }}
        alignItems="center"
        minW="0"
      >
        <Box>
          {copy}
          <Box
            mt={{ base: '0', md: '8' }}
            display={{ base: 'none', md: 'block' }}
          >
            {features}
          </Box>
        </Box>
        <Box minW="0">
          {stage}
          <Box display={{ base: 'block', md: 'none' }}>{features}</Box>
        </Box>
      </Grid>
    )
  }

  return (
    <Box as="article" minW="0">
      {copy}
      {stage}
      {features}
    </Box>
  )
}
