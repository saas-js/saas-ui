'use client'

import {
  Box,
  Container,
  HStack,
  Heading,
  Section,
  Stack,
  Text,
} from '@saas-ui/react'

export const ProblemSection = () => {
  return (
    <Section.Root
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderStyle="dashed"
    >
      <Container
        maxW="7xl"
        borderLeftWidth="1px"
        borderRightWidth="1px"
        borderStyle="dashed"
        py="20"
      >
        <Stack
          gap="16"
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          alignItems="flex-start"
        >
          <Heading as="h3" textStyle="4xl" minW="480px">
            Development has never been faster. But speed has a cost.
          </Heading>

          <Stack textStyle="lg" gap="2">
            <Text>
              Generic interfaces. Fragile architecture. Disposable code. When
              everything can be built quickly, the products that win are the
              ones built with intention.
            </Text>
            <Text>
              Your product needs to signal quality from the first interaction.
              That requires craftsmanship—intentional design decisions,
              considered architecture, polished details. Not as nostalgia, but
              as strategy.
            </Text>

            <Text fontWeight="medium">
              We've spent 20 years learning what that looks like. You get it
              from day one.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Section.Root>
  )
}
