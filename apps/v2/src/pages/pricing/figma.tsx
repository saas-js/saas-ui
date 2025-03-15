import * as React from 'react'

import Script from 'next/script'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Icon,
  IconButton,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'

import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'

import SEO from '@/components/seo'

import { ButtonLink } from '@/components/link'

import { Faq } from '@/components/faq'

import { Testimonial, Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import { Br } from '@saas-ui/react'
import CodePanel from '@/components/code-panel/code-panel'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { SignupForm } from '@/components/signup-form'
import { FaFigma, FaReact } from 'react-icons/fa6'
import Link from 'next/link'

const PricingPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="The React component library for Startups"
        titleTemplate="%s - Figma Pricing"
      />
      <Script
        id="paritydeals-js"
        strategy="afterInteractive"
        src="https://cdn.paritydeals.com/banner.js"
      />
      <Script
        id="lemon-js"
        strategy="afterInteractive"
        src="https://app.lemonsqueezy.com/js/lemon.js"
      />
      <BackgroundGradientRadial
        top="-30%"
        bottom="auto"
        opacity="0.3"
        _dark={{ opacity: 0.5 }}
      />
      <Box mb={8} w="full" position="relative" overflow="hidden">
        <Pricing />

        <TestimonialTabs />

        <Faq />

        <Testimonials />
      </Box>
    </Box>
  )
}

