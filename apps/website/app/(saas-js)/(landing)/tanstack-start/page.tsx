import { CustomersSection } from '@/components/saas-js/customers.section'
import { DemoSection } from '@/components/saas-js/demo.section'
import { FeaturesSection } from '@/components/saas-js/features.section'
import { FounderSection } from '@/components/saas-js/founder.section'
import { GetStartedSection } from '@/components/saas-js/get-started.section'
import { HeroTanStackSection } from '@/components/saas-js/hero.section'
import { TestimonialsSection } from '@/components/saas-js/testimonials.section'
import { WhySection } from '@/components/saas-js/why.section'
import { Button } from '@saas-ui/react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <HeroTanStackSection />
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
          <Link href="/docs/starter-kits/tanstack-start">Documentation</Link>
        </Button>
      </GetStartedSection>
    </>
  )
}
