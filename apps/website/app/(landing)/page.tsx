import { CustomersSection } from '@/components/site/customers.section'
import { DemoSection } from '@/components/site/demo.section'
import { FeaturesSection } from '@/components/site/features.section'
import { FounderSection } from '@/components/site/founder.section'
import { GetStartedSection } from '@/components/site/get-started.section'
import { HeroSection } from '@/components/site/hero.section'
import { ProblemSection } from '@/components/site/problem.section'
import { StackSection } from '@/components/site/stack.section'
import { TestimonialsSection } from '@/components/site/testimonials.section'
import { WhySection } from '@/components/site/why.section'
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
