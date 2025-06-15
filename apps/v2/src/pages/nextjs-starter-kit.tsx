import * as React from 'react'

import Image from 'next/image'

import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  Button,
  ButtonGroup,
  useColorModeValue,
  Avatar,
  Icon,
  Center,
  AspectRatio,
  type ButtonProps,
  type StackProps,
} from '@chakra-ui/react'

import Hero from '@/components/marketing/hero'
import Section from '@/components/marketing/section-wrapper'

import { Em, Br } from '@/components/typography'

import { FallInPlace } from '@/components/motion/fall-in-place'

import SEO from '@/components/seo'
import { ButtonLink } from '@/components/link'
import { BackgroundGradient } from '@/components/background-gradient'

import { ChakraLogo } from '@/components/logos/chakra'

import { FiArrowRight } from 'react-icons/fi'

import { Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'

import { NextjsSvg } from '@/docs/components/framework-svg'
import { UsedBy } from '@/components/used-by'
import { TrpcLogo } from '@/components/logos/trpc'

const NextjsStarterKit = () => {
  const [animateGlow, setAnimate] = React.useState(false)

  return (
    <Box>
      <SEO
        title="Next.js SaaS Starter Kit"
        description="Production-ready Next.js starter kit for building intuitive SaaS products"
        titleTemplate="%s - Saas UI"
        canonical="https://saas-ui.dev/nextjs-starter-kit"
        openGraph={{
          images: [
            {
              url: '/nextjs-starter-kit-og.png',
              width: 1200,
              height: 630,
              alt: 'Next.js starter kit for building intuitive SaaS products',
            },
          ],
        }}
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
            pt={{ base: 10, lg: 20, xl: 40 }}
            pb={{ base: 10, lg: 20, xl: 30 }}
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
                    <TrpcLogo height="24px" />
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
                    <ButtonLink
                      colorScheme="primary"
                      size="lg"
                      href="https://demo.saas-ui.dev"
                    >
                      View Demo
                    </ButtonLink>
                    <DocumentationLink />
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
            <BackgroundGradientRadial bottom="-200px" animate={animateGlow} />
          </Container>

          <UsedBy />
        </Box>

        <Box overflow="hidden" position="relative">
          <StarterKitFeatures />

          <Screenshots />
        </Box>

        <Founder />

        <Stack alignItems="center" mx="auto" my="20" maxW="container.lg">
          <Heading as="h3" size="xl">
            Start shipping today
          </Heading>
          <Text color="muted" fontSize="xl" mb="4">
            Trusted by 400+ developers and founders world wide.
          </Text>
          <HStack>
            <ButtonLink href="/pricing" variant="primary" size="lg">
              Buy Pro
            </ButtonLink>
            <DocumentationLink />
          </HStack>
        </Stack>

        <Testimonials />
      </Box>
    </Box>
  )
}

function DocumentationLink(props: Pick<ButtonProps, 'size' | 'variant'>) {
  return (
    <ButtonLink
      size="lg"
      variant="outline"
      href="/docs/nextjs-starter-kit"
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
      {...props}
    >
      Documentation
    </ButtonLink>
  )
}

const FeatureCard = ({
  title,
  children,
  description,
  gridColumn,
  bg = 'gray.50',
  ...rest
}: StackProps & { description: React.ReactNode }) => {
  return (
    <Card
      gridColumn={gridColumn}
      borderRadius="xl"
      variant="solid"
      // bg={bg}
      gap="2"
      py="4"
      px="4"
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

            <Text fontWeight="medium" fontSize="1.2em" maxW="90%">
              {description}
            </Text>
          </Box>

          {children}
        </Stack>
      </CardBody>
    </Card>
  )
}

function StarterKitFeatures() {
  return (
    <Section innerWidth="container.xl">
      <Stack
        alignItems="start"
        justifyContent="space-between"
        flexDirection={{ base: 'column', lg: 'row' }}
        mb="8"
      >
        <Heading maxW="2xl" fontSize="2xl" mb="4">
          Saas UI solves all the boring stuff for you. It ships with a ton
          useful UI components, patterns and templates <br /> to help you build
          better products, faster.
        </Heading>

        <HStack>
          <ButtonLink href="/pricing/figma" variant="primary" size="md">
            Buy now
          </ButtonLink>
          <ButtonLink
            size="md"
            href="/docs/nextjs-starter-kit"
            target="_blank"
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
            Documentation
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
        <FeatureCard
          title="Next.js + tRPC"
          description={
            <>
              <Text as="span" display="block" fontWeight="semibold">
                Utilise all latest Next.js features.
              </Text>
              <Text as="span" color="emphasized">
                RSC, SSR, Streaming without getting fully locked in thanks to
                tRPC and React Query.
              </Text>
            </>
          }
          gridColumn="span 3"
        >
          <HStack gap="4" mt="4">
            <Image
              src="/img/frameworks/nextjs.svg"
              alt="Next.js"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/trpc.svg"
              alt="tRPC"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/tanstack.png"
              alt="Tanstack Query"
              height="40"
              width="40"
            />
          </HStack>
        </FeatureCard>
        <FeatureCard
          title="Developer Experience"
          description={
            <>
              <Text as="span" display="block" fontWeight="semibold">
                Fast, type-safe development environment.
              </Text>
              <Text as="span" color="emphasized">
                Turbopack, Turborepo, TypeScript and sensible configs for
                Prettier and ESLint.
              </Text>
            </>
          }
          gridColumn="span 3"
        >
          <HStack gap="4" mt="4">
            <Image
              src="/img/frameworks/typescript.svg"
              alt="TypeScript"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/turbopack.svg"
              alt="Turbopack"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/turborepo.svg"
              alt="Turborepo"
              height="40"
              width="40"
            />
          </HStack>
        </FeatureCard>
        <FeatureCard
          title="Database"
          description={
            <>
              <Text as="span" display="block" fontWeight="semibold">
                Built on the world&apos;s most proven database.
              </Text>
              <Text as="span" color="emphasized">
                PostgreSQL managed by Drizzle ORM. Run it locally, use Supabase,
                or on the edge with Neon.
              </Text>
            </>
          }
          gridColumn="span 3"
        >
          <HStack gap="4" mt="4">
            <Image
              src="/img/frameworks/postgresql.svg"
              alt="Postgresql"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/drizzle.svg"
              alt="Turbopack"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/supabase.svg"
              alt="Supabase"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/neon.svg"
              alt="Neon"
              height="40"
              width="40"
            />
          </HStack>
        </FeatureCard>
        <FeatureCard
          title="Billing"
          description={
            <>
              <Text as="span" display="block" fontWeight="semibold">
                Get paid reliably.
              </Text>
              <Text as="span" color="emphasized">
                Stripe integration, pricing tables, tiered pricing, metered
                usage, grandfathering and entitlements.
              </Text>
            </>
          }
          gridColumn="span 3"
        >
          <HStack gap="4" mt="4">
            <Image
              src="/img/frameworks/stripe.svg"
              alt="Stripe"
              height="40"
              width="40"
            />
          </HStack>
        </FeatureCard>
        <FeatureCard
          title="Authentication"
          description={
            <>
              <Text as="span" display="block" fontWeight="semibold">
                Own your user data or choose a hosted solution.
              </Text>
              <Text as="span" color="emphasized">
                Easily switch providers, support magic links, passwords, OAuth
                and role-based authorization.
              </Text>
            </>
          }
          gridColumn="span 3"
        >
          <HStack gap="4" mt="4">
            <Image
              src="/img/frameworks/better-auth.svg"
              alt="Better Auth"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/supabase.svg"
              alt="Supabase"
              height="40"
              width="40"
            />
          </HStack>
        </FeatureCard>
        <FeatureCard
          title="Transactional email"
          description={
            <>
              <Text as="span" display="block" fontWeight="semibold">
                Beautiful, easily customisable emails.
              </Text>
              <Text as="span" color="emphasized">
                Build with React Email, send with Resend or pick your own
                favourite SMTP provider.
              </Text>
            </>
          }
          gridColumn="span 3"
        >
          <HStack gap="4" mt="4">
            <Image
              src="/img/frameworks/react-email.png"
              quality="100"
              alt="React Email"
              height="40"
              width="40"
            />
            <Image
              src="/img/frameworks/resend.svg"
              alt="Resend"
              height="40"
              width="40"
            />
          </HStack>
        </FeatureCard>

        <FeatureCard
          title="Multi-tenancy"
          description={
            <>
              <Text as="span" color="emphasized" fontSize="lg">
                Support multiple workspaces. Invite members and manage roles.
              </Text>
            </>
          }
          gridColumn="span 2"
        />
        <FeatureCard
          title="UI"
          description={
            <>
              <Text as="span" color="emphasized" fontSize="lg">
                Expertly crafted dashboard UI built with the Saas UI design
                system.
              </Text>
            </>
          }
          gridColumn="span 2"
        />
        <FeatureCard
          title="Settings"
          description={
            <>
              <Text as="span" color="emphasized" fontSize="lg">
                Built-in settings pages for users and teams.
              </Text>
            </>
          }
          gridColumn="span 2"
        />
        <FeatureCard
          title="Onboarding"
          description={
            <>
              <Text as="span" color="emphasized" fontSize="lg">
                Built-in onboarding pages to guide users through the product.
              </Text>
            </>
          }
          gridColumn="span 2"
        />
        <FeatureCard
          title="Feature-flags"
          description={
            <>
              <Text as="span" color="emphasized" fontSize="lg">
                Incrementally roll out new features and add easily add paywalls.
              </Text>
            </>
          }
          gridColumn="span 2"
        />
        <FeatureCard
          title="Storybooks"
          description={
            <>
              <Text as="span" color="emphasized" fontSize="lg">
                Growing collection of components and patterns to help you build
                better products.
              </Text>
            </>
          }
          gridColumn="span 2"
        />
      </Box>
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
          filter="none"
          opacity={0.9}
          _dark={{
            filter: 'blur(50px)',
            opacity: 0.4,
          }}
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
          width={{ base: 'full', lg: '50%' }}
          mb="8"
        >
          Building SaaS products requires you to be a generalist on many fronts.
          However many developers aren&apos;t very design savvy and vice versa.
        </Heading>

        <Stack
          fontSize="lg"
          fontWeight="medium"
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

export default NextjsStarterKit

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
