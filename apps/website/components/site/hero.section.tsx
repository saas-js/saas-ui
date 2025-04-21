'use client'

import { Annoucement } from '@/components/annoucement'
import { Subheading } from '@/components/site/typography'
import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'

import { CopyButton } from '../copy-button'

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
            <Annoucement justifySelf="center" asChild>
              <Link href="#">
                Saas UI 3.0 is here!
                <HiArrowRight />
              </Link>
            </Annoucement>
            <Stack gap="5" maxW="4xl" alignItems="center">
              <Heading as="h1" fontSize="7xl" lineHeight="1" textWrap="balance">
                Build products customers love.
              </Heading>
              <Subheading>
                The complete toolkit for building premium SaaS applications.
                <br />
                Free component library, premium templates and comprehensive
                starter kits
                <br /> —everything you need to ship faster without compromising
                quality.
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
                <Link href="/docs">Documentation</Link>
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
