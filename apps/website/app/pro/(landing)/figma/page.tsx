import * as React from 'react'

// import { Testimonials } from '@/components/testimonials'

import { LinkButton } from '@/components/link-button'
import { CustomersSection } from '@/components/site/customers.section'
import { Subheading } from '@/components/site/typography'
import {
  AspectRatio,
  Box,
  ButtonGroup,
  Card,
  Container,
  HStack,
  Heading,
  Icon,
  Stack,
  type StackProps,
  Text,
} from '@saas-ui/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { FaFigma } from 'react-icons/fa'
import { LuArrowRight } from 'react-icons/lu'

export const metadata: Metadata = {
  title: 'Figma Design System & UI Kit',
  description:
    'Professionally crafted Figma design system and UI kit for designing beautiful products at any scale.',
}

export default function FigmaPage() {
  return (
    <Container maxW="container.xl">
      <Box mb={8} w="full" position="relative" overflow="hidden" zIndex="1">
        <FigmaHero />

        <CustomersSection />

        <Stats />

        <FigmaEmbed />

        <CTA />

        {/* <Testimonials /> */}
      </Box>
    </Container>
  )
}

const FigmaHero = () => {
  return (
    <Stack alignItems="center" mt="24" pt="12" gap="4">
      <Box
        as="span"
        fontSize="xs"
        borderWidth="1px"
        borderRadius="full"
        px="4"
        py="1"
        fontWeight="medium"
        textAlign="center"
      >
        Saas UI Figma Kit ・ v1.2
      </Box>

      <Stack textAlign="center" alignItems="center" gap="8">
        <Stack gap="5" maxW="4xl" alignItems="center">
          <Heading as="h1" fontSize="7xl" lineHeight="1" textWrap="balance">
            The Figma design system and UI kit for SaaS products
          </Heading>
          <Subheading>
            Align design and dev teams with 50+ primitive components and a
            growing collection of templates and blocks available as Figma assets
            and React components.
          </Subheading>
        </Stack>

        <ButtonGroup
          gap={4}
          alignItems="stretch"
          justifyContent="stretch"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <LinkButton
            variant="glass"
            colorPalette="accent"
            size="lg"
            href="/pricing/figma"
          >
            Buy Figma Pro
          </LinkButton>
          <LinkButton
            size="lg"
            href="https://www.figma.com/file/XsBODCq9lrqBAwReJqikbR/Saas-UI-Theme-1.2?type=design&node-id=2106-2109&mode=design"
            target="_blank"
            variant="outline"
          >
            <Icon>
              <FaFigma />
            </Icon>
            Preview{' '}
            <Icon
              css={{
                transitionProperty: 'common',
                transitionDuration: 'fast',
                '.chakra-button:hover &': {
                  transform: 'translate(4px)',
                },
              }}
            >
              <LuArrowRight />
            </Icon>
          </LinkButton>
        </ButtonGroup>

        <Box
          role="group"
          width="80vw"
          maxW="1200px"
          margin="0 auto"
          alignItems="center"
          position="relative"
          zIndex="2"
        >
          <AspectRatio ratio={1100 / 698} _dark={{ display: 'none' }}>
            <Image
              src="/img/figma/figma.png"
              alt="Screenshot of a Saas UI Figma Kit"
              width={1200}
              height={698}
              quality="85"
              priority
            />
          </AspectRatio>
          <AspectRatio ratio={1100 / 698} _light={{ display: 'none' }}>
            <Image
              src="/img/figma/figma-dark.png"
              alt="Screenshot of a Saas UI Figma Kit"
              width={1200}
              height={698}
              quality="85"
              priority
            />
          </AspectRatio>
        </Box>
      </Stack>
    </Stack>
  )
}

