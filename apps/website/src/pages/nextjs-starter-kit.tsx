import * as React from 'react'

import Image from 'next/image'

import {
  Box,
  Flex,
  SimpleGrid,
  useBreakpointValue,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  Link,
  Button,
  ButtonGroup,
  useColorModeValue,
  Avatar,
  Icon,
  Center,
  AspectRatio,
  Badge,
} from '@chakra-ui/react'

import Hero from '@/components/marketing/hero'
import Features from '@/components/marketing/features'
import Section from '@/components/marketing/section-wrapper'

import { Em, Br } from '@/components/typography'

import { FallInPlace } from '@/components/motion/fall-in-place'

import SEO from '@/components/seo'
import { ButtonLink } from '@/components/link'
import { BackgroundGradient } from '@/components/background-gradient'

import { ChakraLogo } from '@/components/logos/chakra'
import { FigmaLogo } from '@/components/logos/figma'

import {
  FiBox,
  FiCode,
  FiFlag,
  FiLock,
  FiSearch,
  FiTerminal,
  FiToggleLeft,
  FiTrendingUp,
  FiArrowRight,
  FiUserPlus,
} from 'react-icons/fi'

import { Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import { Polypane } from '@/components/logos/customers/polypane'
import { YouGotBud } from '@/components/logos/customers/you-got-bud'
import { Startec } from '@/components/logos/customers/startec'
import { Eqtble } from '@/components/logos/customers/eqtble'
import { Farmo } from '@/components/logos/customers/farmo'
import { Ownco } from '@/components/logos/customers/ownco'
import { NextjsSvg } from '@/docs/components/framework-svg'

const Home = () => {
  const [animateGlow, setAnimate] = React.useState()

  return (
    <Box>
      <SEO
        title="Premium Next.js starter kit for intuitive SaaS products"
        description="Build beautiful and intuitive B2B SaaS products with speed."
        titleTemplate="%s - Saas UI"
        canonical="https://saas-ui.dev/nextjs-boilerplate"
      />

      <Box mb={8} w="full" position="relative" overflow="hidden">
        <BackgroundGradientRadial
          top="-1000px"
          opacity="0.3"
          _dark={{ opacity: 0.6 }}
          height="500px"
        />
        <Box _dark={{ bg: 'black' }} pt="16">
          <Container
            maxW="container.xl"
            py={{ base: 10, lg: 20, xl: 40 }}
            position="relative"
          >
            <Stack
              direction="column"
              alignItems="center"
              position="relative"
              zIndex="2"
            >
              <Hero
                as={Stack}
                id="home"
                alignItems="center"
                textAlign="center"
                title={
                  <FallInPlace
                    as="h1"
                    textAlign="center"
                    initialInView
                    textStyle="pageTitle"
                  >
                    Next.js starter kit for building intuitive SaaS products
                  </FallInPlace>
                }
                description={
                  <FallInPlace
                    delay={0.4}
                    fontWeight="medium"
                    textAlign="center"
                    color="gray.600"
                    _dark={{ color: 'gray.400' }}
                    fontSize={{ base: 'md', md: 'xl', lg: '1.2em' }}
                    initialInView
                  >
                    Saas UI gives you everything you need to build beautiful and
                    intuitive SaaS products.{' '}
                    <Br display={{ base: 'none', md: 'inline' }} /> Out of the
                    box support for authentication, billing, multi-tenancy, and
                    more.
                  </FallInPlace>
                }
              >
                <FallInPlace delay={0.8} initialInView>
                  <HStack pt="12" pb="12" spacing="8" justifyContent="center">
                    <NextjsSvg height="18px" />
                    <ChakraLogo height="24px" />
                    <FigmaLogo height="28px" />
                  </HStack>
                </FallInPlace>
                <FallInPlace delay={1} initialInView>
                  <ButtonGroup
                    spacing="0"
                    gap={4}
                    alignItems="stretch"
                    justifyContent="stretch"
                    flexDirection={{ base: 'column', lg: 'row' }}
                  >
                    <ButtonLink colorScheme="primary" size="lg" href="/pricing">
                      View Pricing
                    </ButtonLink>
                    <ButtonLink
                      size="lg"
                      href="/docs/nextjs-starter-kit"
                      variant="outline"
                      borderColor="blackAlpha.400"
                      _dark={{
                        borderColor: 'whiteAlpha.400',
                      }}
                      _hover={{
                        bg: 'whiteAlpha.200',
                      }}
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
                      Read documentation
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
                <FallInPlace
                  delay={1.4}
                  threshold={0.2}
                  onChange={(inView) => setAnimate(inView)}
                >
                  <AspectRatio ratio={1100 / 698}>
                    <Image
                      src={useColorModeValue(
                        '/screenshots/list.png',
                        '/screenshots/list-dark.png'
                      )}
                      width={1200}
                      height={698}
                      alt="Screenshot of a ListPage in Saas UI Pro"
                      quality="85"
                      priority
                    />
                  </AspectRatio>
                </FallInPlace>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  opacity="0"
                  _groupHover={{ display: 'flex', opacity: 1 }}
                  position="absolute"
                  inset="0"
                  transitionProperty="common"
                  transitionDuration="normal"
                >
                  <Button
                    as="a"
                    target="_blank"
                    href="https://demo.saas-ui.dev"
                    variant="solid"
                    colorScheme="neutral"
                    size="lg"
                    rounded="full"
                  >
                    View Demo
                  </Button>
                </Stack>
              </Box>
            </Stack>
            <BackgroundGradientRadial bottom="0" animate={animateGlow} />
          </Container>

          <UsedBy />
        </Box>

        <Box overflow="hidden" position="relative">
          <BackgroundGradientRadial opacity="0.1" top="-50%" />
          <ProFeatures />

          <Screenshots />
        </Box>

        <Founder />

        <Testimonials />

        <Stack alignItems="center" mx="auto" maxW="container.lg">
          <Heading as="h3" size="lg">
            Get started today
          </Heading>
          <Text color="muted" size="lg" mb="4">
            Join more than 300 other developers and founders building SaaS
            products.
          </Text>
          <ButtonLink href="/pricing" variant="primary" size="lg">
            Buy Pro
          </ButtonLink>
        </Stack>
      </Box>
    </Box>
  )
}

const UsedBy = () => {
  return (
    <Section innerWidth="container.xl">
      <Heading size="md" fontWeight="medium" textAlign="center" mb="12">
        Used by indie founders and startups worldwide
      </Heading>
      <SimpleGrid
        spacing="12"
        userSelect="none"
        columns={{ base: 2, md: 3, xl: 6 }}
        scale={{ base: 0.4, lg: 1 }}
      >
        <Flex justifyContent="center" gap="2" whiteSpace="nowrap">
          <Polypane height="30px" />
          <Text fontWeight="bold" fontSize="xl">
            Polypane
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Ownco height="26px" />
        </Flex>
        <Flex justifyContent="center" gap="2">
          <YouGotBud height="30px" />
          <Text fontWeight="bold" fontSize="xl">
            You Got Bud
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Startec height="30px" />
        </Flex>
        <Flex justifyContent="center">
          <Eqtble height="24px" />
        </Flex>
        <Flex justifyContent="center">
          <Farmo height="20px" />
        </Flex>
      </SimpleGrid>
    </Section>
  )
}

const Screenshots = () => {
  return (
    <Section
      innerWidth="container.xl"
      variant="alternate"
      pt="0"
      bg="transparent"
    >
      <Box
        position="relative"
        height={['320px', null, '640px']}
        overflow="hidden"
        borderRadius="2xl"
        borderColor="whiteAlpha.200"
        borderWidth="1px"
      >
        <BackgroundGradient
          hideOverlay
          filter={useColorModeValue('none', 'blur(50px)')}
          opacity={useColorModeValue(0.9, 0.4)}
        />

        <Center
          position="absolute"
          top="0"
          left="160px"
          width="1528px"
          height="1060px"
          transform="scale(0.9)"
        >
          <Image
            alt="Image showing the Saas UI dashboard"
            src="/screenshots/dashboard.png"
            quality="75"
            // layout="fixed"
            width={1528}
            height={1060}
          />
        </Center>
        <Center
          position="absolute"
          top={['70px', null, '280px']}
          left="0"
          width="1607px"
          height="1021px"
          transform="scale(0.9)"
        >
          <Image
            alt="Image showing the Saas UI billing settings"
            src="/screenshots/billing.png"
            quality="75"
            // layout="fixed"
            width={1607}
            height={1021}
          />
        </Center>
      </Box>
    </Section>
  )
}

const Founder = () => {
  return (
    <Section
      innerWidth={['100%', null, 'container.xl']}
      position="relative"
      overflow="hidden"
    >
      <Box position="relative">
        <Heading
          as="h2"
          textStyle="sectionTitle"
          fontWeight="semibold"
          fontSize={['2xl', null, '4xl']}
          lineHeight="lg"
          color={useColorModeValue('black', 'white')}
          width={{ base: 'full', lg: '50%' }}
          mb="8"
        >
          Building SaaS products requires you to be a generalist on many fronts.
          However many developers aren&apos;t very design savvy and vice versa.
        </Heading>

        <Stack
          fontSize="lg"
          spacing="16"
          alignItems="flex-start"
          color="muted"
          direction={{ base: 'column', lg: 'row' }}
        >
          <VStack spacing="8" alignItems="flex-start">
            <Text fontSize={['xl', null, '2xl']}>
              Saas UI tries to fill this gap by giving developers an extensive
              set of beautifully crafted components built on{' '}
              <Em>best in class tools</Em>. While on the same time serve as a{' '}
              <Em>great foundation</Em> for designers to create their brand.
            </Text>
          </VStack>
          <VStack spacing="8" alignItems="flex-start">
            <Text fontSize={['xl', null, '2xl']}>
              With Saas UI you&apos;ll <Em>save hundreds of hours</Em> building
              essential functionality for your product. Time that you can use to
              validate new ideas, find your perfect product market fit and build
              functionality that makes your product unique.
            </Text>
            <Stack direction="row" align="center">
              <Avatar
                src="/eelco128.jpg"
                mr="2"
                size="md"
                name="Eelco Wiersma"
              />
              <VStack align="flex-start" spacing="0">
                <Em>Eelco Wiersma</Em>
                <Text fontSize="sm">Founder Saas UI</Text>
              </VStack>
            </Stack>
          </VStack>
        </Stack>
      </Box>
    </Section>
  )
}

const ProFeatures = () => {
  return (
    <Features
      id="pro-features"
      position="relative"
      zIndex="1"
      bg="transparent"
      title={
        <Stack alignItems="flex-start">
          <Badge
            colorScheme="primary"
            variant="outline"
            border="1px"
            rounded="full"
            px="2"
            fontWeight="medium"
            textTransform="inherit"
            fontSize="md"
          >
            Pro license
          </Badge>
          <Heading
            fontSize={['2xl', null, '4xl']}
            textStyle="sectionTitle"
            textAlign="left"
            as="h2"
            color="inherit"
          >
            Not your standard
            <Br /> dashboard template.
          </Heading>
        </Stack>
      }
      description={
        <Stack alignItems="flex-start" spacing="8" textAlign="left">
          <Text fontSize={['xl', null, 'xl']} color="muted">
            Saas UI Pro includes everything you need to build frontends that
            scale.
            <Br />
            Use it as a template for your next product or foundation for your
            design system.
          </Text>
          <ButtonGroup>
            <ButtonLink href="/pricing" size="lg" variant="primary">
              Buy Pro
            </ButtonLink>
            <ButtonLink
              size="lg"
              href="https://demo.saas-ui.dev"
              target="_blank"
              variant="outline"
              _hover={{
                bg: 'whiteAlpha.200',
              }}
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
              Explore Demo
            </ButtonLink>
          </ButtonGroup>
        </Stack>
      }
      align="left"
      variant="alternate"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: 'Components.',
          icon: FiBox,
          description:
            'All premium components are available on a private NPM registery, no more copy pasting and always up-to-date.',
          variant: 'inline',
        },
        {
          title: 'Starterkits.',
          icon: FiLock,
          description:
            'Example apps in Next.JS, Electron. Including authentication, billing, example pages, everything you need to get started FAST.',
          variant: 'inline',
        },
        {
          title: 'Documentation.',
          icon: FiSearch,
          description:
            'Extensively documented, including storybooks, best practices, use-cases and examples.',
          variant: 'inline',
        },
        {
          title: 'Onboarding.',
          icon: FiUserPlus,
          description:
            'Add user onboarding flows, like tours, hints and inline documentation without breaking a sweat.',
          variant: 'inline',
        },
        {
          title: 'Feature flags.',
          icon: FiFlag,
          description:
            "Implement feature toggles for your billing plans with easy to use hooks. Connect Flagsmith, or other remote config services once you're ready.",
          variant: 'inline',
        },
        {
          title: 'Upselling.',
          icon: FiTrendingUp,
          description:
            'Components and hooks for upgrade flows designed to make upgrading inside your app frictionless.',
          variant: 'inline',
        },
        {
          title: 'Themes.',
          icon: FiToggleLeft,
          description:
            'Includes multiple themes with darkmode support, always have the perfect starting point for your next project.',
          variant: 'inline',
        },
        {
          title: 'Generators.',
          icon: FiTerminal,
          description:
            'Extend your design system while maintaininig code quality and consistency with build-in generators.',
          variant: 'inline',
        },
        {
          title: 'Monorepo.',
          icon: FiCode,
          description: (
            <>
              All code is available as packages in a high-performance{' '}
              <Link href="https://turborepo.com">Turborepo</Link>, you have full
              control to modify and adjust it to your workflow.
            </>
          ),
          variant: 'inline',
        },
      ]}
    />
  )
}

export default Home

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: 'Support us with your GitHub star 🤩',
        description:
          '<img src="https://img.shields.io/github/stars/saas-js/saas-ui.svg?style=social&label=Star" />',
        href: 'https://github.com/saas-js/saas-ui',
        action: false,
      },
      header: {
        position: 'fixed',
        variant: 'dark',
      },
    },
  }
}
