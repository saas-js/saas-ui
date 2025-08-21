import { CustomersSection } from '@/components/site/customers.section'
import { GetStartedSection } from '@/components/site/get-started.section'
import { TestimonialsSection } from '@/components/site/testimonials.section'
import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  List,
  Text,
} from '@saas-ui/react'
import { TbCheck } from 'react-icons/tb'

import { ComponentsSection } from './components/components.section'
import { DesignSystemSection } from './components/design-system.section'
import { HeroSection } from './components/hero.section'

export default function Page() {
  return (
    <>
      <HeroSection />
      <ComponentsSection />
      <CustomersSection />
      <BenefitsSection />
      <DesignSystemSection />
      <TestimonialsSection />
      <GetStartedSection />
    </>
  )
}

function BenefitsSection() {
  return (
    <Box
      as="section"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderStyle="dashed"
      py="16"
    >
      <Container maxW="8xl">
        <HStack gap="4" mb="12" alignItems="flex-end">
          <Box flex="1">
            <Heading as="h3" textStyle="6xl" lineHeight="1.2">
              Why product teams
              <br /> choose Saas UI
            </Heading>
          </Box>

          <Box flex="1">
            <Text textStyle="lg" color="fg.subtle">
              Pre-built, production-ready components that maintain design
              consistency, while accelerating development speed and time to
              market.
            </Text>
          </Box>
        </HStack>

        <Box>
          <Grid templateColumns="repeat(3, 1fr)" gap="4">
            <BenefitsList
              benefits={[
                'Faster UI development',
                'Skip the boilerplate, focus on features',
                'Pre-built patterns for common SaaS interfaces',
              ]}
            />
            <BenefitsList
              benefits={[
                'Battle-tested components used in production',
                'Built-in accessibility (WCAG compliance)',
                'Consistent design language across your product',
              ]}
            />
            <BenefitsList
              benefits={[
                'Fully customizable styling',
                'Composable component architecture',
                "No vendor lock-in, it's open source",
              ]}
            />
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

function BenefitsList(props: { benefits: Array<string> }) {
  return (
    <List.Root variant="plain" align="center">
      {props.benefits.map((benefit) => (
        <List.Item key={benefit} py="2" fontWeight="medium">
          <List.Indicator color="fg.muted" minH="auto">
            <TbCheck />
          </List.Indicator>
          {benefit}
        </List.Item>
      ))}
    </List.Root>
  )
}

const problems = `
Tired of rebuilding the same UI components over and over again?
Spending weeks on UI instead of core features?
Struggling with accessibility and consistency?

Development cycles dragging due to UI work?
Inconsistent design language across your product?
High cost of UI development.

The solution: Pre-built, production-ready components that maintain design consistency, while accelerating development speed.
`

const benefits = `

## Speed & Efficiency

- 10x faster UI development
- Skip the boilerplate, focus on features
- Pre-built patterns for common SaaS interfaces

## Quality & consistency

- Battle-tested components used in production
- Built-in accessibility (WCAG compliance)
- Consistent design language accross your product

## Flexibility & control

- Fully customizable styling
- Composable component architecture
- No vendor lock-in, it's open source
`

const highlights = `
- TypeScript support out of the box
- Comprehensive documentation and examples
- Design system foundations included
- Figma UI Kit for design handoff
- Customizable themes and branding
- Scalable architecture for growing teams
`

const opensource = `
- Apache 2.0 license
- Open source, forever
- Contributions welcome
- No subscription, no hidden costs
- 100% free to use
`

const gettingStarted = `
- pnpm i @saas-ui/react @emotion/styled
- examples
- documentation
- discord
`

const footer = `
Join hundreds of developers and teams building better SaaS interfaces.
Start building today.
`
