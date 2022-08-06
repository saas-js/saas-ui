import * as React from 'react'

import dynamic from 'next/dynamic'
import Script from 'next/script'
import Image from 'next/image'

import { Box, SimpleGrid } from '@chakra-ui/layout'
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
  Icon,
  Center,
  Tooltip,
  AspectRatio,
} from '@chakra-ui/react'

import Hero from '@/components/marketing/hero'
import Features from '@/components/marketing/features'
import CTA from '@/components/marketing/cta'
import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'

import RedwoodJS from '/public/frameworks/redwood.svg'
import NextJS from '/public/frameworks/nextjs.svg'
import Blitz from '/public/frameworks/blitz.svg'
import Supabase from '/public/frameworks/supabase.svg'

import { SignupForm } from '@/components/signup-form'
import { Em, Br } from '@/components/typography'

import { FallInPlace } from '@/components/motion/fall-in-place'

import SEO from '@/components/seo'
import { CheckIcon } from '@chakra-ui/icons'
import { ButtonLink } from '@/components/link'
import { BackgroundGradient } from '@/components/background-gradient'

import { ReactLogo } from '@/components/logos/react'
import { ChakraLogo } from '@/components/logos/chakra'

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
import { FaGithub } from 'react-icons/fa'
import { FormDialog } from '@saas-ui/modals'
import { Field } from '@saas-ui/forms'
import { Card, CardBody } from '@saas-ui/card'
import {
  Banner,
  BannerCloseButton,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from '@saas-ui/banner'

import { transparentize } from '@chakra-ui/theme-tools'
import { Testimonial, Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { BackgroundGradientRadial } from '@/components/background-gradient-radial'

const CodePanel = dynamic(() => import('@/components/code-panel/code-panel'))
const ComponentShowcase = dynamic(() =>
  import('@/components/component-showcase').then((mod) => mod.ComponentShowcase)
)

const Home = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="The React component library for Startups"
        titleTemplate="%s - The React component library for Startups"
      />

      <Box mb={8} w="full" position="relative" overflow="hidden">
        <Box _dark={{ bg: 'black' }}>
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
                  <FallInPlace textAlign="center">
                    Build intuitive apps that your customers will love
                  </FallInPlace>
                }
                description={
                  <FallInPlace
                    delay={0.4}
                    fontWeight="medium"
                    textAlign="center"
                  >
                    Saas UI is a <Em>React component library</Em> and{' '}
                    <Em>starterkit</Em>
                    <Br display={{ base: 'none', md: 'inline' }} /> that
                    doesn&apos;t get in your way and helps you <Br /> build
                    intuitive SaaS products with speed.
                  </FallInPlace>
                }
              >
                <FallInPlace delay={0.6}>
                  <HStack pt="12" pb="12" spacing="8" justifyContent="center">
                    <HStack>
                      <ReactLogo height="24px" />
                      <Text fontWeight="medium">React</Text>
                    </HStack>
                    <ChakraLogo height="24px" />
                  </HStack>
                </FallInPlace>
                <FallInPlace delay={0.8}>
                  <ButtonGroup spacing={4} alignItems="center">
                    <Button
                      colorScheme="primary"
                      size="lg"
                      onClick={() => {
                        document
                          .getElementById('pricing')
                          .scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Buy Pro
                    </Button>
                    <ButtonLink
                      size="lg"
                      href="/docs/introduction"
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
                      Read documentation
                    </ButtonLink>
                  </ButtonGroup>
                </FallInPlace>
              </Hero>
              <Box
                width="80vw"
                maxW="1100px"
                margin="0 auto"
                alignItems="center"
                position="relative"
                zIndex="2"
              >
                <FallInPlace delay={1}>
                  <AspectRatio ratio={1100 / 698}>
                    <Image
                      src="/screenshots/list.png"
                      layout="fill"
                      width="1100px"
                      height="698px"
                      alt="Screenshot of a ListPage in Saas UI Pro"
                      quality="75"
                      priority
                    />
                  </AspectRatio>
                </FallInPlace>
              </Box>
            </Stack>
            <BackgroundGradientRadial bottom="0" />
          </Container>
          <Features
            id="benefits"
            columns={[1, 2, 4]}
            iconSize={4}
            innerWidth="container.xl"
            pt="20"
            features={[
              {
                title: 'Accessible',
                icon: FiSmile,
                description:
                  'All components strictly follow WAI-ARIA standards.',
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
            reveal={FallInPlace}
          />
        </Box>

        <ComponentShowcase />

        <Box id="features">
          <BoilerplateCode />

          <Themable />

          <Highlights />
        </Box>

        <Founder />

        <ProFeatures />

        <Screenshots />

        <Testimonials />

        <Pricing />

        <RequestAccess />

        <Faq />
      </Box>
    </Box>
  )
}

const Screenshots = () => {
  return (
    <Section innerWidth="container.xl" variant="alternate" pt="0">
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
            layout="fixed"
            width="1528px"
            height="1060px"
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
            layout="fixed"
            width="1607px"
            height="1021px"
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
          fontWeight="bold"
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
              SaaS UI tries to fill this gap by giving developers an extensive
              set of beautifully crafted components built on{' '}
              <Em>best in class tools</Em>. While on the same time serve as a{' '}
              <Em>great foundation</Em> for designers to create their brand.
            </Text>
          </VStack>
          <VStack spacing="8" alignItems="flex-start">
            <Text fontSize={['xl', null, '2xl']}>
              With SaaS UI you&apos;ll <Em>save hundreds of hours</Em> building
              essential functionaly for your product. Time that you can use to
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

const RequestAccess = () => {
  return (
    <>
      <CTA
        id="request-access"
        title="Stay up to date"
        py="14"
        description={
          <>
            <p>
              Not ready to pre-order yet? Leave your details and we&apos;ll keep
              you informed.
            </p>
          </>
        }
        variant="subtle"
      >
        <Container
          borderRadius="md"
          bg={useColorModeValue('white', 'gray.700')}
          borderWidth="1px"
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          p={8}
          width={['90vw', null, 'md']}
        >
          <SignupForm />
        </Container>
      </CTA>
    </>
  )
}

const Pricing = () => {
  return (
    <Section id="pricing" pos="relative" innerWidth="container.xl">
      <BackgroundGradient animate={false} height="100%" />
      <Box zIndex="2" pos="relative">
        <SectionTitle
          title="Pricing for every stage"
          description="Pay once and get life-time access to our high quality components."
        ></SectionTitle>

        <SimpleGrid columns={[1, null, 4]} spacing={4}>
          <PricingBox
            title="Open Source"
            description="Basic components, perfect to get started."
            price="Free forever"
          >
            <PricingFeatures>
              <PricingFeature title="MIT License" />
              <PricingFeature title="Authentication (Clerk/Supabase/Magic)" />
              <PricingFeature title="Forms (react-hook-form)" />
              <PricingFeature title="Modals manager" />
              <PricingFeature title="Hotkeys" />
              <PricingFeature title="Web3 components" />
              <Text fontSize="sm">And much more...</Text>
            </PricingFeatures>
            <ButtonLink href="/docs/introduction" variant="outline" mt="10">
              View documentation
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title="Bootstrap"
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €199,-
                </Text>
                <Text>€99,-</Text>
              </HStack>
            }
            description="Complete frontend stack for bootstrappers and small teams."
            borderColor="primary.500"
            boxShadow="md"
          >
            <PricingFeatures>
              <PricingFeature
                title="One developer"
                help="One developer per license, you can buy as many licenses as you need. Licenses can be transfered."
              />
              <PricingFeature
                title={<>Unlimited projects</>}
                help="You can build and fail as many self hosted SaaS products as you like. Maximum 1 client project per license."
              />
              <PricingFeature title="Advanced components" />
              <PricingFeature title="Multiple themes" />
              <PricingFeature title="Next.js and Electron boilerplates" />
              <PricingFeature title="Private discord community" />
              <PricingFeature title="1 year of updates" />
              <br />
              <PricingFeature
                title="Private beta access"
                iconColor="green.500"
              />
            </PricingFeatures>
            <ButtonLink
              colorScheme="primary"
              href="https://appulse.gumroad.com/l/saas-ui-pro-pre-order?variant=Single%20license"
              className="gumroad-button"
              onClick={() =>
                /* @ts-ignore */
                window?.woopra.track('Order Bootstrap')
              }
            >
              Early access
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title="Startup"
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €999,-
                </Text>
                <Text>€499,-</Text>
              </HStack>
            }
            description="Unlimited license for growing teams."
          >
            <PricingFeatures>
              <PricingFeature
                title="Unlimited developers"
                help="A developer can be either an employee or a contracted freelancer."
              />
              <PricingFeature
                title="Unlimited projects"
                help="No restrictions on commercial projects or client work."
              />
              <PricingFeature title="Everything from Bootstrap" />
              <PricingFeature title="1 year of updates" />
              <br />
              <PricingFeature
                title="Private beta access"
                iconColor="green.500"
              />
            </PricingFeatures>
            <ButtonLink
              colorScheme="primary"
              href="https://appulse.gumroad.com/l/saas-ui-pro-pre-order?variant=Unlimited%20license"
              className="gumroad-button"
              onClick={() =>
                /* @ts-ignore */
                window?.woopra.track('Order Startup')
              }
            >
              Early access
            </ButtonLink>
          </PricingBox>
          <MemberShip />
        </SimpleGrid>

        <Text
          p="8"
          textAlign="center"
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          VAT may be applicable depending on your location.
        </Text>
      </Box>
    </Section>
  )
}

const PricingFeatures = ({ children }) => {
  return (
    <VStack
      align="stretch"
      justifyContent="stretch"
      spacing="4"
      mb="8"
      flex="1"
    >
      {children}
    </VStack>
  )
}

const PricingFeature = ({ title, iconColor = 'primary.500', help = '' }) => {
  return (
    <HStack>
      <CheckIcon color={iconColor} />{' '}
      <Tooltip label={help}>
        <Text flex="1" fontSize="sm" cursor="default">
          <Text
            as="span"
            borderStyle="dotted"
            borderBottomWidth={help ? '1px' : 'none'}
            borderColor="currentColor"
          >
            {title}
          </Text>
        </Text>
      </Tooltip>
    </HStack>
  )
}

const PricingBox = ({ title, description, price, children, ...props }) => {
  return (
    <VStack
      zIndex="2"
      bg={useColorModeValue('whiteAlpha.600', 'blackAlpha.300')}
      borderRadius="md"
      p="8"
      flex="1 0"
      alignItems="stretch"
      border="1px solid"
      borderColor={useColorModeValue('gray.400', 'gray.800')}
      {...props}
    >
      <Heading as="h3" size="md" fontWeight="bold" fontSize="lg" mb="2">
        {title}
      </Heading>
      <Box color={useColorModeValue('gray.500', 'gray.400')} fontSize="md">
        {description}
      </Box>
      <Box fontSize="2xl" fontWeight="bold" py="4">
        {price}
      </Box>
      <VStack align="stretch" justifyContent="stretch" spacing="4" flex="1">
        {children}
      </VStack>
    </VStack>
  )
}

const MemberShip = () => {
  return (
    <PricingBox
      title={
        <HStack>
          <Text>Membership</Text>
        </HStack>
      }
      description="Limited access membership for teams that want to get moving fast."
      price={
        <Stack spacing="0">
          <Text fontSize="sm" color="gray.400" fontWeight="medium">
            Starting at
          </Text>
          <HStack>
            <Text>€2000,-</Text>
            <Text fontSize="sm" color="gray.400">
              / month
            </Text>
          </HStack>
        </Stack>
      }
    >
      <PricingFeatures>
        <PricingFeature
          title="Custom component development"
          iconColor="cyan.500"
        />
        <PricingFeature title="Help with implementation" iconColor="cyan.500" />
        <PricingFeature title="Project setup" iconColor="cyan.500" />
        <PricingFeature title="Hands-on support" iconColor="cyan.500" />
      </PricingFeatures>
      <ButtonLink
        href="mailto:hello@saas-ui.dev?subject=Elite membership"
        colorScheme="cyan"
      >
        Get in touch
      </ButtonLink>
    </PricingBox>
  )
}

const BoilerplateCode = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fieldRef = React.useRef()

  return (
    <Section innerWidth="container.xl">
      <Stack spacing="12" direction={['column', null, 'row']}>
        <Box py="10" flex="1">
          <Heading
            size="2xl"
            lineHeight="shorter"
            mb="8"
            fontWeight="extrabold"
          >
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
          bg="codeBackground"
          borderRadius="2xl"
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
      <Box py="10" flex="1" width={['full', null, '50%']}>
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
          bg="codeBackground"
          borderRadius="2xl"
        >
          <Tabs width="100%" colorScheme="white">
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
      bg={useColorModeValue('gray.100', 'gray.800')}
      bgGradient="linear(to-bl,white, gray.50)"
      _dark={{
        bgGradient: 'linear(to-bl, whiteAlpha.50, transparent)',
      }}
      borderRadius="md"
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
  const { value, onCopy, hasCopied } = useClipboard('yarn add @saas-ui/react')
  return (
    <Section innerWidth="container.xl" position="relative" overflow="hidden">
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={8}
        position="relative"
      >
        <GridItem colSpan={[1, null, 2]} as={HighlightBox}>
          <Heading fontSize="1.4em">Core components</Heading>
          <Text color="muted" fontSize="xl">
            Get started for free with <Em>30+ open source components</Em>.
            Including authentication screens with Clerk, Supabase and Magic.
            Fully functional forms with React Hook Form. Data tables with React
            Table.
          </Text>
          <Button
            colorScheme="black"
            variant="link"
            as={Link}
            href="/docs/introduction"
            rightIcon={<FiArrowRight />}
          >
            Read documentation
          </Button>
          <HStack spacing="12">
            <HStack
              py="1"
              px="2"
              borderRadius="full"
              bg="codeBackground"
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
          </HStack>
        </GridItem>
        <GridItem as={HighlightBox}>
          <Heading fontSize="1.4em">Solid foundations</Heading>
          <Text color="muted" fontSize="lg">
            We don&apos;t like to re-invent the wheel, neither should you. We
            selected the most productive and established tools in the scene and
            built Saas UI on top of it. <Br />
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
            avatar="/testimonials/turbothinh.png"
            name="Tien Thinh"
            description={
              <Text color="whiteAlpha.700" as="span">
                @turbothinh
              </Text>
            }
            border="0"
            bg="transparent"
            boxShadow="none"
            color="white"
            sx={{
              '& p': {
                color: useColorModeValue('blackAlpha.600', 'whiteAlpha.500'),
              },
            }}
            position="relative"
          >
            Saas UI is the ONLY template out there that does the code structure
            that I think can scale 😄
          </Testimonial>
        </GridItem>
        <GridItem colSpan={[1, null, 2]} as={HighlightBox}>
          <Heading fontSize="1.4em">
            Start your next idea two steps ahead
          </Heading>
          <Text color="muted" fontSize="lg">
            We take care of all your basic frontend needs, so you can start
            building functionality that makes your product unique.
          </Text>
          <Wrap>
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
              'responsiveness',
            ].map((value) => (
              <Tag
                key={value}
                variant="subtle"
                colorScheme="purple"
                rounded="full"
                px="3"
              >
                {value}
              </Tag>
            ))}
          </Wrap>
        </GridItem>
        <GridItem colSpan={[1, null, 2]} as={HighlightBox}>
          <Heading fontSize="1.4em">Plays well with others</Heading>
          <Text color="muted" fontSize="lg">
            <>
              Saas UI is backend agnostic and works with the framework
              <Br /> or starter pack that you love.
            </>
          </Text>
          <SimpleGrid
            columns={[2, null, 4]}
            columnGap={8}
            sx={{
              svg: {
                width: '80%',
                height: 'auto',
                maxHeight: '40px',
              },
            }}
          >
            <Link
              href="https://nextjs.com"
              p="8"
              h="100%"
              display="flex"
              sx={{
                path: {
                  fill: useColorModeValue('#000', '#fff'),
                },
              }}
            >
              <NextJS alt="Next.JS logo" />
              <VisuallyHidden>Next.js</VisuallyHidden>
            </Link>

            <Link href="https://blitzjs.com" p="8" h="100%" display="flex">
              <Blitz alt="Blitz.js logo" />
              <VisuallyHidden>Blitz.js</VisuallyHidden>
            </Link>

            <Link
              href="https://redwoodjs.com"
              p="8"
              h="100%"
              display="flex"
              sx={{
                path: {
                  fill: useColorModeValue('#000', '#fff'),
                },
              }}
            >
              <RedwoodJS alt="RedwoodJS logo" />
              <VisuallyHidden>RedwoodJS</VisuallyHidden>
            </Link>

            <Link
              href="https://supabase.com"
              p="8"
              h="100%"
              display="flex"
              sx={{
                'path.wordmark': {
                  fill: useColorModeValue('#1F1F1F', '#FFF'),
                },
              }}
            >
              <Supabase
                alt="Supabase logo"
                viewBox="0 0 581 113" // somehow this gets removed when importing
              />
              <VisuallyHidden>Supabase</VisuallyHidden>
            </Link>
          </SimpleGrid>
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
              <Text color="whiteAlpha.700" as="span">
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

const codeExamples = {
  form: `import * as React from 'react'
import { FormDialog, Field } from '@saas-ui/react'

interface CreateProjectInputs {
  name: string
}

export const CreateProject = (props) => {
  return (
    <FormDialog<CreateProjectInputs>
      title="Create project"
      defaultValues={{
        name: '',
      }}
      {...props}
    >
        <Field
          name="name"
          label="Name"
          help="Choose a cool name for this project"
          rules={{ required: 'Please enter a name' }}
        />
    </FormDialog>
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
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="left"
          as="p"
        >
          Not your standard
          <Br /> dashboard template.
        </Heading>
      }
      description={
        <Text fontSize={['xl', null, '2xl']}>
          Saas UI Pro includes everything you need to build frontends that
          scale.
          <Br />
          Use it as a template for your next product or foundation for your
          design system.
        </Text>
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
        title: 'Support us by becoming a stargazer! 🚀 ',
        description:
          '<img src="https://img.shields.io/github/stars/saas-js/saas-ui.svg?style=social&label=Star" />',
        href: 'https://github.com/saas-js/saas-ui',
        action: false,
      },
      header: {
        position: 'sticky',
        variant: 'dark',
      },
    },
  }
}
