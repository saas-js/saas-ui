'use client'

import { Box, Container, Grid, Heading, Text } from '@chakra-ui/react'

import { Persona } from '#components/ui/persona'

export function FounderSection() {
  return (
    <Box py="20" borderBottomWidth="1px" borderStyle="dashed">
      <Container maxW="8xl">
        <Heading as="h2" size="4xl" mb="1em">
          Architecture matters more than ever.
        </Heading>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="16">
          <Box>
            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              AI agents can now scaffold an entire app in minutes. But here's
              what most people are discovering the hard way: generated code
              without solid architecture becomes an unmaintainable mess just as
              fast. The bottleneck was never typing speed — it's the foundation
              you're building on.
            </Text>

            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              I originally created Saas.js to help developers and designers ship
              high quality apps with speed on solid foundations. In an agentic
              world, this became even more important. AI can generate code at
              scale, but it needs well-structured, composable building blocks
              and guardrails to produce anything worthwhile.
            </Text>
          </Box>
          <Box>
            <Text textStyle="lg" mb="1em" fontWeight="medium" color="fg.subtle">
              Saas.js gives you that foundation. A production-ready starter kit
              with the architecture, patterns, and guardrails that let your
              agents ship features one-shot — without hand-holding. Everything
              from auth to billing to UI, built once and built right.
            </Text>

            <Text textStyle="lg" mb="2em" fontWeight="medium" color="fg.subtle">
              The teams shipping fastest aren't the ones generating the most
              code — they're the ones with the strongest foundations. Your time
              is better spent on what makes your product unique, not debugging
              the output of yet another prompt.
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
