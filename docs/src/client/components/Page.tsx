import React from 'react'
import { Flex, Box, Heading, Container, Spinner } from '@chakra-ui/react'

export interface PageProps {
  title?: string
  children?: React.ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

export default function Page({
  title,
  isLoading,
  fullWidth,
  children,
}: PageProps) {
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
        <Box flex="1" p="2">
          <Heading as="h2" size="md">
            {title}
          </Heading>
        </Box>
      </Flex>
      <Box flex="1" overflow="auto">
        <Container maxW={containerWidth} p="0" pr="4" pt="8">
          <Box>{content}</Box>
        </Container>
      </Box>
    </Flex>
  )
}
