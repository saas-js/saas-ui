'use client'

import { Subheading } from '@/components/site/typography'
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
} from '@saas-ui/react'
import { TbStarFilled } from 'react-icons/tb'

import { ActionArrow } from '#components/action-arrow'
import { Annoucement } from '#components/annoucement'
import { Link } from '#components/ui/link'

export const HeroSection = ({
  latestChangelog,
}: {
  latestChangelog: { title: string; link: string }
}) => {
  return (
    <Box px="8">
      <Box pt="36" overflow="hidden" position="relative">
        <Container maxW="8xl" zIndex="1" height="100%">
          <Stack
            gap={{ base: '5', md: '8' }}
            alignItems="center"
            textAlign="center"
          >
            <Annoucement justifySelf="center">
              <Badge variant="solid" colorPalette="accent">
                New
              </Badge>
              <Link href={latestChangelog.link}>
                {latestChangelog.title}
                <ActionArrow />
              </Link>
            </Annoucement>
            <Stack gap="5" maxW="6xl" alignItems="center">
              <Heading as="h1" fontSize="7xl" lineHeight="1" textWrap="balance">
                Everything you need to build products customers love
              </Heading>
              <Subheading textWrap="pretty">
                SaaS starter kits for teams who want to move fast without
                cutting corners. Professional UI, production-ready code, and all
                the foundations — so you can focus on what makes your product
                unique.
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
                <Link href="#starter-kits">View starter kits</Link>
              </Button>
              <Button
                size="lg"
                minW="180px"
                asChild
                variant="outline"
                colorPalette="neutral"
              >
                <Link href="/docs">Documentation</Link>
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

export const NextjsSection = () => {
  return (
    <Box px="8">
      <Box pt="36" overflow="hidden" position="relative">
        <Container maxW="8xl" zIndex="1" height="100%">
          <Stack
            gap={{ base: '5', md: '8' }}
            alignItems="center"
            textAlign="center"
          >
            {/* <Annoucement justifySelf="center" asChild>
              <Link href="/changelog/3.0">
                Saas UI 3.0 is here!
                <ActionArrow />
              </Link>
            </Annoucement> */}
            <Stack gap="5" maxW="6xl" alignItems="center">
              <Heading as="h1" fontSize="7xl" lineHeight="1" textWrap="balance">
                Top tier Next.js SaaS starter kit
              </Heading>
              <Subheading textWrap="pretty">
                Next.js starter kit for teams who want to move fast without
                cutting corners. Professional UI, production-ready code, and all
                the foundations — so you can focus on what makes your product
                unique.
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
            {/* <Annoucement justifySelf="center" asChild>
              <Link href="/changelog/3.0">
                Saas UI 3.0 is here!
                <ActionArrow />
              </Link>
            </Annoucement> */}
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
