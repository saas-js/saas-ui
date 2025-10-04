import { CustomersSection } from '@/components/site/customers.section'
import { Octokit } from '@octokit/rest'
import { Container, Stack } from '@saas-ui/react'
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
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_TOKEN,
  })

  const nextjs = await octokit.repos.get({
    owner: 'saas-js',
    repo: 'saas-ui-pro-nextjs-starter-kit',
  })

  const tanstack = await octokit.repos.get({
    owner: 'saas-js',
    repo: 'vite-tanstack-router-starter-kit',
  })

  const nextjsUpdated = nextjs?.data.updated_at
    ? new Date(nextjs.data.updated_at)
    : null
  const tanstackUpdated = tanstack?.data.updated_at
    ? new Date(tanstack.data.updated_at)
    : null

  const dates = [nextjsUpdated, tanstackUpdated].filter(Boolean)

  const latestUpdate =
    dates.length > 0
      ? Math.max(...dates.map((date) => date!.getTime()))
      : new Date().getTime()

  return (
    <Stack gap="12">
      <Container maxW="6xl" position="static">
        <Hero />

        <PricingTable
          lastUpdated={new Date(latestUpdate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        />

        <CustomersSection />
      </Container>

      <CTA />

      <FAQ />
    </Stack>
  )
}
