'use client'

import {
  Box,
  Card,
  Container,
  Heading,
  Link,
  List,
  Section,
  Stack,
  Text,
} from '@saas-ui/react'
import Image from 'next/image'
import { TbCheck } from 'react-icons/tb'

import { ActionArrow } from '../action-arrow'

export const StackSection = () => {
  return (
    <Section.Root py="20">
      <a id="starter-kits" />
      <Container maxW="6xl">
        <Stack gap="8">
          <Box textAlign="center" mb="8">
            <Heading as="h3" textStyle="4xl" mb="1">
              Choose your Stack
            </Heading>
            <Text textStyle="lg" color="fg.subtle" fontWeight="medium">
              Production-ready foundations for your next SaaS product
            </Text>
          </Box>

          <Stack
            gap="16"
            flexDirection={{
              base: 'column',
              md: 'row',
            }}
            alignItems="flex-start"
            borderStyle="dashed"
          >
            <Card.Root
              variant="outline"
              bg={{
                _light: 'white/40',
                _dark: 'white/5',
              }}
            >
              <Stack p="16" alignItems="flex-start" gap="4">
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
                    Blazing fast routing
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
                </List.Root>
              </Stack>
            </Card.Root>
            <Card.Root
              variant="outline"
              bg={{
                _light: 'white/40',
                _dark: 'white/5',
              }}
            >
              <Stack p="16" alignItems="flex-start" gap="4">
                <Image
                  src="/img/logos/nextjs.svg"
                  alt="Next.js"
                  width={40}
                  height={40}
                />
                <Box>
                  <Heading as="h4" textStyle="2xl" mb="1">
                    Next.js
                  </Heading>
                  <Text color="fg.subtle" fontWeight="medium">
                    Fullstack RSC, SEO-optimized, perfect for products that need
                    fast public facing pages.
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
                    React Server Components
                  </List.Item>
                  <List.Item>
                    <List.Indicator color="fg" asChild>
                      <TbCheck />
                    </List.Indicator>
                    Built-in SEO optimization
                  </List.Item>
                  <List.Item>
                    <List.Indicator color="fg" asChild>
                      <TbCheck />
                    </List.Indicator>
                    Ideal for public-facing SaaS
                  </List.Item>
                </List.Root>
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
        <Stack p="16" alignItems="flex-start" gap="4">
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
