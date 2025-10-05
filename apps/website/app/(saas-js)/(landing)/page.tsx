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
import { Button } from '@saas-ui/react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <CustomersSection />
      <ProblemSection />
      <StackSection />
      <FeaturesSection />
      <WhySection />
      <FounderSection />
      <TestimonialsSection />
      <GetStartedSection>
        <Button variant="glass" colorPalette="accent" asChild>
          <Link href="/starter-kits">View starter kits</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/docs">Documentation</Link>
        </Button>
      </GetStartedSection>
    </>
  )
}
