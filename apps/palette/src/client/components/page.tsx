import React from 'react'
import {
  Flex,
  Box,
  Heading,
  Text,
  HStack,
  Container,
  Spinner,
  Link,
  useColorMode,
  Stack,
} from '@chakra-ui/react'

import { ColorModeToggle } from './color-mode-toggle'
import SEO from '@/components/seo'

import Logo from './saas-ui'

export interface PageProps {
  title?: string
  description?: string
  nav?: React.ReactNode
  children?: React.ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

export default function Page({
  title,
  description,
  nav,
  isLoading,
  fullWidth,
  children,
}: PageProps) {
  const { colorMode } = useColorMode()
  let content
  if (isLoading) {
    content = <Spinner justifySelf="center" />
  } else {
    content = children
  }

  let containerWidth = 'container.lg'
  if (fullWidth) {
    containerWidth = '100%'
  }

  return (
    <>
      <SEO title={title} description={description}></SEO>
      <Flex direction="column" flex="1" minH="0">
        <Flex py="4" px="6" borderBottomWidth="1px" align="center">
          <Box width="100px" mr="8" pos="absolute">
            <Link href="https://saas-ui.dev">
              <Logo />
            </Link>
          </Box>
          <Box flex="1" p="2"></Box>
          <HStack spacing="2">
            {nav}

            <ColorModeToggle />
          </HStack>
        </Flex>
        <Box flex="1" overflow="auto">
          <Container maxW={containerWidth} p="0" pr="4" pt="8">
            <Stack mb="6">
              <Heading size="xl">{title}</Heading>
              <Text opacity="0.6" fontSize="xl">
                {description}
              </Text>
            </Stack>
            <Box py="10">{content}</Box>
          </Container>
        </Box>
      </Flex>
    </>
  )
}
