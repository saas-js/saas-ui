import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  Container,
  Grid,
  HStack,
  Heading,
  Separator,
  Span,
  Stack,
  Text,
} from '@saas-ui/react'
import { Button, Section } from '@saas-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import { ActionArrow } from '../action-arrow'
import { ProBadge } from '../pro/pro-badge'

export function ProductsSection() {
  return (
    <Box borderTopWidth="1px" borderStyle="dashed">
      <ProductCard
        title="Open Source components"
        // badge={
        //   <Badge
        //     size="xs"
        //     variant="outline"
        //     borderRadius="4px"
        //     boxShadow="none"
        //     borderWidth="1.5px"
        //     color="indigo.500"
        //     borderColor="indigo.500"
        //     fontSize="10px"
        //     height="4"
        //     px="0.5"
        //     fontWeight="bold"
        //   >
        //     OPEN SOURCE
        //   </Badge>
        // }
        description={[
          'Get started with 60+ production-ready React components built specifically for SaaS applications. Our open source library gives you beautiful, accessible components without the design guesswork — completely free.',
        ]}
        primaryAction={{
          label: 'Browse components',
          href: '/components',
        }}
        secondaryAction={{
          label: 'View documentation',
          href: '/docs',
        }}
      ></ProductCard>
      <ProductCard
        title="Premium components"
        orientation="vertical"
        // badge={<ProBadge />}
        description={[
          'Advanced components and premium templates. Everything you need to create polished, professional applications that users love.',
        ]}
        secondaryDescription={[
          'Built for teams who care about quality. Get enterprise-grade components, detailed documentation, and priority support to ship faster without cutting corners.',
        ]}
        primaryAction={{
          label: 'Blocks & Templates',
          href: '/pro/blocks',
        }}
        secondaryAction={{
          label: 'Pricing',
          href: '/pro/pricing',
        }}
      >
        <Grid templateColumns="repeat(5, 1fr)" gap="4" height="500px">
          <Card.Root
            variant="elevated"
            bg="gray.300"
            gridColumn="span 3"
            overflow="clip"
            position="relative"
          >
            <Image
              src="/img/pro/blocks.png"
              alt="Blocks"
              width={100}
              height={100}
            />
            <Card.Header
              bg="bg"
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              p="4"
            >
              <Card.Title textStyle="2xl" color="fg">
                Email Dashboard
              </Card.Title>
              <Card.Description color="fg.muted">
                A beautiful email dashboard with a modern design and a focus on
                usability.
              </Card.Description>
            </Card.Header>
          </Card.Root>
          <Card.Root variant="elevated" bg="bg.accent" gridColumn="span 2">
            <Image
              src="/img/pro/blocks.png"
              alt="Blocks"
              width={100}
              height={100}
            />
          </Card.Root>
        </Grid>
      </ProductCard>
      <ProductCard
        title="Launch products customers love."
        subtitle="Full-stack starter kits"
        // badge={<ProBadge />}
        description={[
          'Skip weeks of foundational work with our production-ready React starter kits. Authentication, payments, database, and beautiful UI —all integrated and ready to customize.',
          'Built with solid and scalable tech stacks including tRPC, Drizzle, and Stripe. Focus on your unique features while we handle the boring (but essential) parts.',
        ]}
        primaryAction={{
          label: 'View starter kits',
          href: '/pro/starter-kits',
        }}
        secondaryAction={{
          label: 'See live demo',
          href: 'https://demo.saas-ui.dev',
        }}
      >
        <Grid templateColumns="1fr 1fr 1fr" gap="4" height="100%">
          {starterKitTech.map((tech) => (
            <Stack
              key={tech.label}
              alignItems="center"
              justifyContent="center"
              height="100%"
              role="group"
            >
              <Box
                transition="transform 0.2s ease-in-out"
                transform="translateY(10px)"
                _groupHover={{
                  transform: 'translateY(0)',
                  filter: 'grayscale(0%)',
                }}
                filter="grayscale(100%)"
              >
                <Image src={tech.img} alt={tech.label} width={40} height={40} />
              </Box>

              <Text
                textStyle="sm"
                fontWeight="medium"
                opacity="0"
                transition="opacity 0.2s ease-in-out"
                _groupHover={{
                  opacity: 1,
                }}
                pointerEvents="none"
              >
                {tech.label}
              </Text>
            </Stack>
          ))}
        </Grid>
      </ProductCard>
    </Box>
  )
}

