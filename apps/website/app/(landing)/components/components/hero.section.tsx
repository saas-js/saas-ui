'use client'

import { CopyButton } from '@/components/copy-button'
import { Subheading } from '@/components/site/typography'
import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react'
import Link from 'next/link'

export const HeroSection = () => {
  return (
    <Box px="8">
      <Box pt="32" overflow="hidden" position="relative">
        <Container maxW="8xl" zIndex="1" height="100%">
          <Stack
            gap={{ base: '5', md: '8' }}
            mb="20"
            alignItems="center"
            textAlign="center"
          >
            <Stack gap="5" maxW="4xl" alignItems="center">
              <Heading as="h1" fontSize="7xl" lineHeight="1" textWrap="balance">
                The React component library for startups.
              </Heading>
              <Subheading>
                Saas UI is an open source React component system built on Chakra
                UI. Designed to help you build beautiful, consistent SaaS
                applications.
              </Subheading>
            </Stack>

            <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
              <Button
                size="lg"
                minW="180px"
                asChild
                variant="glass"
                colorPalette="accent"
              >
                <Link href="/docs/components/overview">
                  View all components
                </Link>
              </Button>
              <CopyButton
                variant="outline"
                size="lg"
                value="npm i @saas-ui/react"
              >
                &gt; npm i @saas-ui/react
              </CopyButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
