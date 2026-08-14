import React from 'react'

import SEO from '@/components/seo'
import { Box, Button, Flex, HStack, Link, Text } from '@chakra-ui/react'

import { ColorModeToggle } from './color-mode-toggle'
import { Nav } from './nav'
import Logo from './saas-ui'

export interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <HStack
        bg="purple.solid"
        color="purple.contrast"
        py="2"
        justifyContent="center"
      >
        <Text fontSize="sm">Build modern React apps with Saas UI Pro 🚀</Text>

        <Box>
          <Button asChild size="xs" variant="outline">
            <a href="https://saas-ui.dev">Learn more</a>
          </Button>
        </Box>
      </HStack>
      <Flex direction="column" flex="1" minH="0">
        <Flex py="4" px="6" borderBottomWidth="1px" align="center">
          <Box width="100px" mr="8" pos="absolute">
            <Link href="https://saas-ui.dev">
              <Logo />
            </Link>
          </Box>
          <Box flex="1" p="2"></Box>
          <HStack gap="2">
            <Nav />

            <ColorModeToggle />
          </HStack>
        </Flex>
        <Box flex="1">{children}</Box>
      </Flex>
    </>
  )
}
