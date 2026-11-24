'use client'

import { ColorModeButton } from '@/components/docs/color-mode-button'
import { Logo } from '@/components/logo'
import { SocialLinks } from '@/components/social-links'
import {
  Box,
  Button,
  Container,
  HStack,
  Separator,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react/styled-system'
import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'

import { Alert } from '#components/ui/alert'
import { Dialog } from '#components/ui/dialog'
import { IconButton } from '#components/ui/icon-button'

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

// "Resources" pointed at /resources, which has never been a route.
// Changelog and Blog are the internal destinations from that menu.
const getNavLinks = (saasUiUrl = '') => [
  {
    title: 'Docs',
    url: `${saasUiUrl}/docs/getting-started/introduction`,
  },
  { title: 'Blocks', url: `${saasUiUrl}/blocks` },
  { title: 'Starter kits', url: `${saasUiUrl}/starter-kits` },
  { title: 'Pricing', url: '/pricing', pro: true },
  { title: 'Changelog', url: '/changelog' },
  { title: 'Blog', url: `${saasUiUrl}/blog` },
  { title: 'Showcase', url: '/showcase' },
]

interface HeaderProps {
  /**
   * Show Pricing and Get Pro. Off on saas-ui.dev; only Saas.js pages that reuse
   * this header may turn it on.
   */
  pro?: boolean
  /**
   * Origin prefixed to Saas UI links. Leave empty on saas-ui.dev so links stay
   * relative (and work on any host, e.g. saas-ui.localhost); set it to
   * https://saas-ui.dev on pages served from saas-js.com.
   */
  saasUiUrl?: string
}

const DesktopNav = ({ pro, saasUiUrl }: HeaderProps) => (
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
      <Navigation pro={pro} saasUiUrl={saasUiUrl} />
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
      {pro && (
        <>
          <Separator orientation="vertical" height="4" mx="2" />
          <LinkButton
            href="/pricing"
            colorPalette="accent"
            variant="glass"
            size="sm"
          >
            Get Pro
          </LinkButton>
        </>
      )}
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

const MobileNavContent = ({ pro, saasUiUrl }: HeaderProps) => (
  <Container>
    <Stack py="4" gap="4" color="white">
      {getNavLinks(saasUiUrl)
        .filter((item) => pro || !item.pro)
        .map((item) => (
          <Button
            key={item.title}
            variant="outline"
            colorPalette="teal"
            asChild
          >
            <Link href={item.url}>{item.title}</Link>
          </Button>
        ))}
    </Stack>
  </Container>
)

const MobileNav = ({ pro, saasUiUrl }: HeaderProps) => {
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
        <MobileNavContent pro={pro} saasUiUrl={saasUiUrl} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const HeaderSection = ({ pro = false, saasUiUrl = '' }: HeaderProps) => {
  return (
    <Box
      position="fixed"
      top="0"
      w="full"
      zIndex="3"
      backdropFilter="blur(10px)"
    >
      <Stack
        data-announcement
        bg="accent.subtle"
        borderBottomWidth="1px"
        borderColor="accent.solid/20"
        color="accent.solid"
        justifyContent="center"
        alignItems="center"
        py="2"
        px="4"
        flexDir="row"
        textStyle="sm"
      >
        <Text fontWeight="medium">Saas UI 3.0 is here</Text>
        <Text display={{ base: 'none', sm: 'block' }}>
          Your components, your code — new CLI, Chakra UI 3.38 preset, and
          public registry.
        </Text>

        <LinkButton
          variant="outline"
          colorPalette="accent"
          href={`${saasUiUrl}/blog/saas-ui-3-0`}
          size="xs"
        >
          Read announcement <ActionArrow />
        </LinkButton>
      </Stack>
      <Container py="2">
        <DesktopNav pro={pro} saasUiUrl={saasUiUrl} />
        <MobileNav pro={pro} saasUiUrl={saasUiUrl} />
      </Container>
    </Box>
  )
}
