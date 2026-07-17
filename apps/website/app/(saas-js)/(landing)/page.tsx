import { CustomersSection } from '@/components/saas-js/customers.section'
import { DemoSection } from '@/components/saas-js/demo.section'
import { FeaturesSection } from '@/components/saas-js/features.section'
import { FounderSection } from '@/components/saas-js/founder.section'
import { GetStartedSection } from '@/components/saas-js/get-started.section'
import { HeroSection } from '@/components/saas-js/hero.section'
import { TestimonialsSection } from '@/components/saas-js/testimonials.section'
import { WhySection } from '@/components/saas-js/why.section'
import { ButtonGroup, Stack, Text } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '#components/ui/button'

export const metadata: Metadata = {
  title: 'AI-native SaaS starter kit for TanStack Start',
  description:
    'TanStack Start starter kit built for AI-assisted development. Auth, billing, dashboards, and strict types that keep your AI agents on track.',
}

export default function Page() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <CustomersSection />
      <FeaturesSection />
      <FounderSection />
      <TestimonialsSection />
      <GetStartedSection>
        <Stack>
          <ButtonGroup>
            <Button variant="glass" colorPalette="accent" asChild>
              <Link href="/pricing">Buy now</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/starter-kits/tanstack-start">
                Read the docs
              </Link>
            </Button>
          </ButtonGroup>

          <Text textStyle="xs" color="fg.muted">
            <strong>30% off</strong> for a limited time
          </Text>
        </Stack>
      </GetStartedSection>
    </>
  )
}
