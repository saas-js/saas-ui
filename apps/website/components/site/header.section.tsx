'use client'

import { ColorModeButton } from '@/components/docs/color-mode-button'
import { Logo } from '@/components/logo'
import { SocialLinks } from '@/components/social-links'
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  HStack,
  IconButton,
  Separator,
  Spacer,
  Stack,
  Text,
  chakra,
} from '@saas-ui/react'
import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'

import { ActionArrow } from '../action-arrow'
import { CommandMenu } from '../docs/command-menu'
import { LinkButton } from '../link-button'
import { SearchButton } from '../search-button'
import { Navigation } from './navigation'

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
    <Link href="/" aria-label="Saas UI, Back to homepage">
      <Logo color="fg" />
    </Link>
  </HStack>
)

const NAV_LINKS = [
  { title: 'Docs', url: '/docs' },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Resources', url: '/resources' },
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
      <Navigation />
    </HStack>
    <HStack gap="0" justifyContent="flex-end">
      <CommandMenu
        trigger={<SearchButton width="160px" size="sm" flexShrink="1" />}
      />
      <Button asChild variant="ghost" size="sm">
        <Link href="https://github.com/saas-js/saas-ui" target="_blank">
          <BsGithub /> 1.6k
        </Link>
      </Button>
      <ColorModeButton />
      <Separator orientation="vertical" height="4" mx="2" />
      <LinkButton
        href="/pricing"
        colorPalette="accent"
        variant="glass"
        size="sm"
      >
        Get Pro
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
      <Dialog.Content m="0" shadow="none" borderRadius="0" bg="bg">
        <HeaderRoot>
          <LogoLink />
          <Spacer />
          <MobileNavCloseTrigger />
        </HeaderRoot>
        <MobileNavContent />
      </Dialog.Content>
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
    >
      <Stack
        bg="accent.subtle"
        borderBottomWidth="1px"
        borderColor="accent.solid/20"
        color="accent.solid"
        justifyContent="center"
        alignItems="center"
        py="2"
        flexDir="row"
        textStyle="sm"
      >
        <Text fontWeight="medium">Looking for our SaaS starter kits?</Text>
        <Text>
          They're now available at{' '}
          <Link href="https://saas-js.com">saas-js.com</Link>
        </Text>

        <LinkButton
          variant="outline"
          colorPalette="accent"
          href="https://saas-js.com"
          size="xs"
        >
          Learn more <ActionArrow />
        </LinkButton>
      </Stack>
      <Container py="2">
        <DesktopNav />
        <MobileNav />
      </Container>
    </Box>
  )
}
