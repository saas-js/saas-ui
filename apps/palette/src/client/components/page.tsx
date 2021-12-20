import React from 'react'
import {
  Flex,
  Box,
  Heading,
  Text,
  HStack,
  Container,
  Spinner,
  useColorMode,
} from '@chakra-ui/react'

import Logo from '/public/saasui.svg'
import LogoDark from '/public/saasui-dark.svg'
import { ColorModeToggle } from './color-mode-toggle'

export interface PageProps {
  title?: React.ReactNode
  description?: React.ReactNode
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
    <Flex direction="column" flex="1" minH="0">
      <Flex py="2" px="4" borderBottomWidth="1px" align="center">
        <Box width="100px" mr="8" pos="absolute">
          {colorMode === 'dark' ? <Logo /> : <LogoDark />}
        </Box>
        <Box flex="1" p="2"></Box>
        <HStack>
          {nav}

          <ColorModeToggle />
        </HStack>
      </Flex>
      <Box flex="1" overflow="auto">
        <Container maxW={containerWidth} p="0" pr="4" pt="8">
          <Box mb="16">
            <Heading size="lg">{title}</Heading>
            <Text opacity="0.6">{description}</Text>
          </Box>
          <Box>{content}</Box>
        </Container>
      </Box>
    </Flex>
  )
}