const TestimonialTabs = () => {
  return (
    <Container>
      <Tabs
        variant="unstyled"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TabList mb="6">
          <Tab opacity="0.4" _selected={{ opacity: 1 }}>
            <Avatar
              name="Simon Høiberg"
              src="https://senjaio.b-cdn.net/public/avatar/33d3d3ac-530d-4a2a-a2a9-93621e00bb1d_1698499800957.jpg?width=200"
            />
          </Tab>
          <Tab opacity="0.4" _selected={{ opacity: 1 }}>
            <Avatar
              name="Makenna Smutz"
              src="https://senjaio.b-cdn.net/public/avatar/ecbaf7d4-f379-4693-8366-39bb63d2b623_profile-image.jpeg?width=200"
            />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel textAlign="center">
            <Text
              fontSize="2xl"
              fontWeight="light"
              mb="6"
              _before={{ content: '"“"' }}
              _after={{ content: '"“"' }}
            >
              It&apos;s challenging building something that&apos;s a great
              developer experience and performing well at the same time. SaaS UI
              has been a massive help in this.
            </Text>

            <Text>Simon Høiberg</Text>
            <Text color="muted" fontSize="sm">
              Founder -{' '}
              <a href="https://aidbase.ai/" target="_blank">
                Aidbase
              </a>
            </Text>
          </TabPanel>
          <TabPanel textAlign="center">
            <Text
              fontSize="2xl"
              fontWeight="light"
              mb="6"
              _before={{ content: '"“"' }}
              _after={{ content: '"“"' }}
            >
              Saas UI is fantastic if you want to build fast-as-thought with
              beautiful defaults and still have the flexibility to customize
              when time allows. I truly love building with it!!
            </Text>

            <Text>Makenna Smutz</Text>
            <Text color="muted" fontSize="sm">
              Founder -{' '}
              <a href="https://halite.app/" target="_blank">
                Halite
              </a>
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

const getPaymentLinks = (
  append?: boolean
): {
  standard: string
  team: string
  scale: string
  className?: string
} => {
  let affix = ''

  const affRef =
    typeof window !== 'undefined' &&
    (window as any)?.LemonSqueezy?.Affiliate?.GetId()

  if (append && affRef) {
    affix = `?aff_ref=${affRef}`
  }

  return {
    standard: `https://saas-ui.lemonsqueezy.com/checkout/buy/f01bee85-aa4f-4de9-8e20-f53b0206b26f${affix}`,
    team: `https://saas-ui.lemonsqueezy.com/checkout/buy/afaaf220-0cba-4317-86a9-48b14c07dc0b${affix}`,
    scale: `https://saas-ui.lemonsqueezy.com/checkout/buy/25c366a6-d33f-472c-9c1d-4589c5420d01${affix}`,
    // className: 'lemonsqueezy-button',
  }
}

const Pricing = () => {
  const [paymentLinks, setPaymentLinks] = React.useState(getPaymentLinks())

  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_PAYMENT === 'lemon') {
      /* @ts-ignore */
      window.createLemonSqueezy?.()
    }
  }, [])

  React.useEffect(() => {
    setPaymentLinks(getPaymentLinks(true))
  }, [])

  return (
    <Section id="pricing" pos="relative" innerWidth="container.xl">
      <Box zIndex="2" pos="relative">
        <VStack
          alignItems={'center'}
          spacing={4}
          pt={{ base: '8', lg: '10' }}
          pb="4"
          mb="8"
        >
          <Heading as="h2" size="xl" textStyle="sectionTitle">
            Pricing for every stage
          </Heading>

          <Box>
            <Text fontSize="xl" color="muted">
              Get started for free with 50+ open source components. Upgrade to
              Pro <Br display={{ sm: 'none', lg: 'inline' }} />
              to get all components and features with a license for you or your
              team.
            </Text>
          </Box>
        </VStack>

        <Stack mb="14" align="center">
          <Tabs variant="segments" maxW="lg" index={1}>
            <TabList justifyContent="stretch">
              <Tab
                as={Link}
                href="/pricing"
                alignItems="flex-start"
                height="auto"
                py="3"
                px="3"
                flex="1"
              >
                <Icon as={FaReact} boxSize="8" me="3" />
                <VStack alignItems="flex-start" spacing="1">
                  <Text fontSize="sm">React</Text>
                  <Text size="xs" color="muted" fontWeight="normal">
                    React component library and Next.js starter kit
                  </Text>
                </VStack>
              </Tab>
              <Tab
                as={Link}
                href="/pricing/figma"
                alignItems="flex-start"
                height="auto"
                py="3"
                px="3"
                flex="1"
              >
                <Icon as={FaFigma} boxSize="8" me="3" />
                <VStack alignItems="flex-start" spacing="1">
                  <Text fontSize="sm">Figma</Text>
                  <Text size="xs" color="muted" fontWeight="normal">
                    Official Figma design system &amp; UI Kit
                  </Text>
                </VStack>
              </Tab>
            </TabList>
          </Tabs>
        </Stack>

        <SimpleGrid
          columns={[1, null, 3]}
          spacing={4}
          maxW="container.lg"
          mx="auto"
        >
          <PricingBox
            title={
              <HStack as="span">
                <Text as="span">Personal</Text>
              </HStack>
            }
            description="License for 1 editor. Ideal for designers, freelancers and students."
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €99,-
                </Text>
                <Text>€79,-</Text>
              </HStack>
            }
          >
            <PricingFeatures>
              <PricingFeature
                title="One editor"
                help="One editor per license, you can buy as many licenses as you need. Licenses can be transfered."
              />
              <PricingFeature
                title="Unlimited projects"
                help="You can design unlimited projects."
              />
              <PricingFeature title="50+ components" />
              <PricingFeature title="3000+ variants" />
              <PricingFeature title="Auto-layout" />
              <PricingFeature title="Theming with Figma variables" />
              <PricingFeature title="Dark mode" />
              <PricingFeature
                title="1 year of updates"
                help="Renew your license for 40% discount after one year to keep receiving updates."
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.standard}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  /* @ts-ignore */
                  window?.pirsch?.('Order Figma Standard')
                })
              }}
            >
              Early access
            </ButtonLink>
          </PricingBox>
          <PricingBox
            highlight="primary.500"
            title={
              <HStack as="span">
                <Text as="span">Team</Text>
              </HStack>
            }
            description="License for 5 editors. Ideal for startups and agencies."
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €399,-
                </Text>
                <Text>€199,-</Text>
              </HStack>
            }
          >
            <PricingFeatures>
              <PricingFeature
                title="5 editors"
                help="You can buy as many licenses as you need. Licenses can be transfered."
              />
              <PricingFeature
                title="Unlimited projects"
                help="You can design unlimited projects."
              />
              <PricingFeature title="50+ components" />
              <PricingFeature title="3000+ variants" />
              <PricingFeature title="Auto-layout" />
              <PricingFeature title="Theming with Figma variables" />
              <PricingFeature title="Dark mode" />
              <PricingFeature
                title="1 year of updates"
                help="Renew your license for 40% discount after one year to keep receiving updates."
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.team}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  /* @ts-ignore */
                  window?.pirsch?.('Order Figma Team')
                })
              }}
            >
              Early access
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title={
              <HStack as="span">
                <Text as="span">Scale</Text>
              </HStack>
            }
            description="Up to 20 editors. Ideal for fast growing teams."
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €799,-
                </Text>
                <Text>€599,-</Text>
              </HStack>
            }
          >
            <PricingFeatures>
              <PricingFeature
                title="20 editors"
                help="You can buy as many licenses as you need. Licenses can be transfered."
              />
              <PricingFeature
                title="Unlimited projects"
                help="You can design unlimited projects."
              />
              <PricingFeature title="50+ components" />
              <PricingFeature title="3000+ variants" />
              <PricingFeature title="Auto-layout" />
              <PricingFeature title="Theming with Figma variables" />
              <PricingFeature title="Dark mode" />
              <PricingFeature
                title="1 year of updates"
                help="Renew your license for 40% discount after one year to keep receiving updates."
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.scale}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  /* @ts-ignore */
                  window?.pirsch?.('Order Figma Scale')
                })
              }}
            >
              Early access
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

