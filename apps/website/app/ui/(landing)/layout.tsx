'use client'

import { FooterSection } from '@/components/site/footer.section'
import { HeaderSection } from '@/components/site/header.section'
import { Stack } from '@chakra-ui/react'

import { ThemePanel } from '#components/theme/theme-panel'
import { ThemeProvider } from '#components/theme/theme-provider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Stack
        gap="8"
        minH="100dvh"
        bg="bg.muted"
        _dark={{ bg: 'bg' }}
        css={{
          paddingTop: '64px',
          '&:has([data-announcement])': {
            paddingTop: '105px',
          },
        }}
      >
        <ThemePanel />
        <HeaderSection />
        {children}
        <FooterSection />
      </Stack>
    </ThemeProvider>
  )
}
