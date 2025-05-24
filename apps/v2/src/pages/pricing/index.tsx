import * as React from 'react'

import Script from 'next/script'

import {
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

import SEO from '@/components/seo'

import { ButtonLink } from '@/components/link'

import { Faq } from '@/components/faq'

import { Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import { Br, CheckIcon } from '@saas-ui/react'
import CodePanel from '@/components/code-panel/code-panel'
import { FiCheck, FiCopy } from 'react-icons/fi'

import Link from 'next/link'
import { FaFigma, FaReact } from 'react-icons/fa6'

const PricingPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="The React component library for Startups"
        titleTemplate="%s - Pricing"
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
        onLoad={() => {
          /* @ts-ignore */
          // window.createLemonSqueezy?.()
        }}
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

const getAffiliateId = () => {
  try {
    return (
      typeof window !== 'undefined' &&
      (window as any)?.LemonSqueezy?.Affiliate?.GetId()
    )
  } catch (e) {
    return null
  }
}

const getPaymentLinks = (
  append?: boolean
): {
  figma: string
  bootstrap: string
  startup: string
  className?: string
} => {
  let affix = ''

  const affRef = getAffiliateId()

  if (append && affRef) {
    affix = `?aff_ref=${affRef}`
  }

  return {
    figma: `https://saas-ui.lemonsqueezy.com/checkout/buy/f01bee85-aa4f-4de9-8e20-f53b0206b26f${affix}`,
    bootstrap: `https://saas-ui.lemonsqueezy.com/checkout/buy/5c76854f-738a-46b8-b32d-932a97d477f5${affix}`,
    startup: `https://saas-ui.lemonsqueezy.com/checkout/buy/bda4c7f4-e012-4956-96eb-e0efca6b91b0${affix}`,
  }
}

const Install = () => {
  const { value, onCopy, hasCopied } = useClipboard(
    'npm install @saas-ui/react'
  )
  return (
    <Center>
      <HStack py="1" px="2" borderRadius="full" bg="code-bg" borderWidth="1px">
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
    </Center>
  )
}

const Pricing = () => {
  const [paymentLinks, setPaymentLinks] = React.useState(getPaymentLinks())

  React.useEffect(() => {
    /* @ts-ignore */
    window.createLemonSqueezy?.()
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
          <Tabs variant="segments" width="full" maxW="xl">
            <TabList justifyContent="stretch">
              <Tab
                as={Link}
                href="/pricing"
                alignItems="flex-start"
                justifyContent="flex-start"
                height="auto"
                py="3"
                px="3"
                flex="1"
              >
                <Icon as={FaReact} boxSize="6" me="2" />
                <VStack alignItems="flex-start" spacing="1">
                  <Text>React</Text>
                  <Text size="xs" color="muted" fontWeight="normal">
                    React components and starter kits
                  </Text>
                </VStack>
              </Tab>
              <Tab
                as={Link}
                href="/pricing/figma"
                alignItems="flex-start"
                justifyContent="flex-start"
                height="auto"
                py="3"
                px="3"
                flex="1"
              >
                <Icon as={FaFigma} boxSize="6" me="2" />
                <VStack alignItems="flex-start" spacing="1">
                  <Text>Figma</Text>
                  <Text size="xs" color="muted" fontWeight="normal">
                    Figma design system &amp; UI Kit
                  </Text>
                </VStack>
              </Tab>
            </TabList>
          </Tabs>
        </Stack>

        <SimpleGrid columns={[1, null, 2, 4]} spacing={4}>
          <PricingBox
            title="Open Source"
            description="Free components and templates."
            price="Free forever"
          >
            <PricingFeatures>
              <PricingFeature title="MIT License" />
              <PricingFeature title="Free blocks" />
              <PricingFeature title="Forms (react-hook-form)" />
              <PricingFeature title="Modals manager" />
              <PricingFeature title="Hotkeys" />
              <Text fontSize="sm">And much more...</Text>
            </PricingFeatures>
            <ButtonLink href="/docs" variant="outline" mt="10">
              View documentation
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title="Single license"
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €347,-
                </Text>
                <Text>€297,-</Text>
              </HStack>
            }
            description="For one developer."
          >
            <PricingFeatures>
              <PricingFeature
                title="One developer"
                help="One developer per license, you can buy as many licenses as you need. Licenses can be transfered."
              />
              <PricingFeature
                title={<>Unlimited projects*</>}
                help="You can build and fail as many self hosted SaaS products as you like. Maximum 1 client project per license."
              />
              <PricingFeature title="Blocks &amp; Pro components" />
              <PricingFeature
                title={
                  <HStack as="span">
                    <Text as="span">Next + Tanstack starter kits</Text>
                  </HStack>
                }
              />
              <PricingFeature title="Multiple themes" />
              <PricingFeature title="Private discord community" />

              <PricingFeature
                title="1 year of updates"
                help="Renew your license for 40% discount after one year to keep receiving updates.  You keep access to all components and features even if you don't renew."
              />
              <PricingFeature
                title="Private beta access"
                iconColor="green.500"
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.bootstrap}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  try {
                    /* @ts-ignore */
                    window?.pirsch?.('Order Bootstrap', {
                      meta: {
                        aff: localStorage.getItem('aff'),
                      },
                    })
                  } catch (e) {
                    console.log(e)
                  }
                })
              }}
            >
              Buy Pro
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title="Team license"
            highlight="primary.500"
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €997,-
                </Text>
                <Text>€797,-</Text>
              </HStack>
            }
            description="For growing teams or agencies."
          >
            <PricingFeatures>
              <PricingFeature
                title="Up to 20 developers"
                help="Need more developers? Get in touch for a custom offer."
              />
              <PricingFeature
                title="Unlimited projects"
                help="No restrictions on commercial projects or client work."
              />
              <PricingFeature title="Everything from Bootstrap" />
              <PricingFeature title="Prioritized feature requests" />
              <PricingFeature title="Priority support" />
              <PricingFeature title="Private discord community" />
              <PricingFeature
                title="1 year of updates"
                help="Renew your license for 40% discount after one year to keep receiving updates. You keep access to all components and features even if you don't renew."
              />
              <PricingFeature
                title="Private beta access"
                iconColor="green.500"
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.startup}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  try {
                    /* @ts-ignore */
                    window?.pirsch?.('Order Startup', {
                      meta: {
                        aff: localStorage.getItem('aff'),
                      },
                    })
                  } catch (e) {
                    console.log(e)
                  }
                })
              }}
            >
              Buy Pro
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
    <VStack align="stretch" spacing="4" mb="8" flex="1">
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
      <CheckIcon color={iconColor} />{' '}
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
      <Heading as="h3" size="md" fontWeight="bold" fontSize="lg">
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
          <Text>Enterprise</Text>
        </HStack>
      }
      description="Get expert support."
      price={
        <Stack spacing="0" mt="-4">
          <Text fontSize="sm" color="muted" fontWeight="medium">
            Starting at
          </Text>
          <HStack>
            <Text>€4750,-</Text>
            <Text fontSize="sm" color="muted" fontWeight="medium">
              / month
            </Text>
          </HStack>
        </Stack>
      }
    >
      <PricingFeatures>
        <PricingFeature
          title="Custom license pricing"
          iconColor="cyan.500"
          help="Customized pricing based on your needs."
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
          title="Design system setup"
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
