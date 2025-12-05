import { FooterSection } from '@/components/saas-js/footer.section'
import { HeaderSection } from '@/components/saas-js/header.section'
import { Stack } from '@chakra-ui/react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Saas.js',
    template: '%s | Saas.js',
  },
  description: 'Building blocks for top tier SaaS products',
  openGraph: {
    images: '/img/og-saasjs.png',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      gap="8"
      bg="bg.muted"
      _dark={{ bg: 'bg' }}
      css={{
        paddingTop: '64px',
        '&:has([data-announcement])': {
          paddingTop: '105px',
        },
      }}
    >
      <HeaderSection />
      {children}
      <FooterSection />
    </Stack>
  )
}
