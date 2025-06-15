import * as React from 'react'

import {
  AspectRatio,
  Box,
  Heading,
  Text,
  HStack,
  Icon,
  Stack,
  ButtonGroup,
  useColorModeValue,
  Card,
  CardBody,
  Container,
} from '@chakra-ui/react'

import Section from '@/components/marketing/section-wrapper'

import SEO from '@/components/seo'
import { Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import { FaFigma } from 'react-icons/fa6'
import { ButtonLink } from '@/components/link'
import { FiArrowRight } from 'react-icons/fi'

import Hero from '@/components/marketing/hero'
import { FallInPlace } from '@/components/motion/fall-in-place'
import { Br, Em } from '@/components/typography'
import Image from 'next/image'
import { UsedBy } from '@/components/used-by'

const FigmaPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="Professionally crafted Figma design system and UI kit for designing
        beautiful products at any scale."
        titleTemplate="%s - Figma Design System & UI Kit"
      />
      <BackgroundGradientRadial
        top="-30%"
        bottom="auto"
        opacity="0.1"
        _dark={{ opacity: 0.5 }}
        pointerEvents="none"
      />
      <Box mb={8} w="full" position="relative" overflow="hidden" zIndex="1">
        <FigmaHero />

        <UsedBy pt="14" />

        <Stats />

        <FigmaEmbed />

        <CTA />

        <Testimonials />
      </Box>
    </Box>
  )
}

const FigmaHero = () => {
  return (
    <Stack alignItems="center" mt="24" pt="12">
      <FallInPlace
        as="span"
        fontSize="sm"
        borderWidth="1px"
        borderRadius="full"
        px="4"
        py="1"
        bg="whiteAlpha.200"
        boxShadow="md"
        fontWeight="medium"
        textAlign="center"
        initialInView
      >
        Saas UI Figma Kit ・ v1.2
      </FallInPlace>
      <Hero
        as={Stack}
        alignItems="center"
        textAlign="center"
        pt="12"
        title={
          <>
            <FallInPlace
              as="h1"
              textAlign="center"
              initialInView
              textStyle="pageTitle"
            >
              The Figma design system and
              <Br /> UI kit for SaaS products
            </FallInPlace>
          </>
        }
        description={
          <FallInPlace
            delay={0.4}
            fontWeight="medium"
            textAlign="center"
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
            initialInView
          >
            Align design and dev teams with <Em>50+ primitive components</Em>
            <Br />
            and a growing collection of templates and blocks
            <Br /> available as <Em>Figma assets and React components</Em>.
          </FallInPlace>
        }
      >
        <FallInPlace delay={1} initialInView mt="12">
          <ButtonGroup
            spacing="0"
            gap={4}
            alignItems="stretch"
            justifyContent="stretch"
            flexDirection={{ base: 'column', lg: 'row' }}
          >
            <ButtonLink colorScheme="primary" size="lg" href="/pricing/figma">
              Buy Figma Pro
            </ButtonLink>
            <ButtonLink
              size="lg"
              href="https://www.figma.com/file/XsBODCq9lrqBAwReJqikbR/Saas-UI-Theme-1.2?type=design&node-id=2106-2109&mode=design"
              target="_blank"
              variant="outline"
              borderColor="blackAlpha.400"
              _dark={{
                borderColor: 'whiteAlpha.400',
              }}
              _hover={{
                bg: 'whiteAlpha.200',
              }}
              leftIcon={<FaFigma />}
              rightIcon={
                <Icon
                  as={FiArrowRight}
                  sx={{
                    transitionProperty: 'common',
                    transitionDuration: 'normal',
                    '.chakra-button:hover &': {
                      transform: 'translate(5px)',
                    },
                  }}
                />
              }
            >
              Preview
            </ButtonLink>
          </ButtonGroup>
        </FallInPlace>
      </Hero>
      <Box
        role="group"
        width="80vw"
        maxW="1200px"
        margin="0 auto"
        alignItems="center"
        position="relative"
        zIndex="2"
      >
        <FallInPlace delay={1.4} threshold={0.2}>
          <AspectRatio ratio={1100 / 698}>
            <Image
              src={useColorModeValue(
                '/screenshots/figma.png',
                '/screenshots/figma-dark.png'
              )}
              width={1200}
              height={698}
              alt="Screenshot of a Saas UI Figma Kit"
              quality="85"
              priority
            />
          </AspectRatio>
        </FallInPlace>
      </Box>
    </Stack>
  )
}

