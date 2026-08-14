'use client';
import { Box, Card, Container, Heading, List, Stack, Text } from '@chakra-ui/react'
import { Link } from '#components/ui/link'
import { Section } from '#components/ui/section'
import Image from 'next/image'
import { TbCheck } from 'react-icons/tb'

import { ActionArrow } from '../action-arrow'

export const StackSection = () => {
  return (
    <Section.Root py="20">
      <a id="starter-kits" />
      <Container maxW="6xl">
        <Stack gap="8">
          <Stack gap="4" mb="8">
            <Heading as="h3" textStyle="4xl">
              Built on TanStack Start
            </Heading>
            <Text
              textStyle="lg"
              color="fg.subtle"
              fontWeight="medium"
              maxW="xl"
            >
              The fastest full-stack React framework for building
              dashboard-heavy SaaS products. Type-safe routing, built-in
              caching, and SSR when you need it.
            </Text>
          </Stack>

          <Stack
            gap="8"
            flexDirection={{
              base: 'column',
              md: 'row',
            }}
            alignItems="stretch"
          >
            <Card.Root
              variant="outline"
              bg={{
                _light: 'white/40',
                _dark: 'white/5',
              }}
              flex="2"
            >
              <Stack
                p={{ base: '6', md: '16' }}
                alignItems="flex-start"
                gap="4"
              >
                <Image
                  src="/img/logos/tanstack.png"
                  alt="TanStack Start"
                  width={40}
                  height={40}
                />
                <Box>
                  <Heading as="h4" textStyle="2xl" mb="1">
                    TanStack Start
                  </Heading>
                  <Text color="fg.subtle" fontWeight="medium">
                    Lightning-fast SPA, dashboard-focused, ideal for
                    application-heavy products and internal tools.
                  </Text>
                </Box>
                <List.Root
                  variant="plain"
                  textStyle="md"
                  color="fg.muted"
                  lineHeight="tall"
                >
                  <List.Item>
                    <List.Indicator color="fg" asChild>
                      <TbCheck />
                    </List.Indicator>
                    Type-safe routing
                  </List.Item>
                  <List.Item>
                    <List.Indicator color="fg" asChild>
                      <TbCheck />
                    </List.Indicator>
                    Optimized for complex UIs
                  </List.Item>
                  <List.Item>
                    <List.Indicator color="fg" asChild>
                      <TbCheck />
                    </List.Indicator>
                    Perfect for B2B dashboards
                  </List.Item>
                  <List.Item>
                    <List.Indicator color="fg" asChild>
                      <TbCheck />
                    </List.Indicator>
                    Opt-in SSR support
                  </List.Item>
                </List.Root>
              </Stack>
            </Card.Root>
            <Card.Root
              variant="outline"
              bg={{
                _light: 'white/40',
                _dark: 'white/5',
              }}
              flex="1"
            >
              <Stack
                p={{ base: '6', md: '10' }}
                alignItems="flex-start"
                gap="4"
              >
                <Image
                  src="/img/logos/nextjs.svg"
                  alt="Next.js"
                  width={32}
                  height={32}
                />
                <Box>
                  <Heading as="h4" textStyle="xl" mb="1">
                    Also available for Next.js
                  </Heading>
                  <Text color="fg.muted" textStyle="sm">
                    Prefer Next.js? Same architecture, same features. With React
                    Server Components and built-in SEO optimization.
                  </Text>
                </Box>
              </Stack>
            </Card.Root>
          </Stack>
        </Stack>
      </Container>
    </Section.Root>
  )
}

export function TansStackStartSection() {
  return (
    <Box>
      <Container maxW="6xl">
        <Stack p={{ base: '6', md: '16' }} alignItems="flex-start" gap="4">
          <Image
            src="/img/logos/tanstack.png"
            alt="TanStack"
            width={40}
            height={40}
          />
          <Box>
            <Heading as="h4" textStyle="2xl" mb="1">
              TanStack Start
            </Heading>
            <Text color="fg.subtle" fontWeight="medium">
              Lightning-fast SPA, dashboard-focused, ideal for application-heavy
              products and internal tools.
            </Text>
          </Box>
          <List.Root
            variant="plain"
            textStyle="md"
            color="fg.muted"
            lineHeight="taller"
          >
            <List.Item>
              <List.Indicator color="fg" asChild>
                <TbCheck />
              </List.Indicator>
              Blazing fast type-safe routing
            </List.Item>
            <List.Item>
              <List.Indicator color="fg" asChild>
                <TbCheck />
              </List.Indicator>
              Optimized for complex UIs
            </List.Item>
            <List.Item>
              <List.Indicator color="fg" asChild>
                <TbCheck />
              </List.Indicator>
              Opt-in SSR support
            </List.Item>
            <List.Item>
              <List.Indicator color="fg" asChild>
                <TbCheck />
              </List.Indicator>
              Perfect for B2B dashboards
            </List.Item>
          </List.Root>
        </Stack>
      </Container>
    </Box>
  )
}
