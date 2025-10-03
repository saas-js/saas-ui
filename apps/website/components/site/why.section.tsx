'use client'

import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Section,
  Span,
  Stack,
  Text,
} from '@saas-ui/react'

export const WhySection = () => {
  return (
    <Section.Root py="20">
      <Container maxW="8xl">
        <Stack
          gap="16"
          flexDirection={{
            base: 'column',
            lg: 'row',
          }}
          alignItems="flex-start"
        >
          <Heading as="h3" textStyle="4xl" minW="400px">
            Why choose Saas UI?
          </Heading>

          <Grid
            gridTemplateColumns={{
              base: '1fr',
              lg: '1fr 1fr',
            }}
            textStyle="lg"
            gap="12"
          >
            <Box>
              <Heading as="h4" textStyle="lg">
                Founder that cares
              </Heading>
              <Text color="fg.subtle" textStyle="md" textWrap="pretty">
                We go to great lengths to make sure you're happy with the
                product. We're here to help you succeed. The level of support
                you'll get is unmatched.
              </Text>
            </Box>
            <Box>
              <Heading as="h4" textStyle="lg">
                Built on 20 Years of Experience
              </Heading>
              <Text color="fg.subtle" textStyle="md" textWrap="pretty">
                Saas UI is built on two decades of building, scaling, and
                maintaining real B2B applications. Architecture that scales.
                Code patterns proven in production.
              </Text>
            </Box>

            <Box>
              <Heading as="h4" textStyle="lg">
                Quality that AI can't generate.
              </Heading>
              <Text color="fg.subtle" textStyle="md" textWrap="pretty">
                AI can generate code and scaffold components. What it can't do
                is make strategic design decisions, craft cohesive experiences,
                or build systems with taste.
              </Text>
            </Box>

            <Box>
              <Heading as="h4" textStyle="lg">
                Saas UI has been founded in 2021
              </Heading>
              <Text color="fg.subtle" textStyle="md" textWrap="pretty">
                We don't plan to go anywhere and are in it for the long term,
                unlike other starter kits that come and go with the hype train.
              </Text>
            </Box>
          </Grid>
        </Stack>
      </Container>
    </Section.Root>
  )
}
