import { source } from '@/lib/source'
import { Flex, SkipNavContent, SkipNavLink } from '@saas-ui/react'

import { Header } from './header'
import { MobileSidebarNav } from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <Header />
      <main>
        <MobileSidebarNav />
        <Flex maxWidth="full">
          <SkipNavContent />

          {children}
        </Flex>
      </main>
    </>
  )
}
