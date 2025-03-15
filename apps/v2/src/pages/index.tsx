import * as React from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { Box, Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react'
import {
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
  chakra,
  Avatar,
  VisuallyHidden,
  Img,
  Grid,
  GridItem,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  useClipboard,
  IconButton,
  useTheme,
  Tag,
  Wrap,
  WrapItem,
  Icon,
  Center,
  Tooltip,
  AspectRatio,
  Badge,
  DarkMode,
  Card,
} from '@chakra-ui/react'

import Hero from '@/components/marketing/hero'
import Features from '@/components/marketing/features'
import Section from '@/components/marketing/section-wrapper'

import { Em, Br } from '@/components/typography'

import { FallInPlace } from '@/components/motion/fall-in-place'

import SEO from '@/components/seo'
import { ButtonLink } from '@/components/link'
import { BackgroundGradient } from '@/components/background-gradient'

import { ReactLogo } from '@/components/logos/react'
import { ChakraLogo } from '@/components/logos/chakra'
import { FigmaLogo } from '@/components/logos/figma'

import {
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiArrowRight,
  FiUserPlus,
} from 'react-icons/fi'
import { FormDialog } from '@saas-ui/modals'
import { Field } from '@saas-ui/forms'
import {
  Banner,
  BannerCloseButton,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from '@saas-ui/react'

import { transparentize } from '@chakra-ui/theme-tools'
import { FocusableElement } from '@saas-ui/react-utils'
import { Testimonial, Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'

import { UsedBy } from '@/components/used-by'
import { GetStaticProps } from 'next'

const CodePanel = dynamic(() => import('@/components/code-panel/code-panel'))
const ComponentShowcase = dynamic(() =>
  import('@/components/component-showcase').then((mod) => mod.ComponentShowcase)
)

const Home = () => {
  const [animateGlow, setAnimate] = React.useState()
  const isDesktop = useBreakpointValue({ lg: true })
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="React component library and Next.js starter kit for SaaS, B2B and internal tools."
        titleTemplate="%s - The React toolkit for startups"
        canonical="https://saas-ui.dev"
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
            pb={{ base: 10, lg: 20, xl: 30 }}
            pt={{ base: 10, lg: 20, xl: 40 }}
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
                    Build intuitive apps that your customers will love
                  </FallInPlace>
                }
                description={
                  <FallInPlace
                    delay={0.4}
                    fontWeight="medium"
                    textAlign="center"
                    color="gray.600"
                    maxW="3xl"
                    _dark={{ color: 'gray.400' }}
                    fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
                    initialInView
                  >
                    Saas UI is a purpose-built toolkit for building high-quality
                    apps. Start with our free component library and build
                    fullstack apps with production-ready templates and starter
                    kits.
                  </FallInPlace>
                }
              >
                <FallInPlace delay={0.8} initialInView>
                  <HStack pt="12" pb="12" spacing="8" justifyContent="center">
                    <HStack>
                      <ReactLogo height="24px" />
                      <Text fontWeight="medium">React</Text>
                    </HStack>
                    <ChakraLogo height="24px" />
                    <FigmaLogo height="24px" />
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
                    <ButtonLink
                      size="lg"
                      href="/docs"
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
            <BackgroundGradientRadial bottom="-200px" animate={animateGlow} />
          </Container>

          <UsedBy />
        </Box>

        {isDesktop && <ComponentShowcase />}

        <Box id="features">
          <Benefits />

          <BoilerplateCode />

          {/* <Themable /> */}

          <Highlights />
        </Box>

        <Founder />

        <Testimonials />

        <DarkMode>
          <Box bg="black" color="white" overflow="hidden" position="relative">
            <BackgroundGradientRadial opacity="0.6" top="-50%" />
            <ProFeatures />

            <Screenshots />
          </Box>
        </DarkMode>
      </Box>
    </Box>
  )
}

const Benefits = () => {
  return (
    <Features
      id="benefits"
      columns={[1, 2, 2, 4]}
      iconSize={4}
      innerWidth="container.xl"
      pt="20"
      features={[
        {
          title: 'Accessible',
          icon: FiSmile,
          description: 'All components strictly follow WAI-ARIA standards.',
          iconPosition: 'left',
          delay: 0.6,
        },
        {
          title: 'Themable',
          icon: FiSliders,
          description:
            'Fully customize all components to your brand with theme support and style props.',
          iconPosition: 'left',
          delay: 0.8,
        },
        {
          title: 'Composable',
          icon: FiGrid,
          description:
            'Compose components to fit your needs and mix them together to create new ones.',
          iconPosition: 'left',
          delay: 1,
        },
        {
          title: 'Productive',
          icon: FiThumbsUp,
          description:
            'Designed to reduce boilerplate and fully typed, build your product at speed.',
          iconPosition: 'left',
          delay: 1.1,
        },
      ]}
    />
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

const BoilerplateCode = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fieldRef = React.useRef<FocusableElement>(null)

  return (
    <Section innerWidth="container.xl">
      <Stack spacing="12" direction={['column', null, null, 'row']}>
        <Box py="10" flex="1">
          <Heading as="h2" size="2xl" mb="8" textStyle="sectionTitle">
            Less boilerplate
            <Br /> build with speed.
          </Heading>
          <VStack spacing="4" alignItems="flex-start">
            <Text fontSize={['xl', null, '2xl']} color="muted">
              Saas UI ships with an extensive set of foundational and advanced
              components that cover a wide range of use-cases. Carefully crafted
              to reduce boilerplate code without sacrificing flexibility.
            </Text>
            <Text fontSize="md" color="muted">
              Try it out:
            </Text>
            <Button onClick={onOpen} variant="subtle" colorScheme="purple">
              Create project
            </Button>
          </VStack>

          <FormDialog
            title="Create project"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={async () => setTimeout(onClose, 1000)}
            initialFocusRef={fieldRef}
            defaultValues={{
              name: '',
            }}
          >
            <Field
              ref={fieldRef}
              name="name"
              label="Name"
              help="Choose a cool name for this project"
              rules={{ required: 'Please enter a name' }}
            />
          </FormDialog>
        </Box>
        <Box
          display="flex"
          flex="1"
          py="10"
          alignItems="center"
          justifyContent="center"
          borderRadius="2xl"
          position="relative"
          bg="code-bg"
          _dark={{
            bg: 'transparent',
            bgGradient: 'linear(to-b, code-bg, transparent)',
          }}
          _before={{
            content: '""',
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
            position: 'absolute',
            inset: '0px',
            borderRadius: 'inherit',
            padding: '1px',
            bgGradient: `linear(to-b, whiteAlpha.300, transparent)`,

            WebkitMask:
              'linear-gradient(black, black) content-box content-box, linear-gradient(black, black)',
            WebkitMaskComposite: 'xor',
          }}
        >
          <Box width="90%" overflowX="auto">
            <CodePanel language="typescript">{codeExamples.form}</CodePanel>
          </Box>
        </Box>
      </Stack>
    </Section>
  )
}

const Themable = () => {
  return (
    <Section innerWidth="container.xl">
      <Box py="10" flex="1" width={['full', null, null, '50%']}>
        <Heading size="2xl" mb="8" fontWeight="extrabold">
          Make it yours.
        </Heading>
        <VStack spacing="4" alignItems="flex-start">
          <Text fontSize={['xl', null, '2xl']} color="muted">
            Saas UI is built on top of <Em>Chakra UI</Em>, all components are
            built with the same excellent design principles. Effortlessly
            compose and customize components directly through CSS-in-JS style
            props or by creating a custom theme.
          </Text>
        </VStack>
      </Box>
      <Stack spacing="12" direction={{ base: 'column', xl: 'row' }}>
        <Box
          display="flex"
          flex="1"
          alignItems="center"
          justifyContent="center"
          borderRadius="2xl"
          position="relative"
          bg="code-bg"
          _dark={{
            bg: 'transparent',
            bgGradient: 'linear(to-b, code-bg, transparent)',
          }}
          _before={{
            content: '""',
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
            position: 'absolute',
            inset: '0px',
            borderRadius: 'inherit',
            padding: '1px',
            bgGradient: `linear(to-b, whiteAlpha.300, transparent)`,

            WebkitMask:
              'linear-gradient(black, black) content-box content-box, linear-gradient(black, black)',
            WebkitMaskComposite: 'xor',
          }}
        >
          <Tabs width="100%" colorScheme="white" size="md">
            <TabList borderColor="whiteAlpha.200" color="white">
              <Tab>Style props</Tab>
              <Tab>Theme</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CodePanel language="typescript" height="280px">
                  {codeExamples.styleProps}
                </CodePanel>
              </TabPanel>
              <TabPanel>
                <CodePanel language="typescript" height="280px">
                  {codeExamples.theme}
                </CodePanel>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box
          display="flex"
          flex="1"
          p={[0, null, 10]}
          alignItems="center"
          justifyContent="center"
          borderRadius="2xl"
        >
          <Banner
            display="flex"
            bg={useColorModeValue('white', 'gray.900')}
            colorScheme="purple"
            backgroundClip="padding-box"
            borderRadius="full"
            borderWidth="2px"
            borderColor="transparent"
            position="relative"
            py="2"
            px="3"
            overflow="visible"
            transitionProperty="common"
            transitionDuration="normal"
            boxShadow="lg"
            _before={{
              content: `""`,
              position: 'absolute',
              zIndex: -1,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: 'inherit',
              margin: '-2px',
              bgGradient: 'linear(to-r, purple.500, cyan.500)',
            }}
            _hover={{
              boxShadow: 'sm',
            }}
          >
            <BannerIcon boxSize="14px" />
            <BannerContent fontSize="sm">
              <BannerTitle>Pre-order Saas UI Pro now!</BannerTitle>
              <BannerDescription display={{ base: 'none', md: 'block' }}>
                50% discount for early adopters.
              </BannerDescription>
            </BannerContent>
            <BannerCloseButton position="absolute" top="2" right="4" />
          </Banner>
        </Box>
      </Stack>
    </Section>
  )
}

const HighlightBox = (props) => {
  const { children, ...rest } = props
  return (
    <Card
      as={VStack}
      bg={useColorModeValue('gray.100', 'gray.900')}
      bgGradient="linear(to-bl,white, gray.50)"
      _dark={{
        bgGradient: 'linear(to-bl, whiteAlpha.50, transparent)',
      }}
      borderRadius="lg"
      p="8"
      flex="1 0"
      alignItems="flex-start"
      spacing="8"
      overflow="hidden"
      position="relative"
      {...rest}
    >
      {children}
    </Card>
  )
}

const Highlights = () => {
  const theme = useTheme()
  const { value, onCopy, hasCopied } = useClipboard(
    'npm install @saas-ui/react'
  )
  return (
    <Section innerWidth="container.xl" position="relative" overflow="hidden">
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={8}
        position="relative"
      >
        <GridItem colSpan={[1, null, null, 2]} as={HighlightBox}>
          <Heading as="h3" textStyle="cardTitle" size="lg">
            40+ open source components
          </Heading>
          <Text color="muted" fontSize="xl">
            Get started for free with 40+ open source components. Including
            authentication screens with Clerk, Supabase and Magic. Fully
            functional forms with React Hook Form. Data tables with React Table.
          </Text>

          <HStack spacing="8">
            <HStack
              py="1"
              px="2"
              borderRadius="full"
              bg="code-bg"
              borderWidth="1px"
            >
              <CodePanel language="bash">{value}</CodePanel>
              <IconButton
                icon={hasCopied ? <FiCheck /> : <FiCopy />}
                aria-label="copy"
                onClick={onCopy}
                variant="ghost"
                borderRadius="full"
                color="white"
              />
            </HStack>
            <ButtonLink
              href="/docs"
              variant="ghost"
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
          </HStack>
        </GridItem>
        <GridItem as={HighlightBox}>
          <Heading as="h3" textStyle="cardTitle" size="lg">
            Solid foundations
          </Heading>
          <Text color="muted" fontSize="lg">
            Saas UI is built on top of industry leading libraries and tools.
            <Br />
            <Br />
            Including Chakra UI, React Hook Form, React Table, React Query,
            Recharts, and more...
          </Text>
        </GridItem>
        <GridItem
          as={HighlightBox}
          justifyContent="center"
          position="relative"
          borderColor="whiteAlpha.300"
          spacing="0"
        >
          <Box
            bgGradient={`linear(to-br, ${transparentize(
              'green.500',
              0.8
            )(theme)}, ${transparentize('yellow.500', 0.8)(theme)})`}
            opacity={useColorModeValue(1, '0.5')}
            filter={useColorModeValue('none', 'blur(50px)')}
            position="absolute"
            inset="0px"
          />
          <Testimonial
            avatar="https://senjaio.b-cdn.net/public/avatar/33d3d3ac-530d-4a2a-a2a9-93621e00bb1d_1698499800957.jpg?width=200"
            name="Simon Høiberg"
            description={
              <Text color="whiteAlpha.700" as="span" fontSize="sm">
                Aidbase.ai
              </Text>
            }
            border="0"
            bg="transparent"
            boxShadow="none"
            color="white"
            position="relative"
          >
            <Text
              fontSize="sm"
              color="blackAlpha.600"
              _dark={{
                color: 'whiteAlpha.800',
              }}
            >
              At Aidbase, we&apos;re developing a framework-agnostic component
              library to support our various chatbots, ticket forms, and other
              widgets. It&apos;s challenging building something that&apos;s a
              great developer experience and performing well at the same time.
              SaaS UI has been a massive help in this.
            </Text>
          </Testimonial>
        </GridItem>
        <GridItem colSpan={[1, null, null, 2]} as={HighlightBox}>
          <Heading as="h3" textStyle="cardTitle" size="lg">
            Start your next idea two steps ahead
          </Heading>
          <Text color="muted" fontSize="lg">
            We take care of all your basic frontend needs, so you can start
            building functionality that makes your product unique.
          </Text>
          <Wrap
            position="relative"
            _before={{
              content: `""`,
              position: 'absolute',
              inset: 0,
              left: '-30px',
              right: '70%',
              bgGradient: 'linear(to-r, white, transparent)',
            }}
            _after={{
              content: `""`,
              position: 'absolute',
              inset: 0,
              right: '-30px',
              left: '70%',
              bgGradient: 'linear(to-r, transparent, white)',
            }}
            _dark={{
              _before: {
                bgGradient: 'linear(to-r, gray.900, transparent)',
              },
              _after: {
                bgGradient: 'linear(to-r, transparent, gray.800)',
              },
            }}
          >
            {[
              'authentication',
              'navigation',
              'crud',
              'settings',
              'multi-tenancy',
              'layouts',
              'billing',
              'a11y testing',
              'server-side rendering',
              'documentation',
              'onboarding',
              'storybooks',
              'theming',
              'upselling',
              'unit testing',
              'feature flags',
              'mobile',
              'user-profiles',
              'data-fetching',
              'ssr',
              'subscriptions',
            ].map((value) => (
              <Tag
                key={value}
                rounded="full"
                px="3"
                borderWidth="1px"
                bg="blackAlpha.50"
                _dark={{
                  bg: 'whiteAlpha.200',
                  color: 'whiteAlpha.800',
                }}
              >
                {value}
              </Tag>
            ))}
          </Wrap>
        </GridItem>
        <GridItem
          colSpan={[1, null, null, 2]}
          as={HighlightBox}
          flexDirection="row"
          padding="0"
        >
          <FigmaCard />
        </GridItem>
        <GridItem
          as={HighlightBox}
          justifyContent="center"
          borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
          spacing="0"
        >
          <Box
            bgGradient={`linear(to-br, ${transparentize(
              'indigo.500',
              0.8
            )(theme)}, ${transparentize('green.500', 0.8)(theme)})`}
            opacity={useColorModeValue(1, '0.5')}
            filter={useColorModeValue('none', 'blur(50px)')}
            position="absolute"
            inset="0px"
            pointerEvents="none"
            zIndex="0"
          />
          <Testimonial
            name="Sukhpal Saini"
            description={
              <Text color="whiteAlpha.700" as="span" fontSize="sm">
                <Link href="https://saasbase.dev" target="_blank">
                  saasbase.dev
                </Link>{' '}
                (Ex-IBM)
              </Text>
            }
            avatar="/testimonials/sukh.jpeg"
            border="0"
            bg="transparent"
            boxShadow="none"
            color="white"
            position="relative"
          >
            <Text fontSize="sm">
              As a Frontend dev, I&apos;ve spent countless hours creating the
              same UI components over and over again for numerous products. Saas
              UI finally put an end to that with a component library that is
              ready to be integrated into a world-class SaaS app on Day 1.
              Highly recommended for any new product you&apos;re building!
            </Text>
          </Testimonial>
        </GridItem>
      </Grid>
    </Section>
  )
}

const FigmaCard = () => {
  return (
    <>
      <Stack spacing={8} padding={{ base: 8, sm: 12 }}>
        <Heading as="h3" textStyle="cardTitle" size="lg">
          Figma library
        </Heading>
        <Text color="muted" fontSize="lg" maxW="400px">
          <>
            Saas UI ships with a Figma design system. <br />
            It includes all the components and styles you need to design your
            product. Fully in sync with the codebase.
          </>
        </Text>

        <Stack flexDirection={{ base: 'column', sm: 'row' }}>
          <ButtonLink variant="primary" href="/pricing/figma">
            Buy Figma Pro
          </ButtonLink>
          <ButtonLink
            href="https://www.figma.com/community/file/1257658419283927894"
            variant="subtle"
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
            Community library
          </ButtonLink>
        </Stack>
      </Stack>
      <Flex
        display={{ base: 'none', sm: 'flex' }}
        flex="1"
        width="40%"
        minWidth="200px"
        h="320px"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          inset: 0,
          bgGradient: 'linear(to-b, white, transparent, white)',
          zIndex: 1,
        }}
        overflow="hidden"
        _dark={{
          _before: {
            bgGradient: 'linear(to-b, gray.800, transparent, gray.800)',
          },
        }}
      >
        <svg
          height="400px"
          width="266px"
          viewBox="0 0 38 57"
          fill="none"
          style={{ position: 'absolute', top: '-20px' }}
        >
          <path
            d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z"
            fill="#1ABCFE"
          />
          <path
            d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5H0Z"
            fill="#0ACF83"
          />
          <path
            d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0L19 0Z"
            fill="#FF7262"
          />
          <path
            d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5H0Z"
            fill="#F24E1E"
          />
          <path
            d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5H0Z"
            fill="#A259FF"
          />
        </svg>
      </Flex>
    </>
  )
}

