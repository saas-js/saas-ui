import { CustomersSection } from '@/components/saas-js/customers.section'
import { DemoSection } from '@/components/saas-js/demo.section'
import { FeaturesSection } from '@/components/saas-js/features.section'
import { FounderSection } from '@/components/saas-js/founder.section'
import { GetStartedSection } from '@/components/saas-js/get-started.section'
import { NextjsSection } from '@/components/saas-js/hero.section'
import { TestimonialsSection } from '@/components/saas-js/testimonials.section'
import { WhySection } from '@/components/saas-js/why.section'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '#components/ui/button'
import { createSjsMetadata } from '@/lib/saas-js/metadata'

export const metadata: Metadata = createSjsMetadata({
  title: 'AI-native SaaS starter kit for Next.js',
  description:
    'Next.js starter kit built for AI-assisted development. Auth, billing, dashboards, and strict types that keep your AI agents on track.',
  path: '/nextjs',
})

export default function Page() {
  return (
    <>
      <NextjsSection />
      <DemoSection />
      <CustomersSection />
      <FeaturesSection />
      <WhySection />
      <FounderSection />
      <TestimonialsSection />
      <GetStartedSection>
        <Button variant="glass" colorPalette="accent" asChild>
          <Link href="/pricing">Buy now</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/docs/starter-kits/nextjs">Documentation</Link>
        </Button>
      </GetStartedSection>
    </>
  )
}
