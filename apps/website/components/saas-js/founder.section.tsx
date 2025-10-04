'use client'

import { Box, Container, Grid, Heading, Text } from '@saas-ui/react'
import { Persona } from '@saas-ui/react'

export function FounderSection() {
  return (
    <Box py="20" borderBottomWidth="1px" borderStyle="dashed">
      <Container maxW="8xl">
        <Heading as="h2" size="4xl" mb="1em">
          Stop reinventing the wheel.
        </Heading>

        <Grid templateColumns="1fr 1fr" gap="16">
          <Box>
            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              Every SaaS founder knows this frustrating cycle: spend weeks
              building authentication, weeks on billing, weeks making forms that
              don't look terrible. Rush through it to ship faster, then deal
              with the unmaintainable mess and technical debt later.
            </Text>

            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              I created Saas UI after going through this too many times myself.
              Instead of rebuilding the same foundation over and over — and
              wasting time on non-differentiating work — what if we built it
              once properly and made it available to everyone?
            </Text>
          </Box>
          <Box>
            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              The result? Developers get solid foundation to build on. Designers
              get a customizable starting point that doesn't force everything to
              look the same. Skip months of tedious work and get straight to
              building what makes your product unique.
            </Text>

            <Text textStyle="lg" mb="2em" fontWeight="medium" color="fg.subtle">
              Because your time is better spent validating ideas and creating
              features that actually differentiate your product, not wrestling
              with poorly built components, reinventing the wheel, and business
              logic that breaks every time you touch it.
            </Text>

            <Persona.Root>
              <Persona.Avatar src="/eelco128.jpg" name="Eelco Wiersma" />
              <Persona.Details>
                <Persona.Label>Eelco Wiersma</Persona.Label>
                <Persona.SecondaryLabel>Founder Saas UI</Persona.SecondaryLabel>
              </Persona.Details>
            </Persona.Root>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
