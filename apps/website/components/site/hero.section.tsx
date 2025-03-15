'use client'

import { Annoucement } from '@/components/annoucement'
import { Subheading } from '@/components/site/typography'
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Tabs,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'

const CRMDemo = dynamic(
  () => import('@/components/site/demo/crm-demo').then((mod) => mod.CRMDemo),
  {
    ssr: false,
  },
)

const ComponentDemos = () => {
  return (
    <Container maxW="8xl">
      <Tabs.Root defaultValue="crm">
        <Tabs.List mb="4">
          <Tabs.Trigger value="crm">CRM</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        </Tabs.List>

        <Tabs.ContentGroup
          borderRadius="md"
          borderWidth="1px"
          height="85vh"
          overflow="clip"
          position="relative"
        >
          <Tabs.Content value="crm" height="100%" p="0">
            <CRMDemo />
          </Tabs.Content>
        </Tabs.ContentGroup>
      </Tabs.Root>
    </Container>
  )
}

export const HeroSection = () => (
  <Box px="8">
    <Box pt="32" overflow="hidden" position="relative">
      <Container maxW="8xl" zIndex="1" height="100%">
        <Stack
          gap={{ base: '5', md: '8' }}
          mb="20"
          alignItems="center"
          textAlign="center"
        >
          <Annoucement justifySelf="center" asChild>
            <Link href="#">
              Saas UI 3.0 is here!
              <HiArrowRight />
            </Link>
          </Annoucement>
          <Stack gap="5" pr="4" maxW="3xl" alignItems="center">
            <Heading as="h1" fontSize="7xl" lineHeight="1">
              Build products customers love.
            </Heading>
            <Subheading>
              Saas UI is a purpose-built toolkit for building high-quality SaaS
              apps. Start with our free component library and build fullstack
              apps with production-ready templates and starter kits.
            </Subheading>
          </Stack>

          <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
            <Button
              size="lg"
              minW="180px"
              asChild
              colorPalette="gray"
              borderWidth="1px"
              variant="solid"
            >
              <Link href="/docs/get-started/installation">
                Explore components
              </Link>
            </Button>
            <Button variant="glass" colorPalette="accent" size="lg">
              <Link href="/docs/get-started/installation">Buy Pro</Link>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>

    <ComponentDemos />
  </Box>
)
