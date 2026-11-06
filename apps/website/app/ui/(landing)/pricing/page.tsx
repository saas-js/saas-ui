import { CustomersSection } from '@/components/site/customers.section'
import { getStarterKitLastUpdated } from '@/lib/starter-kit-updated-at'
import { Container, Stack } from '@chakra-ui/react'
import type { Metadata } from 'next'

import { CTA } from './components/cta'
import { FAQ } from './components/faq'
import { Hero } from './components/hero'
import { PricingTable } from './components/pricing-table'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pricing for the Pro plan',
}

export default async function Page() {
  const lastUpdated = await getStarterKitLastUpdated()

  return (
    <Stack gap="12">
      <Container maxW="6xl" position="static">
        <Hero />

        <PricingTable lastUpdated={lastUpdated} />

        <CustomersSection />
      </Container>

      <CTA />

      <FAQ />
    </Stack>
  )
}
