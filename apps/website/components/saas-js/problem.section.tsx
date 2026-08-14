'use client';
import { Box, Container, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import { Section } from '#components/ui/section'

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
          <Heading as="h3" textStyle="4xl" minW={{ base: 'auto', md: '480px' }}>
            Built for how you actually build — with AI.
          </Heading>

          <Stack textStyle="lg" gap="2">
            <Text>
              Vibe coding and AI slop give you speed, then ugly UI and fragile
              code. These starter kits are pre-architected by a pro: clear
              structure, production-ready patterns, and top-tier components. So
              you and your AI tools can move fast without the mess.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Section.Root>
  )
}
