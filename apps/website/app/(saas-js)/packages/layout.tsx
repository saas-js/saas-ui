import { Flex, SkipNavContent, SkipNavLink } from '@chakra-ui/react'

import { source } from '../docs/lib/source'
import { Header } from '../docs/header'
import { MobileSidebarNav } from '../docs/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <Header />
      <main
        style={
          {
            '--header-height': '54px',
            '--content-height': 'calc(100dvh - var(--header-height))',
          } as any
        }
      >
        <MobileSidebarNav tree={source.pageTree} />
        <Flex maxWidth="full" minH="0">
          <SkipNavContent />

          {children}
        </Flex>
      </main>
    </>
  )
}
