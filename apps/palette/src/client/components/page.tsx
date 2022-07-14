import React from 'react'
import {
  Flex,
  Box,
  Heading,
  Text,
  Container,
  Spinner,
  Stack,
} from '@chakra-ui/react'

import SEO from '@/components/seo'

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
    <>
      <SEO title={title} description={description}></SEO>
      <Flex direction="column" flex="1" minH="0">
        <Box flex="1" overflow="auto">
          <Container maxW={containerWidth} p="0" pr="4" pt="8">
            <Stack mb="6">
              <Heading size="xl">{title}</Heading>
              <Text opacity="0.6" fontSize="1.4em">
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
