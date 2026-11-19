'use client'

import { Box, Container, Grid, Heading, Text } from '@chakra-ui/react'

import { Persona } from '#components/ui/persona'

export function FounderSection() {
  return (
    <Box py={{ base: '16', md: '24' }} borderTopWidth="1px">
      <Container maxW="8xl">
        <Heading as="h2" size="4xl" mb="1em">
          Architecture matters more than ever.
        </Heading>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="16">
          <Box>
            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              AI agents can scaffold an entire app in minutes. Without a solid
              architecture, that code turns into an unmaintainable mess just as
              fast. Typing speed was never the bottleneck. The foundation is.
            </Text>

            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              I started Saas.js to help developers and designers ship quality
              apps on solid foundations. Now that agents write more of the code,
              that matters more than it ever did.
            </Text>
          </Box>
          <Box>
            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              Saas.js is that foundation: a production-ready starter kit with
              the patterns and guardrails agents need to ship features in one
              shot. Auth, billing, UI and the rest, built once and built right.
            </Text>

            <Text textStyle="lg" mb="2em" fontWeight="medium" color="fg.subtle">
              The teams shipping fastest don&apos;t generate the most code. They
              have the strongest foundations. Spend your time on what makes your
              product unique, not on debugging another prompt.
            </Text>

            <Persona.Root>
              <Persona.Avatar src="/eelco128.jpg" name="Eelco Wiersma" />
              <Persona.Details>
                <Persona.Label>Eelco Wiersma</Persona.Label>
                <Persona.SecondaryLabel>Founder Saas.js</Persona.SecondaryLabel>
              </Persona.Details>
            </Persona.Root>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