const starterKitTech = [
  {
    label: 'React',
    img: '/img/logos/react.svg',
  },
  {
    label: 'Next.js',
    img: '/img/logos/nextjs.svg',
  },
  {
    label: 'Tanstack React Start',
    img: '/img/logos/tanstack.png',
  },
  {
    label: 'Tanstack React Query',
    img: '/img/logos/tanstack.png',
  },
  {
    label: 'tRPC',
    img: '/img/logos/trpc-io.png',
  },
  {
    label: 'Drizzle',
    img: '/img/logos/drizzle.png',
  },
  {
    label: 'PostgreSQL',
    img: '/img/logos/postgresql.png',
  },
  {
    label: 'Stripe',
    img: '/img/logos/stripe.svg',
  },
  {
    label: 'Chakra UI',
    img: '/img/logos/chakra-ui.svg',
  },
]

function ProductCard(props: {
  title: string
  subtitle?: string
  badge?: React.ReactNode
  description: string | string[]
  secondaryDescription?: string | string[]
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction: {
    label: string
    href: string
  }
  orientation?: 'horizontal' | 'vertical'
  children?: React.ReactNode
}) {
  const { orientation = 'horizontal' } = props

  const isHorizontal = orientation === 'horizontal'

  return (
    <Box as="section" borderBottomWidth="1px" borderStyle="dashed">
      <Container maxW="8xl" overflow="hidden">
        <Stack direction={isHorizontal ? 'row' : 'column'} gap="0">
          <Stack
            gap="2"
            css={
              isHorizontal
                ? {
                    flex: '1 0 50%',
                    width: '50%',
                    alignItems: 'flex-start',
                    pe: '12',
                    py: 24,
                  }
                : {
                    pt: 24,
                    pb: 8,
                    maxW: '480px',
                  }
            }
          >
            {props.subtitle && (
              <HStack>
                <Text textStyle="sm" fontWeight="normal">
                  {props.subtitle}
                </Text>
                {props.badge}
              </HStack>
            )}
            <Heading as="h3" textStyle="4xl">
              {props.title}
            </Heading>
            {Array.isArray(props.description) ? (
              <>
                {props.description.map((line) => (
                  <Text
                    key={line}
                    textStyle="lg"
                    fontWeight="medium"
                    color="fg.subtle"
                  >
                    {line}
                  </Text>
                ))}
              </>
            ) : (
              <Text textStyle="lg" fontWeight="medium" color="fg.subtle">
                {props.description}
              </Text>
            )}
            {Array.isArray(props.secondaryDescription) ? (
              <>
                {props.secondaryDescription.map((line) => (
                  <Text
                    key={line}
                    textStyle="sm"
                    fontWeight="medium"
                    color="fg.muted"
                  >
                    {line}
                  </Text>
                ))}
              </>
            ) : (
              <Text textStyle="sm" fontWeight="medium" color="fg.muted">
                {props.secondaryDescription}
              </Text>
            )}
            <ButtonGroup>
              <Button
                variant="plain"
                colorPalette="accent"
                width="auto"
                size="xl"
                asChild
              >
                <Link href={props.primaryAction.href}>
                  {props.primaryAction.label} <ActionArrow />
                </Link>
              </Button>
            </ButtonGroup>
          </Stack>
          {isHorizontal ? (
            <Box
              alignSelf="stretch"
              flexShrink="0"
              minH="400px"
              width="calc(50vw - env(safe-area-inset-right))"
              borderLeftWidth="1px"
              borderStyle="dashed"
            >
              {props.children}
            </Box>
          ) : (
            <Box pb="12">{props.children}</Box>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
