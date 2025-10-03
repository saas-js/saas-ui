import { GetStartedSection } from '@/components/site/get-started.section'
import { TestimonialsSection } from '@/components/site/testimonials.section'
import { Metadata } from 'next'

import { HeroSection } from '../components/hero.section'

export const metadata: Metadata = {
  title: 'Tanstack Start Starter Kit',
  description:
    'Production-ready Tanstack Start starter kits with beautiful UI, seamless UX, and enterprise-grade architecture. Built with Saas UI Pro, tRPC, Postgres, Drizzle, and Stripe.',
}

export default function Page() {
  return (
    <>
      <HeroSection />
      <TestimonialsSection />
      <GetStartedSection />
    </>
  )
}
