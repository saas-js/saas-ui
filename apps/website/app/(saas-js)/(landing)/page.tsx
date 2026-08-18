import { FeaturesSection } from '@/components/saas-js/features.section'
import { FounderSection } from '@/components/saas-js/founder.section'
import { GetStartedSection } from '@/components/saas-js/get-started.section'
import { HeroSection } from '@/components/saas-js/hero.section'
import { ProofSection } from '@/components/saas-js/proof.section'
import { TestimonialsSection } from '@/components/saas-js/testimonials.section'
import { Stack, Text } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '#components/ui/button'

export const metadata: Metadata = {
  title: 'Agent-ready SaaS starter kit for TanStack Start',
  description:
    'A production-ready TanStack Start foundation with consistent patterns, strict types, focused documentation, and tests that help AI agents make reliable changes.',
}

export default function Page() {
  return (
    <Stack gap="0">
      <HeroSection />
      <ProofSection />
      <FeaturesSection />
      <FounderSection />
      <TestimonialsSection />
      <GetStartedSection>
        <Stack gap="3">
          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button
              variant="glass"
              colorPalette="accent"
              size="lg"
              width={{ base: 'full', sm: 'auto' }}
              asChild
            >
              <Link href="#proof-workspace">Explore the architecture</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              width={{ base: 'full', sm: 'auto' }}
              asChild
            >
              <Link href="/pricing">View pricing</Link>
            </Button>
          </Stack>

          <Text textStyle="xs" color="fg.muted">
            Direct support from the SaaS.js team is included.
          </Text>
        </Stack>
      </GetStartedSection>
    </Stack>
  )
}
