import { CustomersSection } from '@/components/saas-js/customers.section'
import { DemoSection } from '@/components/saas-js/demo.section'
import { FeaturesSection } from '@/components/saas-js/features.section'
import { FounderSection } from '@/components/saas-js/founder.section'
import { GetStartedSection } from '@/components/saas-js/get-started.section'
import { HeroSection } from '@/components/saas-js/hero.section'
import { ProblemSection } from '@/components/saas-js/problem.section'
import { StackSection } from '@/components/saas-js/stack.section'
import { TestimonialsSection } from '@/components/saas-js/testimonials.section'
import { WhySection } from '@/components/saas-js/why.section'
import { Button, ButtonGroup, Stack, Text } from '@chakra-ui/react'
import { allChangelogs } from 'content-collections'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Next.js and TanStack Start starterkits',
  description: 'Building blocks for top tier SaaS products',
}

export default function Page() {
  const changelogs = allChangelogs.filter((changelog) =>
    changelog.products?.some(
      (product) => product === 'tanstack' || product === 'nextjs',
    ),
  )

  const latest = changelogs[0]

  return (
    <>
      <HeroSection
        latestChangelog={{
          title: latest.title,
          link: `/changelog/${latest.slug}`,
        }}
      />
      <DemoSection />
      <CustomersSection />
      <ProblemSection />
      <StackSection />
      <FeaturesSection />
      <WhySection />
      <FounderSection />
      <TestimonialsSection />
      <GetStartedSection>
        <Stack>
          <ButtonGroup>
            <Button variant="glass" colorPalette="accent" asChild>
              <Link href="/pricing">Buy now</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs">Documentation</Link>
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
