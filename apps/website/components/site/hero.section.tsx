'use client'

import { ActionArrow } from '@/components/action-arrow'
import { Annoucement } from '@/components/annoucement'
import { Subheading } from '@/components/site/typography'
import { Box, Button, Container, Heading, Stack } from '@saas-ui/react'
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
            <Annoucement justifySelf="center" asChild>
              <Link href="/changelog/3.0">
                Saas UI 3.0 is here!
                <ActionArrow />
              </Link>
            </Annoucement>
            <Stack gap="5" maxW="4xl" alignItems="center">
              <Heading as="h1" fontSize="7xl" lineHeight="1" textWrap="balance">
                Launch polished SaaS apps in half the time
              </Heading>
              <Subheading>
                Complete toolkit with 60+ free React components, premium
                templates and fullstack starter kits. Everything you need to
                ship beautiful, consistent B2B products without the design
                guesswork.
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
                <Link href="/components">Browse components</Link>
              </Button>
              <Button
                size="lg"
                minW="180px"
                asChild
                variant="outline"
                colorPalette="neutral"
              >
                <Link href="/pro/starter-kits">View starter kits</Link>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
