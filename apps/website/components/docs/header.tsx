'use client'

import { useEffect, useRef, useState } from 'react'

import { ColorModeButton } from '@/components/docs/color-mode-button'
import { Logo } from '@/components/logo'
import { MobileSearchButton, SearchButton } from '@/components/search-button'
import { SocialLinks } from '@/components/social-links'
import { useRoute } from '@/lib/use-route'
import { websiteConfig } from '@/website.config'
import {
  Box,
  Button,
  Container,
  DrawerTrigger,
  HStack,
  Portal,
  Separator,
  Spacer,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { Drawer, IconButton } from '@saas-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsGithub } from 'react-icons/bs'
import { LuMenu } from 'react-icons/lu'

import { LinkButton } from '../link-button'
import { Navigation } from '../site/navigation'
import { HeaderVersionMenu } from '../site/version-menu'
import { CommandMenu } from './command-menu'

const HeaderRoot = chakra('header', {
  base: {
    bg: 'bg',
    position: 'sticky',
    top: '0',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minHeight: '64px',
    borderBottom: '1px solid',
    borderColor: 'border.subtle',
    zIndex: '10',
  },
})

const PrimaryNavLink = chakra(Link, {
  base: {
    fontSize: 'sm',
    color: 'fg.subtle',
    _currentPage: {
      color: 'fg',
      fontWeight: 'medium',
    },
    _hover: {
      color: 'fg',
    },
  },
})

const SecondaryNavLink = chakra(Link, {
  base: {
    fontSize: 'sm',
    color: 'fg.subtle',
    py: '2',
    _currentPage: {
      color: 'fg',
      fontWeight: 'medium',
      layerStyle: 'indicator.bottom',
      borderTopRadius: '3px',
      '--indicator-offset-y': '-1px',
      '--indicator-color': 'colors.colorPalette.solid',
    },
    _hover: {
      color: 'fg',
    },
  },
})

const TopNavMobileLink = chakra(Link, {
  base: {
    display: 'block',
    py: '2',
    px: '4',
    color: 'fg.subtle',
    w: 'full',
    _currentPage: {
      color: 'fg',
      fontWeight: 'medium',
    },
    _hover: {
      color: 'fg',
    },
  },
})

const HeaderLogoLink = () => {
  return (
    <Link href="/" aria-label="Saas UI, Back to homepage">
      <Logo />
    </Link>
  )
}

const HeaderPrimaryNavbar = () => {
  const route = useRoute()
  const items = route.getPrimaryNavItems()
  return (
    <HStack gap="8" minH="48px" aria-label="primary navigation">
      <HeaderLogoLink />
      {items.map((item) => (
        <PrimaryNavLink
          key={item.title}
          href={item.url || '#'}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.title}
        </PrimaryNavLink>
      ))}
    </HStack>
  )
}

const HeaderSecondaryNavbar = () => {
  const route = useRoute()
  const items = route.getSecondaryNavItems()
  return (
    <HStack as="nav" gap="6" aria-label="secondary navigation">
      {items.map((item) => (
        <SecondaryNavLink
          key={item.title}
          href={item.url || '#'}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.title}
        </SecondaryNavLink>
      ))}
    </HStack>
  )
}

const HeaderSocialLinks = () => (
  <SocialLinks items={[{ type: 'github', href: websiteConfig.repoUrl }]} />
)

const HeaderMobileMenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  const route = useRoute()
  const primaryNavItems = route.getPrimaryNavItems()
  const secondaryNavItems = route.getSecondaryNavItems()

  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const pathnameRef = useRef(pathname)

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      setIsOpen(false)
    }
    pathnameRef.current = pathname
  }, [pathname, setIsOpen])

  return (
    <Drawer.Root
      open={isOpen}
      placement="bottom"
      onPointerDownOutside={closeMenu}
      onEscapeKeyDown={closeMenu}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <DrawerTrigger asChild>
        <IconButton variant="ghost" size="sm">
          <LuMenu />
        </IconButton>
      </DrawerTrigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Content borderTopRadius="md" maxH="var(--content-height)">
          <Drawer.CloseButton />
          <Drawer.Body display="flex" flexDir="column" gap="10" py="5" flex="1">
            <VStack align="start" justify="stretch">
              {primaryNavItems.map((item) => (
                <TopNavMobileLink
                  key={item.title}
                  href={item.url || '#'}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.title}
                </TopNavMobileLink>
              ))}
            </VStack>
            <VStack align="start" justify="stretch">
              {secondaryNavItems.map((item) => (
                <TopNavMobileLink
                  key={item.title}
                  href={item.url || '#'}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.title}
                </TopNavMobileLink>
              ))}
            </VStack>
          </Drawer.Body>
          <Drawer.Footer
            py="2"
            justifyContent="space-between"
            borderTop="1px solid"
            borderColor="border"
            ref={containerRef}
          >
            <HeaderVersionMenu containerRef={containerRef} />
            <HeaderSocialLinks />
          </Drawer.Footer>
        </Drawer.Content>
      </Portal>
    </Drawer.Root>
  )
}

const HeaderDesktopActions = () => {
  return (
    <HStack gap="2" minH="48px" flexShrink="1" minW="0">
      <HeaderVersionMenu />
      <CommandMenu
        trigger={<SearchButton width="200px" size="sm" flexShrink="1" />}
      />

      <HStack gap="0" justifyContent="flex-end">
        <IconButton asChild variant="ghost" size="sm" aria-label="Github">
          <Link href="https://github.com/saas-js/saas-ui" target="_blank">
            <BsGithub />
          </Link>
        </IconButton>
        <ColorModeButton />
        <Separator orientation="vertical" height="4" mx="2" />
        <LinkButton href="/pro" colorPalette="accent" variant="glass" size="sm">
          Get Pro
        </LinkButton>
      </HStack>
    </HStack>
  )
}

const HeaderMobileActions = () => {
  return (
    <HStack>
      <CommandMenu trigger={<MobileSearchButton />} disableHotkey />
      <ColorModeButton />
      <HeaderMobileMenuDropdown />
    </HStack>
  )
}

const HeaderDesktopNavbar = () => {
  return (
    <Box hideBelow="md">
      <HStack py="2">
        <HeaderLogoLink />
        <Navigation />
        <Spacer />
        <HeaderDesktopActions />
      </HStack>
      <HeaderSecondaryNavbar />
    </Box>
  )
}

const HeaderMobileNavbar = () => {
  return (
    <HStack hideFrom="md" h="full">
      <HeaderLogoLink />
      <Spacer />
      <HeaderMobileActions />
    </HStack>
  )
}

export const Header = () => {
  return (
    <HeaderRoot>
      <Container>
        <HeaderDesktopNavbar />
        <HeaderMobileNavbar />
      </Container>
    </HeaderRoot>
  )
}
