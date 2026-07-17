'use client'

import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { TbStarFilled } from 'react-icons/tb'

import { ActionArrow } from '#components/action-arrow'
import { Subheading } from '#components/site/typography'
import { Avatar, AvatarGroup } from '#components/ui/avatar'
import { Button } from '#components/ui/button'
import { Link } from '#components/ui/link'

const StarterKitHeroUI = ({
  description,
  latestChangelog,
}: {
  description: string
  latestChangelog: { title: string; link: string } | null
}) => {
  return (
    <Box>
      <Box pt={{ base: '24', md: '40' }} position="relative">
        <Container maxW="8xl" zIndex="1">
          <Stack gap={{ base: '8', md: '10' }}>
            <Heading
              as="h1"
              fontSize={{
                base: '4xl',
                sm: '5xl',
                md: '6xl',
                lg: '7xl',
              }}
              lineHeight="1.05"
              textWrap="balance"
              maxW="4xl"
            >
              Your AI agents are only as good as your codebase
            </Heading>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'start', md: 'end' }}
              gap={{ base: '6', md: '8' }}
            >
              <Text
                textStyle={{ base: 'md', md: 'lg' }}
                color="fg.subtle"
                maxW="xl"
              >
                {description}
              </Text>
              <Flex
                align="center"
                gap={{ base: '4', md: '8' }}
                flexShrink="0"
                direction={{ base: 'column', sm: 'row' }}
              >
                <HStack gap="3">
                  <AvatarGroup size="xs">
                    <Avatar src="https://senjaio.b-cdn.net/public/avatar/33d3d3ac-530d-4a2a-a2a9-93621e00bb1d_1698499800957.jpg?width=40&format=webp" />
                    <Avatar src="https://cdn.senja.io/public/avatar/5e93a8cc-0204-422a-a509-546cd0a634a6_actual.png?width=40&format=webp" />
                    <Avatar src="https://senjaio.b-cdn.net/public/avatar/48bd839c-bbab-4290-ae39-a3731486d63e_IMG_6039%20%281%29.jpg?width=40&height=40&format=webp" />
                    <Avatar src="https://cdn.senja.io/public/avatar/660ebe99-0c37-4fc3-8396-fd24dcf7afd1_Avatar%20512x512.jpg?width=40&format=webp" />
                  </AvatarGroup>
                  <Stack gap="0">
                    <HStack color="yellow.500" gap="0.5">
                      <TbStarFilled size={10} />
                      <TbStarFilled size={10} />
                      <TbStarFilled size={10} />
                      <TbStarFilled size={10} />
                      <TbStarFilled size={10} />
                    </HStack>
                    <Text textStyle="xs" color="fg.muted" whiteSpace="nowrap">
                      Used by 1000+ developers
                    </Text>
                  </Stack>
                </HStack>
                {latestChangelog ? (
                  <Flex align="center" gap="3">
                    <Badge variant="solid" colorPalette="accent">
                      New
                    </Badge>
                    <Link href={latestChangelog.link}>
                      <Text
                        textStyle="sm"
                        color="fg.muted"
                        _hover={{ color: 'fg' }}
                        transition="colors"
                        whiteSpace="nowrap"
                      >
                        {latestChangelog.title}
                        <ActionArrow />
                      </Text>
                    </Link>
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export const HeroUI = ({
  latestChangelog,
}: {
  latestChangelog: { title: string; link: string } | null
}) => (
  <StarterKitHeroUI
    description="Production ready TanStack Start SaaS starter kit for developers and agents. Strict types, consistent patterns, and test coverage that keep your agents on track — one-shot new features, without hand-holding."
    latestChangelog={latestChangelog}
  />
)

export const NextjsHeroUI = ({
  latestChangelog,
}: {
  latestChangelog: { title: string; link: string } | null
}) => (
  <StarterKitHeroUI
    description="Production ready Next.js SaaS starter kit for developers and agents. Strict types, consistent patterns, and test coverage that keep your agents on track — one-shot new features, without hand-holding."
    latestChangelog={latestChangelog}
  />
)

export const HeroTanStackSection = () => {
  return (
    <Box px="8">
      <Box pt="36" overflow="hidden" position="relative">
        <Container maxW="8xl" zIndex="1" height="100%">
          <Stack
            gap={{ base: '5', md: '8' }}
            alignItems="center"
            textAlign="center"
          >
            <Stack gap="5" maxW="6xl" alignItems="center">
              <Heading as="h1" fontSize="7xl" lineHeight="1" textWrap="balance">
                Top tier TanStack Start SaaS starter kit
              </Heading>
              <Subheading textWrap="pretty">
                TanStack Start starter kit for teams who want to move fast
                without cutting corners. Professional UI, production-ready code,
                and all the foundations — so you can focus on what makes your
                product unique.
              </Subheading>
            </Stack>

            <Stack direction={{ base: 'column', sm: 'row' }} gap="3">
              <Button
                size="lg"
                minW="180px"
                asChild
                variant="glass"
                colorPalette="accent"
              >
                <Link href="/pricing">Buy now</Link>
              </Button>
              <Button
                size="lg"
                minW="180px"
                asChild
                variant="outline"
                colorPalette="neutral"
              >
                <Link href="https://demo.saas-ui.dev">Live demo</Link>
              </Button>
            </Stack>

            <Stack alignItems="center" gap="2">
              <AvatarGroup>
                <Avatar src="https://senjaio.b-cdn.net/public/avatar/33d3d3ac-530d-4a2a-a2a9-93621e00bb1d_1698499800957.jpg?width=40" />
                <Avatar src="https://senjaio.b-cdn.net/public/avatar/48bd839c-bbab-4290-ae39-a3731486d63e_IMG_6039%20%281%29.jpg?width=102&height=102&format=webp" />
              </AvatarGroup>
              <HStack color="yellow.500" gap="0.5">
                <TbStarFilled size={12} />
                <TbStarFilled size={12} />
                <TbStarFilled size={12} />
                <TbStarFilled size={12} />
                <TbStarFilled size={12} />
              </HStack>

              <Text textStyle="sm" color="fg.muted">
                Used by 600+ developers
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
