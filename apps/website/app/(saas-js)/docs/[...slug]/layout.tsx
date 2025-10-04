import { Box, Container, HStack, SkipNavContent } from '@saas-ui/react'

import { source } from '../lib/source'
import { SidebarStart } from '../sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const tree = source.pageTree

  return (
    <>
      <SidebarStart tree={tree} />

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
    </>
  )
}
