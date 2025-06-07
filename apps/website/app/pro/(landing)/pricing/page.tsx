import { ActionArrow } from '@/components/action-arrow'
import { LinkButton } from '@/components/link-button'
import { CustomersSection } from '@/components/site/customers.section'
import {
  Box,
  ButtonGroup,
  Container,
  Grid,
  HStack,
  Heading,
  Icon,
  List,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Accordion } from '@saas-ui/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TbArrowRight, TbCheck } from 'react-icons/tb'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pricing for the Pro plan',
}

export default function Page() {
  return (
    <Stack gap="12">
      <Container maxW="6xl" position="static">
        <Hero />

        <Pricing />

        <CustomersSection />
      </Container>

      <Benefits />

      <FAQ />
    </Stack>
  )
}

function Hero() {
  return (
    <Stack mt="24" pt="12" alignItems="flex-start" gap="4">
      <Box
        as="span"
        fontSize="xs"
        borderWidth="1px"
        borderRadius="full"
        px="2"
        py="0.5"
        fontWeight="medium"
        textAlign="center"
      >
        Pricing
      </Box>
      <Stack gap="5" maxW="4xl" alignItems="center" mb="8">
        <Heading
          as="h1"
          fontSize="4xl"
          lineHeight="1"
          textWrap="balance"
          maxW="md"
        >
          Find the right plan for your needs
        </Heading>
      </Stack>
    </Stack>
  )
}

function Pricing() {
  return (
    <Stack>
      <Separator
        position="absolute"
        left="0"
        width="100vw"
        borderStyle="dashed"
      />
      <Separator
        position="absolute"
        left="0"
        transform="translateY(150px)"
        width="100vw"
        borderStyle="dashed"
      />
      <Grid
        templateColumns={{
          base: '1fr',
          lg: 'repeat(3, 1fr)',
        }}
        gap="0"
        w="full"
      >
        <Box
          textStyle="md"
          p="10"
          lg={{
            borderLeftWidth: '1px',
            borderStyle: 'dashed',
          }}
        >
          <Text fontSize="sm" color="fg.subtle">
            Single license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Individuals
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $297
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              Single developer license for unlimited self-hosted SaaS projects.
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Pro blocks and templates
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Next.js and Tanstack starter kits
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Life-time access
              </List.Item>
            </List.Root>
          </Box>

          <LinkButton variant="glass" colorPalette="accent" href="">
            Buy now
          </LinkButton>
        </Box>
        <Box
          textStyle="md"
          lg={{
            borderLeftWidth: '1px',
            borderRightWidth: '1px',
            borderStyle: 'dashed',
          }}
          p="10"
        >
          <Text fontSize="sm" color="fg.subtle">
            Team license
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Teams
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            $897
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              For teams and agencies up to 20 developers and unlimited projects.
            </Text>

            <Text fontWeight="medium" mb="2">
              Everything in Individual plan, plus:
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Priority support and feature requests
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Life-time access
              </List.Item>
            </List.Root>
          </Box>

          <LinkButton variant="glass" colorPalette="accent" href="">
            Buy now
          </LinkButton>
        </Box>

        <Box
          textStyle="md"
          p="10"
          lg={{
            borderRightWidth: '1px',
            borderStyle: 'dashed',
          }}
        >
          <Text fontSize="sm" color="fg.subtle">
            Custom
          </Text>
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Enterprise
          </Heading>

          <Text fontSize="2xl" fontWeight="medium" color="fg.subtle">
            Starting at $1000/month
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              Customized plans for organizations who want to move fast.
            </Text>

            <Text fontWeight="medium" mb="2">
              Everything in Team plan, plus:
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Unlimited developers
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Dedicated support channel
              </List.Item>
            </List.Root>
          </Box>

          <LinkButton href="">Get in touch</LinkButton>
        </Box>
      </Grid>
      <Separator
        position="absolute"
        left="0"
        width="100vw"
        borderStyle="dashed"
      />
    </Stack>
  )
}

function FAQ() {
  return (
    <Container maxW="6xl" py="20">
      <HStack gap="20" alignItems="flex-start">
        <Stack flex="1" alignItems="flex-start" pt="2">
          <Heading as="h2" fontSize="2xl" fontWeight="medium">
            Frequently asked questions
          </Heading>

          <Text fontWeight="medium" color="fg.subtle">
            Can't find what you're looking for? Join our Discord community.
          </Text>

          <ButtonGroup>
            <LinkButton
              href="/discord"
              variant="plain"
              colorPalette="accent"
              size="lg"
            >
              Join Discord <ActionArrow />
            </LinkButton>
          </ButtonGroup>
        </Stack>

        <Stack gap="4" flex="1">
          <Accordion.Root width="full" collapsible>
            <Accordion.Item value="1">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                How many products can I use Saas UI Pro for?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                The individual license can be used for unlimited self hosted
                SaaS products or internal tools and maximum one client project.
                You can buy as many licenses as you need. The unlimited license
                does not have any restrictions.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="2">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                Does Saas UI include Figma, Sketch or other design files?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                Yes, we have a free Figma community and a Pro libary,{' '}
                <Link href="/pro/figma">more information.</Link>
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="3">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                What does the lifetime access mean?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                The Saas UI Pro license is perpetual, you will have access to
                all assets of the Saas UI Pro library forever.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="4">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                Do you offer refunds?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                No, due to the nature of the product being a digital download we
                do not offer refunds. We encourage you to try to open source and
                free components and read through the Pro documentation carefully
                to see if the product is a good fit.
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="4">
              <Accordion.ItemTrigger fontSize="md" fontWeight="medium">
                Do you offer support?
              </Accordion.ItemTrigger>
              <Accordion.ItemContent fontSize="md">
                Once you sign up you get access to our Discord community, where
                you can ask questions, report bugs or feature requests and get
                help from other customers. If you require more specialised
                support or consultancy contact us at hello@saas-ui.dev
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Stack>
      </HStack>
    </Container>
  )
}

function Benefits() {
  return (
    <Box
      position="relative"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderStyle="dashed"
    >
      <Container maxW="6xl" position="static">
        <HStack>
          <Stack flex="1">
            <Stack py="20" gap="8">
              <Heading
                as="h3"
                fontSize="6xl"
                lineHeight="1"
                fontWeight="medium"
              >
                Build, launch, and scale with Saas UI Pro
              </Heading>

              <Text fontWeight="medium" color="fg.subtle">
                Saas UI Pro is a comprehensive solution for building, launching
                and scaling your SaaS. It includes everything you need to build
                a professional and scalable SaaS.
              </Text>
            </Stack>
          </Stack>
          <Stack
            borderLeftWidth="1px"
            borderStyle="dashed"
            flex="1"
            display={{
              base: 'none',
              md: 'flex',
            }}
          ></Stack>
        </HStack>
      </Container>
    </Box>
  )
}