const codeExamples = {
  form: `import { FormDialog } from '@saas-ui/forms/zod'
import * as z from 'zod'

const schema = z.object({
  name: z.string().nonempty({
    message: 'Please enter a name
  }),
})

export const CreateProject = (props) => {
  return (
    <FormDialog
      title="Create project"
      defaultValues={{
        name: '',
      }}
      schema={schema}
      fields={{
        name: {
          label: 'Name',
          help: 'Choose a cool name for this project',
        }
      }}
      {...props}
    />
  )
}`,
  styleProps: `<Banner
  bg={useColorModeValue('white', 'gray.900')}
  colorScheme="purple"
  backgroundClip="padding-box"
  borderRadius="full"
  border="2px solid transparent"
  position="relative"
  py="2"
  px="3"
  cursor="pointer"
  overflow="visible"
  transitionProperty="common"
  transitionDuration="normal"
  boxShadow="lg"
  _before={{
    content: \`""\`,
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    margin: '-2px',
    bgGradient: 'linear(to-r, purple.500, cyan.500)',
  }}
  _hover={{
    boxShadow: 'sm',
  }}
>
  <BannerIcon boxSize="1" />
  <BannerContent fontSize="sm">
    <BannerTitle>Pre-order Saas UI Pro now!</BannerTitle>
    <BannerDescription display={{ base: 'none', md: 'block' }}>
      50% discount for early adopters.
    </BannerDescription>
  </BannerContent>
  <BannerCloseButton position="absolute" top="2" right="4" />
</Banner>`,
  theme: `export default {
  variants: {
    gradient: (props) => {
      return {
        container: {
          background: mode('white', 'gray.900')(props),
          backgroundClip: 'padding-box',
          borderRadius: 'full',
          border: '2px solid transparent',
          position: 'relative',
          py: 2,
          px: 2,
          cursor: 'pointer',
          overflow: 'visible',
          transitionProperty: 'common',
          transitionDuration: 'normal',
          boxShadow: 'lg'
          _before: {
            content: '""',
            position: 'absolute',
            zIndex: -1,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: 'inherit',
            margin: '-2px',
            bgGradient: 'linear(to-r, purple.500, cyan.500)'
          }
          _hover: {
            boxShadow: 'sm'
          }
        },
        icon: {
          boxSize: '1'
        },
        content: {
          fontSize: 'sm'
        },
        description: {
          display: { base: 'none', md: 'block' }
        },
        close: {
          position: 'absolute',
          top: 2,
          right: 4
        }
      }
    }
  }
}`,
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

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      // announcement: {
      //   title: 'Support us with your GitHub star 🤩',
      //   description:
      //     '<img src="https://img.shields.io/github/stars/saas-js/saas-ui.svg?style=social&label=Star" />',
      //   href: 'https://github.com/saas-js/saas-ui',
      //   action: false,
      // },
      announcement: {
        title: 'Introducing: Better Auth integration',
        href: '/blog/better-auth-authentication-provider',
        action: 'Read more',
      },
      header: {
        position: 'fixed',
        variant: 'dark',
      },
    },
  }
}
