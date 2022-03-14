import * as React from 'react'
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
  useInterval,
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
} from '@chakra-ui/react'

import Hero from '@/components/marketing/hero'
import Features from '@/components/marketing/features'
import CTA from '@/components/marketing/cta'
import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'

import ScaleInView from '@/components/motion/scale-in-view'

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

import ReactLogo from '/public/frameworks/react.svg'
import ChakraLogo from '/public/frameworks/chakra.svg'

import ReactTextTransition from 'react-text-transition'
import { MDXRemote } from 'next-mdx-remote'

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
  FiUser,
  FiUserPlus,
} from 'react-icons/fi'
import CodeBlock from '@/docs/components/mdx-components/codeblock/codeblock'
import Highlight from '@/docs/components/mdx-components/codeblock/highlight'
import CodePanel from '@/components/code-panel/code-panel'
import { ComponentShowcase } from '@/components/component-showcase'
import { FormDialog } from '@saas-ui/modals'
import { Field } from '@saas-ui/forms'
import { Card, CardBody } from '@saas-ui/card'
import {
  Banner,
  BannerActions,
  BannerCloseButton,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from '@saas-ui/banner'

const texts = ['companies', 'startups', 'apps']

const Home = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const interval = useInterval(() => {
    setActiveIndex(activeIndex + 1)
  }, 2000)

  return (
    <Box>
      <SEO
        title="Saas UI"
        description="The frontend stack for SaaS companies"
        titleTemplate="%s - The frontend stack for SaaS companies"
      />
      <BackgroundGradient animate={false} />
      <Box mb={8} w="full" position="relative" overflow="hidden">
        <Box>
          <Container maxW="container.xl" py="40">
            <HStack>
              <Hero
                id="home"
                justifyContent="flex-start"
                px="0"
                title={
                  <FallInPlace>
                    The frontend stack
                    <Br /> for SaaS{' '}
                    <ReactTextTransition
                      text={texts[activeIndex % texts.length]}
                      style={{ margin: '0 4px' }}
                      inline
                    />
                  </FallInPlace>
                }
                description={
                  <FallInPlace delay={0.4} fontWeight="medium">
                    Saas UI is an <Em>advanced component library</Em>
                    <Br /> that helps you build essential Software-as-a-Service
                    <Br />
                    functionality in hours instead of weeks.
                  </FallInPlace>
                }
              >
                <FallInPlace delay={0.8}>
                  <HStack pt="4" pb="12" spacing="8">
                    <ReactLogo height="28px" /> <ChakraLogo height="20px" />
                  </HStack>

                  <ButtonGroup
                    direction={['column', 'row']}
                    spacing={4}
                    alignItems="center"
                  >
                    <Button
                      colorScheme="primary"
                      size="lg"
                      onClick={() => {
                        document
                          .getElementById('pricing')
                          .scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Get early access
                    </Button>
                    <Button variant="link" as={Link} href="/docs/introduction">
                      View documentation
                    </Button>
                  </ButtonGroup>
                </FallInPlace>
              </Hero>
              <Box
                height="600px"
                position="absolute"
                display={{ base: 'none', lg: 'block' }}
                left={{ lg: '60%', xl: '55%' }}
                width="80vw"
                maxW="1100px"
                margin="0 auto"
              >
                <FallInPlace delay={1}>
                  <Img
                    src="/app.png"
                    position="absolute"
                    width="100%"
                    top="0"
                  />
                </FallInPlace>
              </Box>
            </HStack>
          </Container>
          <Features
            id="benefits"
            columns={[1, 2, 4]}
            iconSize={4}
            innerWidth="container.xl"
            pt="0"
            features={[
              {
                title: 'Accessible',
                icon: FiSmile,
                description:
                  'All components strictly follow WAI-ARIA standards.',
                iconPosition: 'left',
              },
              {
                title: 'Themable',
                icon: FiSliders,
                description:
                  'Fully customize all components to your brand with theme support and style props.',
                iconPosition: 'left',
              },
              {
                title: 'Composable',
                icon: FiGrid,
                description:
                  'Compose components to fit your needs and mix them together to create new ones.',
                iconPosition: 'left',
              },
              {
                title: 'Productive',
                icon: FiThumbsUp,
                description:
                  'Designed to reduce boilerplate and fully typed, build your product at speed.',
                iconPosition: 'left',
              },
            ]}
          />
        </Box>

        <ComponentShowcase />

        <BoilerplateCode />

        <Themable />

        <Highlights />

        <Section
          innerWidth={['100%', null, 'container.xl']}
          position="relative"
          overflow="hidden"
        >
          <Box position="relative">
            <ScaleInView>
              <Heading
                fontWeight="bold"
                fontSize="4xl"
                lineHeight="lg"
                color="white"
                width="50%"
                mb="8"
              >
                Building SaaS products requires you to be a generalist on many
                fronts. However many developers aren&apos;t very design savvy
                and vice versa.
              </Heading>
            </ScaleInView>
            <ScaleInView>
              <HStack
                fontSize="lg"
                spacing="16"
                alignItems="flex-start"
                color="muted"
              >
                <VStack spacing="8" alignItems="flex-start">
                  <Text fontWeight="medium" fontSize="2xl">
                    SaaS UI tries to fill this gap by giving developers an
                    extensive set of beautifully crafted components build on{' '}
                    <Em>best in class tools</Em>. While on the same time serve
                    as a <Em>great foundation</Em> for designers to create their
                    brand.
                  </Text>
                </VStack>
                <VStack spacing="8" alignItems="flex-start">
                  <Text fontWeight="medium" fontSize="2xl">
                    With SaaS UI you&apos;ll <Em>save hundreds of hours</Em>{' '}
                    building essential functionaly for your product. Time that
                    you can use to validate new ideas, find your perfect product
                    market fit and build functionality that makes your product
                    unique.
                  </Text>
                  <Stack direction="row" align="center">
                    <Avatar src="/eelco128.jpg" mr="2" size="md" />
                    <VStack align="flex-start" spacing="0">
                      <Em>Eelco Wiersma</Em>
                      <Text fontSize="sm">Founder Saas UI</Text>
                    </VStack>
                  </Stack>
                </VStack>
              </HStack>
            </ScaleInView>
          </Box>
        </Section>

        <Section innerWidth="container.sm">
          <Testimonial />
        </Section>

        <ProFeatures />

        <Section>
          <ScaleInView>
            <SectionTitle
              title="Plays well with others"
              description="Saas UI is backend agnostic and works with the framework or starter pack that you love."
            />
          </ScaleInView>

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
            <ScaleInView>
              <Link
                href="https://redwoodjs.com"
                p="8"
                h="100%"
                d="flex"
                sx={{
                  path: {
                    fill: useColorModeValue('#000', '#fff'),
                  },
                }}
              >
                <RedwoodJS alt="RedwoodJS logo" />
                <VisuallyHidden>RedwoodJS</VisuallyHidden>
              </Link>
            </ScaleInView>
            <ScaleInView>
              <Link
                href="https://nextjs.com"
                p="8"
                h="100%"
                d="flex"
                sx={{
                  path: {
                    fill: useColorModeValue('#000', '#fff'),
                  },
                }}
              >
                <NextJS alt="Next.JS logo" />
                <VisuallyHidden>Next.js</VisuallyHidden>
              </Link>
            </ScaleInView>
            <ScaleInView>
              <Link href="https://blitzjs.com" p="8" h="100%" d="flex">
                <Blitz alt="Blitz.js logo" />
                <VisuallyHidden>Blitz.js</VisuallyHidden>
              </Link>
            </ScaleInView>
            <ScaleInView>
              <Link
                href="https://supabase.com"
                p="8"
                h="100%"
                d="flex"
                sx={{
                  'path.supabase_svg__wordmark': {
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
            </ScaleInView>
          </SimpleGrid>

          <Text
            fontSize="sm"
            opacity="0.4"
            width={['100%', null, '50%']}
            m="0 auto"
            mt="10"
          >
            Technologies included: Next.js, Electron, React, Chakra UI,
            Typescript, Styled Components, Emotion, React Hook Form, React
            Query, Turborepo, Prettier, Storybook, Jest, Testing Library and
            more...
          </Text>
        </Section>

        <Pricing />

        <RequestAccess />

        <Section id="faq">
          <ScaleInView>
            <SectionTitle title="Frequently asked questions" />
          </ScaleInView>

          <SimpleGrid columns={[1, null, 2]} spacing={10}>
            <FaqItem
              question="How many products can I use Saas UI Pro for?"
              answer={
                <>
                  The single license can be used for one commercial application
                  or SaaS product and unlimited internal tools. You can buy as
                  many licenses as you need. <br /> The unlimited license does
                  not have any restrictions.
                </>
              }
            />
            <FaqItem
              question="Can I use Saas UI Pro for client work?"
              answer="Yes, that's totally up to you, as long as it fits the license you purchase."
            />
            <FaqItem
              question="Can I use Saas UI Pro for Open Source projects?"
              answer="No currently not. A large part of Saas UI is already released under MIT license. We try to give back to the community as much as possible."
            />
            <FaqItem
              question="Does Saas UI include Figma, Sketch or other design files?"
              answer="No, Saas UI does not include any design assets. Maintaining design resources costs a lot of extra effort. We believe small teams can move much faster by designing directly in code, with help of Storybooks."
            />
            <FaqItem
              question="Does Saas UI have a Javascript version?"
              answer="No, we believe Typescript is the way to go in order to produce highly productive and qualitative code that scales."
            />
            <FaqItem
              question="What does 'lifetime access' mean?"
              answer="Saas UI Pro is a one-time purchase, with no recurring subscription. You will have access to all assets of the Saas UI library forever."
            />
            <FaqItem
              question="What does 'free updates' include?"
              answer={
                <>
                  We&apos;ll add new components and improvements to the library
                  as we get new ideas and feedback, these updates will always be
                  free for all customers that sign-up for the early access.{' '}
                  <br />
                  <br />
                  We might release different stacks, for example for Vue and
                  backends, these will be sold seperately.
                </>
              }
            />
            <FaqItem
              question="I'm not satisfied, can I get my money back?"
              answer="Yeah, no hard feelings. Saas UI is opinionated and might not suit your style, let us know within 14 days of your purchase and we'll refurn your money."
            />
            <FaqItem
              question="Do you offer technical support?"
              answer={
                <>
                  Once you sign up you get access to our Discord community,
                  where you can ask questions, report bugs or feature requests
                  and get help from other customers. <br />
                  <br />
                  If you require more specialised support or consultancy contact
                  us at{' '}
                  <Link href="mailto:hello@saas-ui.dev">hello@saas-ui.dev</Link>
                </>
              }
            />
          </SimpleGrid>
        </Section>
      </Box>
    </Box>
  )
}

const RequestAccess = () => {
  return (
    <>
      <ScaleInView>
        <CTA
          id="request-access"
          title="Get early access"
          py="14"
          description={
            <>
              <p>
                Not ready to pre-order yet? No worries, we will notify you when
                we launch.
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
      </ScaleInView>
    </>
  )
}

const Pricing = () => {
  return (
    <Section id="pricing" pos="relative">
      <BackgroundGradient animate={false} height="100%" />
      <Box zIndex="2" pos="relative">
        <ScaleInView>
          <SectionTitle
            title="Pricing for every stage"
            description="Pay once and get life-time access and free updates to our high quality components."
          ></SectionTitle>
        </ScaleInView>

        <ScaleInView>
          <SimpleGrid columns={[1, null, 3]} spacing={4}>
            <PricingBox
              title="Open Source"
              description="Basic components, perfect to get started."
              price="Free"
            >
              <PricingFeatures>
                <PricingFeature title="MIT License" />
                <PricingFeature title="Authentication (supabase/passport.js)" />
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
                <PricingFeature title="One project" />
                <PricingFeature title="One developer" />
                <PricingFeature title="Advanced components" />
                <PricingFeature title="Multiple themes" />
                <PricingFeature title="Next.js and Electron boilerplates" />
                <PricingFeature title="Free updates" />
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
                Pre-order
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
                <PricingFeature title="Unlimited projects" />
                <PricingFeature title="Unlimited developers" />
                <PricingFeature title="Everything from Bootstrap" />
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
                Pre-order
              </ButtonLink>
            </PricingBox>
          </SimpleGrid>

          <Text
            p="8"
            textAlign="center"
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            VAT may be applicable depending on your location.
          </Text>
        </ScaleInView>
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

const PricingFeature = ({ title, iconColor = 'primary.500' }) => {
  return (
    <HStack>
      <CheckIcon color={iconColor} />{' '}
      <Text flex="1" fontSize="sm">
        {title}
      </Text>
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
      <Box color={useColorModeValue('gray.500', 'gray.400')}>{description}</Box>
      <Box fontSize="2xl" fontWeight="bold" py="4">
        {price}
      </Box>
      <VStack align="stretch" justifyContent="stretch" spacing="4" flex="1">
        {children}
      </VStack>
    </VStack>
  )
}

const FaqItem = ({ question, answer }: any) => {
  return (
    <ScaleInView>
      <chakra.dl>
        <chakra.dt fontWeight="semibold">{question}</chakra.dt>
        <chakra.dd color={useColorModeValue('gray.500', 'gray.400')}>
          {answer}
        </chakra.dd>
      </chakra.dl>
    </ScaleInView>
  )
}

const BoilerplateCode = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fieldRef = React.useRef()

  return (
    <Section innerWidth="container.xl">
      <HStack spacing="12">
        <Box py="10" flex="1">
          <Heading
            size="2xl"
            lineHeight="shorter"
            mb="8"
            fontWeight="extrabold"
          >
            Less boilerplate
            <Br /> Build with speed.
          </Heading>
          <VStack spacing="4" alignItems="flex-start">
            <Text fontSize="2xl" color="muted" fontWeight="medium">
              Saas UI ships with an extensive set of foundational and advanced
              components that cover a wide range of use-cases. Carefully crafted
              to reduce boilerplate code without sacrificing flexibility.
            </Text>
            <Text fontSize="md" color="muted" fontWeight="medium">
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
          <Box width="90%">
            <CodePanel language="typescript">{codeExamples.form}</CodePanel>
          </Box>
        </Box>
      </HStack>
    </Section>
  )
}

const Themable = () => {
  return (
    <Section innerWidth="container.xl">
      <Box py="10" flex="1" width="50%">
        <Heading size="2xl" mb="8" fontWeight="extrabold">
          Make it yours.
        </Heading>
        <VStack spacing="4" alignItems="flex-start">
          <Text fontSize="2xl" color="muted" fontWeight="medium">
            Thanks to Saas UI is build on top of Chakra UI and inherits
            excellent styling support. Effortlessly customize all components
            directly through style props or with a custom theme.
          </Text>
        </VStack>
      </Box>
      <HStack spacing="12">
        <Box
          display="flex"
          flex="1"
          alignItems="center"
          justifyContent="center"
          bg="codeBackground"
          borderRadius="2xl"
        >
          <Tabs width="100%" colorScheme="purple">
            <TabList>
              <Tab>Style props</Tab>
              <Tab>Theme</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CodePanel language="typescript">
                  {codeExamples.styleProps}
                </CodePanel>
              </TabPanel>
              <TabPanel>
                <CodePanel language="typescript">
                  {codeExamples.theme}
                </CodePanel>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box
          display="flex"
          flex="1"
          p="10"
          alignItems="center"
          justifyContent="center"
          // bg="purple.500"
          borderRadius="2xl"
        >
          <Banner
            variant="solid"
            colorScheme="purple"
            borderRadius="full"
            justifyContent="center"
            py="2"
            px="3"
            cursor="pointer"
            transitionProperty="common"
            transitionDuration="normal"
            _hover={{ bg: 'purple.600' }}
          >
            <BannerIcon boxSize="14px" />
            <BannerContent>
              <BannerTitle fontSize="sm">
                Pre-order Saas UI Pro now!
              </BannerTitle>
              <BannerDescription fontSize="sm">
                50% discount for early adoptors.
              </BannerDescription>
            </BannerContent>
            <BannerCloseButton position="absolute" top="2" right="4" />
          </Banner>
        </Box>
      </HStack>
    </Section>
  )
}

const Highlights = () => {
  const { value, onCopy, hasCopied } = useClipboard('yarn add @saas-ui/react')
  return (
    <Section innerWidth="container.lg" position="relative" overflow="hidden">
      <BackgroundGradient />
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={8}
        position="relative"
      >
        <GridItem
          colSpan={2}
          as={VStack}
          alignItems="flex-start"
          p="8"
          spacing="8"
          borderRadius="lg"
          bg="blackAlpha.500"
        >
          <Heading>Core components</Heading>
          <Text color="muted" fontSize="xl" fontWeight="medium">
            Get started for free with <Em>30+ community components</Em>.
            Including authentication screens with Supabase, Magic.link and
            Clerk. Fully functional forms with React Hook Form.
            <Br />
          </Text>
          <HStack spacing="12">
            <HStack py="2" px="4" borderRadius="full" bg="black">
              <CodePanel language="bash">{value}</CodePanel>
              <IconButton
                icon={hasCopied ? <FiCheck /> : <FiCopy />}
                aria-label="copy"
                onClick={onCopy}
                variant="ghost"
              />
            </HStack>
            <Button variant="ghost" as={Link} href="/docs/introduction">
              Read documentation
            </Button>
          </HStack>
        </GridItem>
        <GridItem
          as={VStack}
          alignItems="flex-start"
          p="8"
          spacing="8"
          borderRadius="lg"
          bg="blackAlpha.500"
        >
          <Heading>Starter kit</Heading>
          <Text color="muted" fontSize="xl" fontWeight="medium">
            Get started for free with <Em>30+ community components</Em>.
            Including authentication screens with Supabase, Magic.link and
            Clerk. Fully functional forms with React Hook Form.
            <Br />
          </Text>
        </GridItem>
        <GridItem
          as={VStack}
          alignItems="flex-start"
          p="8"
          spacing="8"
          borderRadius="lg"
          bg="blackAlpha.500"
        ></GridItem>
        <GridItem
          colSpan={2}
          as={VStack}
          alignItems="flex-start"
          p="8"
          spacing="8"
          borderRadius="lg"
          bg="blackAlpha.500"
        ></GridItem>
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
  variant="subtle"
  colorScheme="primary"
  borderRadius="full"
  justifyContent="center"
  py="2"
  px="3"
  cursor="pointer"
  _hover={{ bg: 'rgba(211, 190, 244, 0.2)' }}
>
  <BannerIcon boxSize="14px" />
  <BannerContent flex="inherit">
    <BannerTitle fontSize="sm">Pre-order</BannerTitle>
    <BannerDescription fontSize="sm">
      Saas UI Pro is available now.
    </BannerDescription>
  </BannerContent>
  <BannerCloseButton position="absolute" top="2" right="4" />
</Banner>`,
  theme: ``,
}

const ProFeatures = () => {
  return (
    <Features
      id="features"
      title={
        <Heading lineHeight="short" size="2xl">
          Not your standard
          <Br /> admin template.
        </Heading>
      }
      description={
        <Text fontSize="2xl">
          Saas UI Pro includes everything you need to build frontends that
          scale.
          <Br />
          Use it as a template for your next product or foundation for your
          design system.
        </Text>
      }
      align="left"
      variant="alternate"
      columns={[1, null, 3]}
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
            'Example apps in Next.JS, Electron and Vite. Including authentication, billing, example pages, everything you need to get started FAST.',
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
      reveal
    />
  )
}

const Testimonial = ({ name, avatar, testimonial }) => {
  return (
    <Card
      avatar={<Avatar name="Tien Tienth" src="/testimonials/turbothinh.png" />}
      title="Tien Thinh"
      subtitle="@turbothinh"
    >
      <CardBody>
        Saas UI is the ONLY template out there that does the code structure that
        I think can scale 😄
      </CardBody>
    </Card>
  )
}

export default Home

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
