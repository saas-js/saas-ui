'use client'

import { Box, Container, Grid, Heading, Text } from '@chakra-ui/react'

import { Persona } from '#components/ui/persona'

export function FounderSection() {
  return (
    <Box as="section" py="20" borderBottomWidth="1px" borderStyle="dashed">
      <Container maxW="8xl">
        <Heading as="h2" size="4xl" mb="1em" textWrap="balance">
          Architecture is the shared language.
        </Heading>

        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={{ base: '6', md: '16' }}
        >
          <Box>
            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              AI agents can scaffold an app in minutes. They can also multiply
              inconsistency just as quickly. Once every feature invents its own
              patterns, the codebase becomes harder for developers and agents to
              understand.
            </Text>
          </Box>
          <Box>
            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              SaaS.js brings authentication, workspaces, billing, data access,
              and UI together in a production-ready TanStack Start codebase.
              Strict types and tests turn mistakes into immediate feedback, so
              an agent can make a bounded change and you can verify it.
            </Text>

            <Persona.Root>
              <Persona.Avatar src="/eelco128.jpg" name="Eelco Wiersma" />
              <Persona.Details>
                <Persona.Label>Eelco Wiersma</Persona.Label>
                <Persona.SecondaryLabel>Founder, SaaS.js</Persona.SecondaryLabel>
              </Persona.Details>
            </Persona.Root>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
