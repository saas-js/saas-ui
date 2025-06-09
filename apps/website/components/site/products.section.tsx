import {
  Badge,
  Box,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  Separator,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Button, Section } from '@saas-ui/react'
import Link from 'next/link'

import { ActionArrow } from '../action-arrow'
import { ProBadge } from '../pro/pro-badge'

export function ProductsSection() {
  return (
    <Box borderTopWidth="1px" borderStyle="dashed">
      <ProductCard
        title="Start building faster."
        subtitle="Saas UI"
        badge={
          <Badge
            size="xs"
            variant="outline"
            borderRadius="4px"
            boxShadow="none"
            borderWidth="1.5px"
            color="gray.500"
            borderColor="gray.400"
            fontSize="10px"
            height="4"
            px="0.5"
            fontWeight="semibold"
          >
            OPEN SOURCE
          </Badge>
        }
        description={[
          'Get started with 60+ production-ready React components built specifically for SaaS applications. Our open source library gives you beautiful, accessible components without the design guesswork—completely free.',
          'Perfect for developers who want to skip the UI groundwork and focus on what makes their product unique. Join thousands of developers already building with Saas UI.',
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
        title="Ship premium experiences."
        subtitle="Saas UI Pro"
        badge={<ProBadge />}
        description={[
          'Advanced components and premium templates. Everything you need to create polished, professional applications that users love.',
          'Built for teams who care about quality. Get enterprise-grade components, detailed documentation, and priority support to ship faster without cutting corners.',
        ]}
        primaryAction={{
          label: 'Explore blocks',
          href: '/pro/blocks',
        }}
        secondaryAction={{
          label: 'Pricing',
          href: '/pro/pricing',
        }}
      ></ProductCard>
      <ProductCard
        title="Launch products customers love."
        subtitle="Starter kits"
        badge={<ProBadge />}
        description={[
          'Skip weeks of foundation work with our production-ready React starter kits. Authentication, payments, database, and beautiful UI —all integrated and ready to customize.',
          'Built with the latest tech stack including Saas UI Pro, tRPC, Drizzle ORM, and Stripe. Focus on your unique features while we handle the boring (but essential) parts.',
        ]}
        primaryAction={{
          label: 'View starter kits',
          href: '/pro/starter-kits',
        }}
        secondaryAction={{
          label: 'See live demo',
          href: 'https://demo.saas-ui.dev',
        }}
      ></ProductCard>
    </Box>
  )
}

function ProductCard(props: {
  title: string
  subtitle: string
  badge?: React.ReactNode
  description: string | string[]
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction: {
    label: string
    href: string
  }
  children?: React.ReactNode
}) {
  return (
    <Box as="section" borderBottomWidth="1px" borderStyle="dashed">
      <Container maxW="8xl" overflow="hidden">
        <HStack gap="0">
          <Stack
            flex="1 0 50%"
            width="50%"
            alignItems="flex-start"
            gap="2"
            py="24"
            pe="12"
          >
            <HStack>
              <Text textStyle="md" fontWeight="medium">
                {props.subtitle}
              </Text>
              {props.badge}
            </HStack>
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
          <Box
            alignSelf="stretch"
            flexShrink="0"
            minH="540px"
            width="calc(50vw - env(safe-area-inset-right))"
            borderLeftWidth="1px"
            borderStyle="dashed"
          >
            {props.children}
          </Box>
        </HStack>
      </Container>
    </Box>
  )
}
