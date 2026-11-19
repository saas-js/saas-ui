import { CustomersSection } from '@/components/saas-js/customers.section'
import { FeaturesSection } from '@/components/saas-js/features.section'
import { FounderSection } from '@/components/saas-js/founder.section'
import { GetStartedSection } from '@/components/saas-js/get-started.section'
import { HeroWorkspaceSection } from '@/components/saas-js/hero/hero-workspace'
import { TestimonialsSection } from '@/components/saas-js/testimonials.section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI-native SaaS starter kit for TanStack Start',
  description:
    'TanStack Start starter kit built for AI-assisted development. Auth, billing, dashboards, and strict types that keep your AI agents on track.',
}

export default function Page() {
  return (
    <>
      <HeroWorkspaceSection />
      <CustomersSection />
      <FeaturesSection />
      <FounderSection />
      <TestimonialsSection />
      <GetStartedSection docsHref="/docs/starter-kits/tanstack-start" />
    </>
  )
}
