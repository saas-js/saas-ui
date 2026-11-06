import { CustomersSection } from '@/components/site/customers.section'
import { createSjsMetadata } from '@/lib/saas-js/metadata'
import { getStarterKitLastUpdated } from '@/lib/starter-kit-updated-at'
import { Container, Stack } from '@chakra-ui/react'
import type { Metadata } from 'next'

import { FAQ } from './components/faq'
import { Hero } from './components/hero'
import { PricingTable } from './components/pricing-table'

export const metadata: Metadata = createSjsMetadata({
  title: 'Pricing',
  description: 'Pricing for the Pro plan',
  path: '/pricing',
})

export default async function Page() {
  const lastUpdated = await getStarterKitLastUpdated()

  return (
    <Stack gap="12">
      <Container maxW="8xl" position="static">
        <Hero />

        <PricingTable lastUpdated={lastUpdated} />

        <CustomersSection />
      </Container>

      <FAQ />
    </Stack>
  )
}
