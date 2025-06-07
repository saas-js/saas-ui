import { allDocs } from '@/.content-collections/generated'
import { Header } from '@/components/docs/header'
import { source } from '@/lib/source'
import {
  Box,
  Container,
  Flex,
  HStack,
  SkipNavContent,
  SkipNavLink,
} from '@chakra-ui/react'

import { MobileSidebarNav, SidebarStart } from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const tree = source.pageTree

  console.log(tree)

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

          <Container maxW="6xl">
            <HStack alignItems="start">{children}</HStack>
          </Container>
        </Flex>
      </main>
    </>
  )
}
