import { Box, Container, Heading, Stack } from '@chakra-ui/react'

import { HeroActions } from './hero.ui'

export function GetStartedSection({
  docsHref = '/docs',
}: {
  /** Docs entry point for the kit this page sells. */
  docsHref?: string
}) {
  return (
    <Box as="section" py={{ base: '16', md: '28' }} borderTopWidth="1px">
      <Container maxW="8xl">
        <Stack align="center" textAlign="center" gap={{ base: '8', md: '10' }}>
          <Heading
            as="h2"
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            lineHeight="1.05"
            letterSpacing="tight"
            fontWeight="medium"
            textWrap="balance"
          >
            Start shipping features today.
          </Heading>
          <HeroActions docsHref={docsHref} justify="center" />
        </Stack>
      </Container>
    </Box>
  )
}
