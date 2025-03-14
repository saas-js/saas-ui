'use client'

import { ColorModeButton } from '@/components/docs/color-mode-button'
import { Logo } from '@/components/logo'
import { SocialLinks } from '@/components/social-links'
import {
  Box,
  Button,
  Container,
  Dialog,
  HStack,
  IconButton,
  Separator,
  Spacer,
  Stack,
  chakra,
} from '@chakra-ui/react'
import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { LinkButton } from '../link-button'

const HeaderRoot = chakra(Container, {
  base: {
    minH: '64px',
    display: 'flex',
    flexDir: 'row',
    alignItems: 'center',
    gap: { base: '1', md: '4' },
  },
})

const LogoLink = () => (
  <HStack asChild focusRing="outside">
    <Link href="/" aria-label="Chakra UI, Back to homepage">
      <Logo color="fg" />
    </Link>
  </HStack>
)

const NAV_LINKS = [
  { title: 'Docs', url: '/docs' },
  { title: 'Resources', url: '/resources' },
  { title: 'Pricing', url: '/blog' },
  { title: 'Showcase', url: '/showcase' },
]

const DesktopNav = () => (
  <HStack gap="6" as="nav" aria-label="primary navigation">
    <HStack>
      <LogoLink />
    </HStack>
    <HStack
      className="main-nav"
      gap="0"
      minH="48px"
      display={{ base: 'none', md: 'flex' }}
      flex="1"
    >
      {NAV_LINKS.map((item) => (
        <HStack
          className="nav-item"
          key={item.title}
          minH="8"
          px="3"
          rounded="md"
          focusRing="outside"
          asChild
          fontWeight="medium"
          color="fg.subtle"
          textStyle="sm"
          transitionProperty="color"
          transitionDuration="fast"
          _hover={{
            color: 'fg',
          }}
          css={{
            'main-nav:has(a:hover) &, .nav-item:is(:hover) ~ &': {
              color: 'fg.muted',
            },
          }}
        >
          <Link href={item.url}>{item.title}</Link>
        </HStack>
      ))}
    </HStack>
    <HStack gap="1" justifyContent="flex-end">
      <SocialLinks
        items={[{ type: 'github', href: 'https://github.com/saas-js/saas-ui' }]}
      />
      <ColorModeButton />
      <Separator orientation="vertical" height="4" />
      <LinkButton href="/login" variant="ghost" colorPalette="gray" size="sm">
        Log in
      </LinkButton>
      <LinkButton
        href="/pricing"
        colorPalette="accent"
        variant="glass"
        size="sm"
      >
        Buy Pro
      </LinkButton>
    </HStack>
  </HStack>
)

const MobileNavTrigger = () => (
  <Dialog.Trigger asChild>
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      aria-label="Open menu"
      fontSize="md"
      color="fg"
      variant="ghost"
    >
      <AiOutlineMenu />
    </IconButton>
  </Dialog.Trigger>
)

const MobileNavCloseTrigger = () => (
  <Dialog.CloseTrigger asChild pos="inherit" inset="0">
    <IconButton
      aria-label="Close menu"
      fontSize="md"
      color="fg"
      variant="ghost"
    >
      <AiOutlineClose />
    </IconButton>
  </Dialog.CloseTrigger>
)

const MobileNavContent = () => (
  <Container>
    <Stack py="4" gap="4" color="white">
      {NAV_LINKS.map((item) => (
        <Button key={item.title} variant="outline" colorPalette="teal" asChild>
          <Link href={item.url}>{item.title}</Link>
        </Button>
      ))}
    </Stack>
  </Container>
)

const MobileNav = () => {
  return (
    <Dialog.Root>
      <MobileNavTrigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content m="0" shadow="none" borderRadius="0" bg="bg">
          <HeaderRoot>
            <LogoLink />
            <Spacer />
            <MobileNavCloseTrigger />
          </HeaderRoot>
          <MobileNavContent />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const HeaderSection = () => {
  return (
    <Box
      position="fixed"
      top="0"
      w="full"
      zIndex="3"
      backdropFilter="blur(10px)"
      py="2"
    >
      <Container>
        <DesktopNav />
        <MobileNav />
      </Container>
    </Box>
  )
}