const StatsCard = ({
  title,
  children,
  description,
  gridColumn,
  ...rest
}: {
  title: string
  children: React.ReactNode
  description: React.ReactNode
  gridColumn: string
} & StackProps) => {
  return (
    <Card.Root
      gridColumn={gridColumn}
      borderRadius="lg"
      gap="2"
      py="4"
      px="4"
      bg="bg.subtle"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="inherit"
      position="relative"
      overflow="hidden"
      _dark={{
        borderColor: 'transparent',
      }}
    >
      <Card.Body>
        <Stack {...rest}>
          <Box>
            <Heading
              as="h3"
              color="accent.solid"
              fontWeight="medium"
              fontSize="lg"
              mb="2"
              _dark={{
                color: 'indigo.300',
              }}
            >
              {title}
            </Heading>

            <Text fontWeight="medium" fontSize="1.3em" maxW="80%">
              {description}
            </Text>
          </Box>

          {children}
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

const Stats = () => {
  return (
    <Container maxW="container.xl" py="12">
      <Stack
        alignItems="start"
        justifyContent="space-between"
        flexDirection={{ base: 'column', lg: 'row' }}
        mb="8"
      >
        <Heading maxW="400px" fontSize="3xl" mb="4">
          Everything you need to get your design system of the ground. Fast.
        </Heading>

        <HStack>
          <LinkButton
            href="/pricing/figma"
            variant="glass"
            colorPalette="accent"
            size="md"
          >
            Buy now
          </LinkButton>
          <LinkButton
            size="md"
            href="#community-library"
            target="_blank"
            variant="outline"
            borderColor="blackAlpha.400"
            _dark={{
              borderColor: 'whiteAlpha.400',
            }}
            _hover={{
              bg: 'whiteAlpha.200',
            }}
          >
            <Icon>
              <FaFigma />
            </Icon>
            Preview
            <Icon
              css={{
                transitionProperty: 'common',
                transitionDuration: 'fast',
                '.chakra-button:hover &': {
                  transform: 'translate(4px)',
                },
              }}
            >
              <LuArrowRight />
            </Icon>
          </LinkButton>
        </HStack>
      </Stack>

      <Box
        display="grid"
        gridTemplateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }}
        gap={{
          base: '32px 0',
          md: 8,
        }}
      >
        <StatsCard
          title="250+ variables"
          description="Create consistent designs with tokens and variables."
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          alignItems="center"
          gridColumn="span 3"
        >
          <Box
            width={{
              base: '100%',
              md: '240px',
            }}
            height={{ base: '140px', md: '280px' }}
          >
            <Box
              overflow="hidden"
              borderRadius="md"
              position="absolute"
              boxShadow="xl"
              right={{ base: 'auto', md: 8 }}
              bottom={{ base: '-220px', md: 'auto' }}
              _dark={{ display: 'none' }}
            >
              <Image
                src="/img/figma/variables-light.png"
                width="229"
                height="369"
                alt="Variables preview"
              />
            </Box>
            <Box
              overflow="hidden"
              borderRadius="md"
              position="absolute"
              boxShadow="xl"
              right={{ base: 'auto', md: 8 }}
              bottom={{ base: '-220px', md: 'auto' }}
              _light={{ display: 'none' }}
            >
              <Image
                src="/img/figma/variables.png"
                width="229"
                height="369"
                alt="Variables preview"
              />
            </Box>
          </Box>
        </StatsCard>
        <StatsCard
          title="2000+ variants"
          description="All components are crafted using Auto Layout and variants that match their code counter parts. "
          gridColumn="span 3"
        >
          <Box width="100%" height="140px">
            <Box
              overflow="hidden"
              borderRadius="md"
              position="absolute"
              boxShadow="xl"
              right="0"
            >
              <Image
                src="/img/figma/variants.png"
                width="608"
                height="75"
                alt="Variants preview"
              />
            </Box>
          </Box>
        </StatsCard>
        <StatsCard
          title="50+ blocks and examples"
          description={
            <>
              Includes ready-to-use pages and components. All available in Figma
              and React. <br />
              <Text as="span" color="muted" fontSize="sm" fontWeight="normal">
                * New blocks added regularly.
              </Text>
            </>
          }
          gridColumn="span 4"
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          alignItems="center"
        >
          <Box
            width="620px"
            height={{
              base: '150px',
              md: '300px',
            }}
          >
            <Box
              position="absolute"
              right={{
                base: 'auto',
                md: '-200px',
              }}
              bottom={{
                base: '-8',
                md: '-8',
              }}
              left={{
                base: '4',
                md: 'auto',
              }}
            >
              <Image
                src="/img/figma/blocks.png"
                width="620"
                height="400"
                quality={100}
                alt="Example blocks"
              />
            </Box>
          </Box>
        </StatsCard>
        <StatsCard
          title="2000+ icons"
          description="Icons for every use case. Multiple styles from nine free to use icon packs."
          gridColumn={{
            base: 'span 3',
            md: 'span 2',
          }}
          flexDirection="column-reverse"
        >
          <Box height="160px">
            <Box
              position="absolute"
              top="-100px"
              left="0"
              width="100%"
              _dark={{ display: 'none' }}
            >
              <Image
                src="/img/figma/icons-light.svg"
                width="400"
                height="400"
                quality="100"
                alt="Icon preview"
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Box
              position="absolute"
              top="-100px"
              left="0"
              width="100%"
              _light={{ display: 'none' }}
            >
              <Image
                src="/img/figma/icons.svg"
                width="400"
                height="400"
                quality="100"
                alt="Icon preview"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>
        </StatsCard>
      </Box>
    </Container>
  )
}

const FigmaEmbed = () => {
  return (
    <Box py="40">
      <a id="community-library" />
      <Box mb="8">
        <Heading textAlign="center" size="3xl" fontWeight="medium" mb="2">
          Free community library
        </Heading>
        <Text textAlign="center" color="fg.subtle" textStyle="xl">
          Try out our free community library. Used by 1000+ designers.
        </Text>
      </Box>
      <Box position="relative" maxW="container.xl" mx="auto">
        <LinkButton
          href="https://www.figma.com/community/file/1257658419283927894"
          position="absolute"
          top="4"
          right="4"
          left="auto"
          bottom="auto"
          zIndex="1"
        >
          <Icon>
            <FaFigma />
          </Icon>
          Open in Figma
        </LinkButton>
        <AspectRatio ratio={16 / 9} w="full">
          <Box objectFit={'cover'} rounded="xl" asChild>
            <iframe src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FXsBODCq9lrqBAwReJqikbR%2FSaas-UI-Theme-1.1%3Ftype%3Ddesign%26node-id%3D4228%253A35736%26mode%3Ddesign%26t%3DTHstGvI1X3duAdqr-1" />
          </Box>
        </AspectRatio>
      </Box>
    </Box>
  )
}

function CTA() {
  return (
    <Container maxW="container.xl">
      <Stack
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        textAlign="center"
        mb="8"
        gap="4"
      >
        <Heading fontSize="3xl">Start your project now</Heading>

        <HStack>
          <LinkButton
            href="/pricing/figma"
            variant="glass"
            colorPalette="accent"
            size="lg"
          >
            Buy now
          </LinkButton>
          <LinkButton size="lg" href="#community-library" target="_blank">
            <Icon>
              <FaFigma />
            </Icon>
            Preview{' '}
            <Icon
              css={{
                transitionProperty: 'common',
                transitionDuration: 'fast',
                '.chakra-button:hover &': {
                  transform: 'translate(4px)',
                },
              }}
            >
              <LuArrowRight />
            </Icon>
          </LinkButton>
        </HStack>
      </Stack>
    </Container>
  )
}
