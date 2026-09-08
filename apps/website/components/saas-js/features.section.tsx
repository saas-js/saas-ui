import { Section } from '#components/ui/section'
import {
  Box,
  Container,
  Grid,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'

const featureGroups = [
  {
    title: 'Architecture agents can follow',
    visual: 'structure',
    span: 6,
    description:
      'A repeatable path from route to query gives agents clear boundaries and fewer ways to invent the wrong architecture.',
  },
  {
    title: 'SaaS foundations already connected',
    visual: 'foundations',
    span: 6,
    description:
      'Auth, workspaces, billing, data, UI, and email arrive connected, so agents extend proven systems instead of rebuilding them.',
  },
  {
    title: 'Feedback that catches drift',
    visual: 'backpressure',
    span: 6,
    description:
      'Types, validation, tests, and CI reject weak changes early and turn drift into feedback agents can act on.',
  },
  {
    title: 'Support when the codebase changes',
    visual: 'guidance',
    span: 6,
    description:
      'Focused docs, ongoing updates, and direct support preserve the codebase’s intent as your product and agents evolve.',
  },
] as const

export function FeaturesSection() {
  return (
    <Section.Root
      id="agent-mechanisms"
      bg="transparent"
      color="fg"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor="border"
      py={{ base: '20', md: '28' }}
    >
      <Container maxW="8xl">
        <Heading
          as="h2"
          textStyle={{ base: '4xl', md: '5xl' }}
          lineHeight="1.08"
          letterSpacing="-0.035em"
          fontWeight="medium"
          textWrap="balance"
          maxW="6xl"
          mb={{ base: '14', md: '24' }}
        >
          Give agents a codebase that pushes back.{' '}
          <Text
            as="span"
            color="fg.muted"
            font="inherit"
            letterSpacing="inherit"
          >
            Clear paths, working foundations, and fast feedback make reliable
            agent work repeatable.
          </Text>
        </Heading>
      </Container>

      <Box position="relative">
        <Box
          position="absolute"
          insetInline="0"
          top="0"
          borderTopWidth="1px"
          borderColor="border"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          insetInline="0"
          top="25%"
          borderTopWidth="1px"
          borderColor="border"
          pointerEvents="none"
          display={{ base: 'block', lg: 'none' }}
        />
        <Box
          position="absolute"
          insetInline="0"
          top="50%"
          borderTopWidth="1px"
          borderColor="border"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          insetInline="0"
          top="75%"
          borderTopWidth="1px"
          borderColor="border"
          pointerEvents="none"
          display={{ base: 'block', lg: 'none' }}
        />
        <Box
          position="absolute"
          insetInline="0"
          bottom="0"
          borderBottomWidth="1px"
          borderColor="border"
          pointerEvents="none"
        />

        <Container maxW="8xl">
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }}
            borderLeftWidth="1px"
            borderColor="border"
          >
            {featureGroups.map((group) => (
              <Box
                key={group.title}
                gridColumn={{ base: '1 / -1', lg: `span ${group.span}` }}
                borderRightWidth="1px"
                borderColor="border"
                overflow="hidden"
                bg="transparent"
                minH={{ base: '560px', md: '640px' }}
                display="flex"
                flexDirection="column"
                position="relative"
              >
                <MechanismVisual type={group.visual} />

                <Stack
                  mt="auto"
                  p={{ base: '6', md: '8' }}
                >
                  <Stack
                    gap="3"
                    align="flex-start"
                    maxW="md"
                  >
                    <Heading
                      as="h3"
                      textStyle={{ base: 'xl', md: '2xl' }}
                      fontWeight="medium"
                      letterSpacing="-0.025em"
                    >
                      {group.title}
                    </Heading>
                    <Text
                      color="fg.muted"
                      textStyle="md"
                      lineHeight="1.6"
                      maxW="md"
                    >
                      {group.description}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>
    </Section.Root>
  )
}

function MechanismVisual(props: {
  type: (typeof featureGroups)[number]['visual']
}) {
  if (props.type === 'structure') return <StructureVisual />
  if (props.type === 'foundations') return <FoundationsVisual />
  if (props.type === 'backpressure') return <BackpressureVisual />
  return <GuidanceVisual />
}

function Figure(props: {
  label: string
  number: string
  children: React.ReactNode
}) {
  return (
    <Box
      minH={{ base: '300px', md: '380px' }}
      position="relative"
      color="fg.muted"
    >
      <HStack
        position="absolute"
        top={{ base: '5', md: '7' }}
        insetInline={{ base: '6', md: '8' }}
        justify="space-between"
        zIndex="1"
      >
        <Text
          fontFamily="mono"
          fontSize="2xs"
          color="fg.subtle"
          textTransform="uppercase"
          letterSpacing="0.12em"
        >
          Fig {props.number}
        </Text>
        <Text
          fontFamily="mono"
          fontSize="2xs"
          color="fg.subtle"
          textTransform="uppercase"
          letterSpacing="0.12em"
        >
          {props.label}
        </Text>
      </HStack>
      <Box
        position="absolute"
        inset="0"
        display="grid"
        placeItems="center"
        px={{ base: '8', md: '14' }}
        pt="12"
      >
        {props.children}
      </Box>
    </Box>
  )
}

function StructureVisual() {
  return (
    <Figure label="Structure" number="01">
      <Image
        src="/img/saas-js-mechanism-structure.svg"
        alt=""
        width="full"
        maxW="620px"
        loading="lazy"
      />
    </Figure>
  )
}

function FoundationsVisual() {
  return (
    <Figure label="Foundations" number="02">
      <Image
        src="/img/saas-js-mechanism-foundations.svg"
        alt=""
        width="full"
        maxW="500px"
        loading="lazy"
      />
    </Figure>
  )
}

function BackpressureVisual() {
  return (
    <Figure label="Backpressure" number="03">
      <Image
        src="/img/saas-js-mechanism-backpressure.svg"
        alt=""
        width="full"
        maxW="500px"
        loading="lazy"
      />
    </Figure>
  )
}

function GuidanceVisual() {
  return (
    <Figure label="Guidance" number="04">
      <Image
        src="/img/saas-js-mechanism-guidance.svg"
        alt=""
        width="full"
        maxW="620px"
        loading="lazy"
      />
    </Figure>
  )
}
