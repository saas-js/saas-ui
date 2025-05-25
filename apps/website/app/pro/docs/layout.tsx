import { Header } from '@/components/pro/docs/header.section'
import {
  Box,
  Container,
  Flex,
  SkipNavContent,
  SkipNavLink,
} from '@chakra-ui/react'

import { MobileSidebarNav, SidebarStart } from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <Header />
      <main>
        <MobileSidebarNav />
        <Flex maxWidth="full">
          <SidebarStart />
          <Box
            position="fixed"
            top="0"
            left="300px"
            height="100%"
            borderRightWidth="1px"
            borderColor="border.subtle"
            pointerEvents="none"
            zIndex="layer-2"
          />
          <SkipNavContent />

          <Container maxW="6xl">{children}</Container>
        </Flex>
      </main>
    </>
  )
}
