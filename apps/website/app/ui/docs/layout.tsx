import { Header } from '@/components/docs/header'
import { source } from '@/lib/source'
import {
  Box,
  Container,
  Flex,
  HStack,
  SkipNavContent,
  SkipNavLink,
} from '@saas-ui/react'

import { MobileSidebarNav, SidebarStart } from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const tree = source.pageTree

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
