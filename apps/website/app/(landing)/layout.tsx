'use client'

import { FooterSection } from '@/components/site/footer.section'
import { HeaderSection } from '@/components/site/header.section'
import { Stack } from '@saas-ui/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack gap="8" bg="bg.muted" _dark={{ bg: 'bg' }}>
      <HeaderSection />
      {children}
      <FooterSection />
    </Stack>
  )
}
