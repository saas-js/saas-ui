'use client';
import { ColorModeButton } from '@/components/docs/color-mode-button'
import {
  Alert,
  Portal,
  Span,
  Box,
  Button,
  Container,
  HStack,
  Separator,
  Spacer,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { Drawer } from '#components/ui/drawer'
import { IconButton } from '#components/ui/icon-button'
import { chakra } from '@chakra-ui/react/styled-system'
import Link from 'next/link'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'

import { CopyButton } from '#components/copy-button'

import { CommandMenu } from '../docs/command-menu'
import { LinkButton } from '../link-button'
import { MobileSearchButton, SearchButton } from '../search-button'
import { Logo } from './logo'
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
    <Link href="/" aria-label="Saas.js, Back to homepage">
      <Logo color="fg" />
    </Link>
  </HStack>
)

const NAV_LINKS = [
  { title: 'Packages', url: '/packages' },
  { title: 'Docs', url: '/docs' },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Resources', url: '/resources' },
  { title: 'Showcase', url: '/showcase' },
]

const DesktopNav = () => (
  <HStack
    gap="6"
    as="nav"
    aria-label="primary navigation"
    display={{ base: 'none', md: 'flex' }}
  >
    <HStack>
      <LogoLink />
    </HStack>
    <HStack className="main-nav" gap="0" minH="48px" flex="1">
      <Navigation />
    </HStack>
    <HStack gap="2" justifyContent="flex-end" minW="0" flexShrink="1">
      <CommandMenu
        trigger={
          <SearchButton
            width="160px"
            size="sm"
            aria-label="Search"
            flexShrink="1"
          />
        }
      />
      <IconButton asChild variant="ghost" aria-label="GitHub" size="sm">
        <Link href="https://github.com/saas-js" target="_blank">
          <BsGithub />
        </Link>
      </IconButton>
      <ColorModeButton />
      <Separator orientation="vertical" height="4" mx="2" />
      <LinkButton href="/docs" variant="ghost" size="sm" flexShrink="0">
        Docs
      </LinkButton>
      <LinkButton
        href="/pricing"
        colorPalette="accent"
        variant="glass"
        size="sm"
        flexShrink={0}
      >
        Buy now
      </LinkButton>
    </HStack>
  </HStack>
)

const MobileNav = () => {
  return (
    <Drawer.Root placement="bottom">
      <HStack display={{ base: 'flex', md: 'none' }} minH="64px" gap="1">
        <LogoLink />
        <Spacer />
        <CommandMenu
          trigger={<MobileSearchButton aria-label="Search" />}
          disableHotkey
        />
        <Drawer.Trigger asChild>
          <IconButton
            aria-label="Open menu"
            fontSize="md"
            color="fg"
            variant="ghost"
          >
            <AiOutlineMenu />
          </IconButton>
        </Drawer.Trigger>
      </HStack>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Content borderTopRadius="md">
          <Drawer.CloseTrigger />
          <Drawer.Body py="5">
            <VStack align="stretch" gap="1">
              {NAV_LINKS.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  justifyContent="flex-start"
                  size="lg"
                  asChild
                >
                  <Link href={item.url}>{item.title}</Link>
                </Button>
              ))}
            </VStack>
          </Drawer.Body>
          <Drawer.Footer
            py="3"
            justifyContent="center"
            borderTopWidth="1px"
            borderColor="border"
          >
            <LinkButton
              href="/pricing"
              colorPalette="accent"
              variant="glass"
              size="sm"
              width="100%"
            >
              Buy now
            </LinkButton>
          </Drawer.Footer>
        </Drawer.Content>
      </Portal>
    </Drawer.Root>
  )
}

export const HeaderSection = () => {
  return (
    <>
      <Box
        position="fixed"
        top="0"
        w="full"
        h="48px"
        zIndex="3"
        backdropFilter="blur(10px)"
        bg="bg.muted/90"
      >
        <Container>
          <DesktopNav />
          <MobileNav />
        </Container>
      </Box>
    </>
  )
}

function Announcement() {
  return (
    <Alert.Root
      data-announcement
      colorPalette="cyan"
      borderRadius="0"
      borderBottomWidth="1px"
      borderBottomColor="cyan.solid/20"
      py="1.5"
    >
      <Alert.Description
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        gap="1"
        mx="auto"
        textAlign="center"
        fontSize={{ base: 'xs', sm: 'sm' }}
      >
        Get <Span fontWeight="medium">30% off</Span> with code{' '}
        <strong>V3BETA</strong>
        <CopyButton
          value="V3BETA"
          variant="solid"
          size="xs"
          colorPalette="cyan"
          ms="2"
        >
          Copy
        </CopyButton>
      </Alert.Description>
    </Alert.Root>
  )
}
