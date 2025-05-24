import { Header } from '@/components/pro/docs/header.section'
import { Container, SkipNavContent, SkipNavLink } from '@chakra-ui/react'

import { MobileSidebarNav, SidebarStart } from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <Header />
      <main>
        <MobileSidebarNav />
        <Container display="flex">
          <SidebarStart />
          <SkipNavContent />
          {children}
        </Container>
      </main>
    </>
  )
}
