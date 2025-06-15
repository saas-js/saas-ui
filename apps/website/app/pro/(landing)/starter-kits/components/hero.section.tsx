'use client'

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
                SaaS starter kits for building products your customers will
                actually love
              </Heading>
              <Subheading>
                Production-ready Next.js and Tanstack Router starter kits with
                beautiful UI, seamless UX, and enterprise-grade architecture.
                <br />
                Built with Saas UI Pro, tRPC, Postgres, Drizzle, and Stripe.
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
                <Link href="/pro/pricing">Buy now</Link>
              </Button>
              <Button size="lg" minW="180px" asChild variant="outline">
                <Link href="/docs/starter-kits">View documentation</Link>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
