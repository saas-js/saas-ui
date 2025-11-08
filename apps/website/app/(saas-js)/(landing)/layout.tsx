'use client'

import { FooterSection } from '@/components/saas-js/footer.section'
import { HeaderSection } from '@/components/saas-js/header.section'
import { Stack } from '@chakra-ui/react'

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
