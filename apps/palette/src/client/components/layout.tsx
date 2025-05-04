import React from 'react'

import { Box, Flex, HStack, Link } from '@chakra-ui/react'

import { ColorModeToggle } from './color-mode-toggle'
// import {
//   Banner,
//   BannerActions,
//   BannerContent,
//   BannerDescription,
// } from '@saas-ui/react'
import { Nav } from './nav'
import Logo from './saas-ui'

export interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <Banner
        variant="solid"
        colorScheme="purple"
        py="2"
        justifyContent="center"
      >
        <BannerDescription fontSize="sm">
          Build modern React apps with Saas UI Pro 🚀
        </BannerDescription>

        <BannerActions>
          <Button as="a" href="https://saas-ui.dev" size="xs" variant="outline">
            Learn more
          </Button>
        </BannerActions>
      </Banner> */}
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