const PricingFeature = ({
  title,
  iconColor = 'primary.500',
  help = '',
  color = 'inherit',
}) => {
  return (
    <HStack>
      <Icon as={FiCheck} color={iconColor} />{' '}
      <Tooltip label={help}>
        <Text flex="1" fontSize="sm" cursor="default" color={color}>
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

const PricingBox = ({
  title,
  description,
  price,
  highlight = '',
  children,
  ...props
}) => {
  return (
    <VStack
      zIndex="2"
      backdropFilter="blur(100px)"
      transform="translate3d(0, 0, 0)"
      borderRadius="lg"
      p="8"
      flex="1 0"
      alignItems="stretch"
      position="relative"
      _before={{
        content: '""',
        display: 'block',
        pointerEvents: 'none',
        userSelect: 'none',
        position: 'absolute',
        inset: '0px',
        borderRadius: 'inherit',
        padding: '1px',
        bgGradient: highlight
          ? `linear(to-b, ${highlight}, transparent)`
          : 'linear(to-b, blackAlpha.200, transparent)',
        mask: 'linear-gradient(black, black) content-box content-box, linear-gradient(black, black)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor',
      }}
      _dark={{
        _before: {
          bgGradient: highlight
            ? `linear(to-b, ${highlight}, transparent)`
            : 'linear(to-b, whiteAlpha.300, transparent)',
        },
      }}
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
      description="Design engineer as a service. Limited access."
      price={
        <Stack spacing="0" mt="-4">
          <Text fontSize="sm" color="gray.400" fontWeight="medium">
            Starting at
          </Text>
          <HStack>
            <Text>€4750,-</Text>
            <Text fontSize="sm" color="gray.400">
              / month
            </Text>
          </HStack>
        </Stack>
      }
    >
      <PricingFeatures>
        <PricingFeature
          title={<strong>1 spot available</strong>}
          iconColor="green.400"
        />
        <PricingFeature
          title="One request at a time"
          iconColor="cyan.500"
          help="Make as many requests as you like."
        />
        <PricingFeature
          title="Project setup"
          iconColor="cyan.500"
          help="Setup a boilerplate project according to your needs."
        />
        <PricingFeature
          title="Design-system setup"
          iconColor="cyan.500"
          help="Set up you theme based on your brand and design."
        />
        <PricingFeature
          title="Custom component development"
          iconColor="cyan.500"
          help="We develop custom components for your project."
        />
        <PricingFeature
          title="Design services"
          iconColor="cyan.500"
          help="Get help with design challenges from our expert designer."
        />
        <PricingFeature
          title="Private Slack/Discord"
          iconColor="cyan.500"
          help="We join your team in Slack or Discord."
        />
        <PricingFeature
          title="Code reviews"
          iconColor="cyan.500"
          help="We do code reviews to improve code quality and support junior staff."
        />
      </PricingFeatures>
      <Button
        colorScheme="cyan"
        onClick={() => {
          setTimeout(() => {
            /* @ts-ignore */
            window?.pirsch?.('Membership')
            /* @ts-ignore */
            $crisp.push(['do', 'chat:open'])
            /* @ts-ignore */
            $crisp.push(['do', 'message:thread:start', ['Membership']])
            /* @ts-ignore */
            $crisp.push([
              'do',
              'message:send',
              ['text', 'Hey! Thanks for your interest in Saas UI.'],
            ])
            /* @ts-ignore */
            $crisp.push([
              'do',
              'message:send',
              [
                'text',
                "Please share some information about your project and I'll get back to you asap. I'm also happy to plan a call to discuss your project.",
              ],
            ])
          })
        }}
      >
        Get in touch
      </Button>
    </PricingBox>
  )
}

export default PricingPage

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
