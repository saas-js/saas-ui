import { Flex, SkipNavContent, SkipNavLink } from '@saas-ui/react'

import { Header } from './header'
import { MobileSidebarNav } from './sidebar'

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
        <MobileSidebarNav />
        <Flex maxWidth="full" minH="0">
          <SkipNavContent />

          {children}
        </Flex>
      </main>
    </>
  )
}