const StatsCard = ({ title, children, description, gridColumn, ...rest }) => {
  return (
    <Card
      gridColumn={gridColumn}
      borderRadius="lg"
      variant="solid"
      gap="2"
      py="4"
      px="4"
      bg="gray.50"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="inherit"
      position="relative"
      overflow="hidden"
      _dark={{
        bg: 'gray.800',
        borderColor: 'transparent',
      }}
    >
      <CardBody>
        <Stack {...rest}>
          <Box>
            <Heading
              as="h3"
              color="primary.500"
              fontWeight="medium"
              fontSize="lg"
              mb="2"
              _dark={{
                color: 'primary.300',
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
      </CardBody>
    </Card>
  )
}

const Stats = () => {
  return (
    <Section innerWidth="container.xl">
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
          <ButtonLink href="/pricing/figma" variant="primary" size="md">
            Buy now
          </ButtonLink>
          <ButtonLink
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
            leftIcon={<FaFigma />}
            rightIcon={
              <Icon
                as={FiArrowRight}
                sx={{
                  transitionProperty: 'common',
                  transitionDuration: 'normal',
                  '.chakra-button:hover &': {
                    transform: 'translate(5px)',
                  },
                }}
              />
            }
          >
            Preview
          </ButtonLink>
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
    </Section>
  )
}

const FigmaEmbed = () => {
  return (
    <Box py="40">
      <a id="community-library" />
      <Box mb="8">
        <Heading textAlign="center" size="xl" fontWeight="medium" mb="2">
          Free community library
        </Heading>
        <Text textAlign="center" color="muted" fontSize="xl">
          Try out our free community library. Used by 1000+ designers.
        </Text>
      </Box>
      <Box position="relative" maxW="container.xl" mx="auto">
        <ButtonLink
          href="https://www.figma.com/community/file/1257658419283927894"
          position="absolute"
          top="4"
          right="4"
          left="auto"
          bottom="auto"
          zIndex="1"
          leftIcon={<FaFigma />}
        >
          Open in Figma
        </ButtonLink>
        <AspectRatio ratio={16 / 9} w="full">
          <Box
            as="iframe"
            objectFit={'cover'}
            rounded="xl"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FXsBODCq9lrqBAwReJqikbR%2FSaas-UI-Theme-1.1%3Ftype%3Ddesign%26node-id%3D4228%253A35736%26mode%3Ddesign%26t%3DTHstGvI1X3duAdqr-1"
          ></Box>
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
      >
        <Heading fontSize="3xl">Start your project now</Heading>

        <Text color="muted" mb="4">
          Get <strong>50% off</strong> during early access.
        </Text>

        <HStack>
          <ButtonLink href="/pricing/figma" variant="primary" size="md">
            Buy now
          </ButtonLink>
          <ButtonLink
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
            leftIcon={<FaFigma />}
            rightIcon={
              <Icon
                as={FiArrowRight}
                sx={{
                  transitionProperty: 'common',
                  transitionDuration: 'normal',
                  '.chakra-button:hover &': {
                    transform: 'translate(5px)',
                  },
                }}
              />
            }
          >
            Preview
          </ButtonLink>
        </HStack>
      </Stack>
    </Container>
  )
}

export default FigmaPage

export async function getStaticProps() {
  return {
    props: {
      header: {
        position: 'fixed',
        variant: 'dark',
      },
    },
  }
}
