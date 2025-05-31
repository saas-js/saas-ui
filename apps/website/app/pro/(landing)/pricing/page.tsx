import { LinkButton } from '@/components/link-button'
import { CustomersSection } from '@/components/site/customers.section'
import {
  Box,
  Container,
  Grid,
  Heading,
  List,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Accordion } from '@saas-ui/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TbCheck } from 'react-icons/tb'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pricing for the Pro plan',
}

export default function Page() {
  return (
    <Container maxW="6xl" position="static">
      <Stack gap="12">
        <Hero />

        <Pricing />

        <CustomersSection />

        <FAQ />
      </Stack>
    </Container>
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
            Individual
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
            Team
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
            Starting at $4750
          </Text>

          <Box my="8" pt="8">
            <Text color="fg.subtle" mb="4" fontSize="lg">
              Customized plans for teams who want to move fast.
            </Text>

            <List.Root gap="2" variant="plain">
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Expert guidance and support
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Dedicated support channel
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="fg.muted">
                  <TbCheck />
                </List.Indicator>
                Custom features and integrations
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
    <Stack maxW="2xl" mx="auto" w="full">
      <Heading as="h2" fontSize="2xl" fontWeight="medium">
        FAQ
      </Heading>

      <Stack gap="4" width="full">
        <Accordion.Root width="full">
          <Accordion.Item value="1">
            <Accordion.ItemTrigger>
              How many products can I use Saas UI Pro for?
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              The individual license can be used for unlimited self hosted SaaS
              products or internal tools and maximum one client project. You can
              buy as many licenses as you need. The unlimited license does not
              have any restrictions.
            </Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item value="2">
            <Accordion.ItemTrigger>
              Does Saas UI include Figma, Sketch or other design files?
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              Yes, we have a free Figma community and a Pro libary,{' '}
              <Link href="/pro/figma">more information.</Link>
            </Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item value="3">
            <Accordion.ItemTrigger>
              What does the lifetime access mean?
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              The Saas UI Pro license is perpetual, you will have access to all
              assets of the Saas UI Pro library forever.
            </Accordion.ItemContent>
          </Accordion.Item>
          <Accordion.Item value="4">
            <Accordion.ItemTrigger>Do you offer support?</Accordion.ItemTrigger>
            <Accordion.ItemContent>
              Once you sign up you get access to our Discord community, where
              you can ask questions, report bugs or feature requests and get
              help from other customers. If you require more specialised support
              or consultancy contact us at hello@saas-ui.dev
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </Stack>
    </Stack>
  )
}
