import * as React from 'react'

import Script from 'next/script'

import { Box, SimpleGrid } from '@chakra-ui/layout'
import {
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  ButtonGroup,
  useColorModeValue,
  Avatar,
  Img,
} from '@chakra-ui/react'

import Hero from '@/components/marketing/hero'

import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'

import { Em, Br } from '@/components/typography'

import { FallInPlace } from '@/components/motion/fall-in-place'

import SEO from '@/components/seo'
import { CheckIcon } from '@chakra-ui/icons'
import { ButtonLink } from '@/components/link'
import { BackgroundGradient } from '@/components/background-gradient'

import { ReactLogo } from '@/components/logos/react'
import { ChakraLogo } from '@/components/logos/chakra'

import { FaGithub } from 'react-icons/fa'

import { Card, CardBody } from '@saas-ui/card'

import { Faq } from '@/components/faq'
import PageTitle from '@/components/marketing/page-title'

const PricingPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="The React component library for Startups"
        titleTemplate="%s - Pricing"
      />
      <Script
        id="crisp-js"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="65e4ab93-1a03-40da-ae73-7a327854e2f7";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
        }}
      />
      <BackgroundGradient animate={false} />
      <Box mb={8} w="full" position="relative" overflow="hidden">
        <Pricing />

        <Faq />
      </Box>
    </Box>
  )
}

const Pricing = () => {
  return (
    <Section id="pricing" pos="relative" innerWidth="container.2xl">
      <BackgroundGradient animate={false} height="100%" />
      <Box zIndex="2" pos="relative">
        <PageTitle
          title="Pricing for every stage"
          description="Pay once and get life-time access to our high quality components."
          py="20"
          alignItems="center"
        ></PageTitle>

        <SimpleGrid columns={[1, null, 4]} spacing={4}>
          <PricingBox
            title="Open Source"
            description="Basic components, perfect to get started."
            price="Free"
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
              <PricingFeature title="One project" />
              <PricingFeature title="One developer" />
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
                window?.plausible('Order Bootstrap')
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
              <PricingFeature title="1 year of updates" />
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
                window?.plausible('Order Startup')
              }
            >
              Pre-order
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

const MemberShip = () => {
  return (
    <PricingBox
      width="480px"
      margin="80px auto 0 auto"
      title={
        <HStack>
          <Text>Elite membership</Text>
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

const HighlightBox = (props) => {
  const { children, ...rest } = props
  return (
    <VStack
      bgColor={useColorModeValue('gray.100', 'gray.800')}
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
    </VStack>
  )
}

const Testimonial = ({ name, description, avatar, children, ...rest }) => {
  return (
    <Card
      avatar={<Avatar name="Tien Tienth" src={avatar} />}
      title={name}
      subtitle={description}
      {...rest}
    >
      <CardBody>{children}</CardBody>
    </Card>
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
