'use client'

import { useEffect, useId, useRef, useState } from 'react'

import { ColorModeButton } from '@/components/docs/color-mode-button'
import { LinkButton } from '@/components/link-button'
import { MobileSearchButton, SearchButton } from '@/components/search-button'
import { HeaderVersionMenu } from '@/components/site/version-menu'
import { SocialLinks } from '@/components/social-links'
import { useRoute } from '@/lib/use-route'
import { websiteConfig } from '@/website.config'
import { HoverCard } from '@ark-ui/react'
import { SaasUIIcon } from '@saas-ui/assets'
import {
  Box,
  Drawer,
  HStack,
  IconButton,
  Menu,
  Portal,
  Separator,
  Spacer,
  Span,
  VStack,
  chakra,
} from '@saas-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsGithub } from 'react-icons/bs'
import { LuChevronDown, LuMenu } from 'react-icons/lu'

import { CommandMenu } from './command-menu'

const HeaderRoot = chakra('header', {
  base: {
    bg: 'bg',
    position: 'sticky',
    top: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '54px',
    borderBottom: '1px solid',
    borderColor: 'border.subtle',
    zIndex: '10',
  },
})

const PrimaryNavLink = chakra(Link, {
  base: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '2',
    fontSize: 'sm',
    color: 'fg.subtle',
    fontWeight: 'medium',
    _currentPage: {
      color: 'fg',
      fontWeight: 'medium',
    },
    _hover: {
      color: 'fg',
    },
    _open: {
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
      <Drawer.Trigger asChild>
        <IconButton variant="ghost" size="sm">
          <LuMenu />
        </IconButton>
      </Drawer.Trigger>
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
  const path = usePathname()

  return (
    <Box hideBelow="md">
      <HStack py="2" minH="48px">
        <HStack width="300px">
          <HStack asChild>
            <Link href="/docs">
              <>
                <SaasUIIcon color="black" width="24px" height="24px" />

                <Span fontSize="lg" color="fg.subtle">
                  Documentation
                </Span>
              </>
            </Link>
          </HStack>
        </HStack>

        <HStack gap="4">
          <HoverMenu
            trigger={
              <PrimaryNavLink
                href="/docs/starter-kits"
                onClick={(e) => {
                  e.preventDefault()
                }}
                aria-current={
                  path.startsWith('/docs/starter-kits') ? 'page' : undefined
                }
              >
                Starter kits <LuChevronDown />
              </PrimaryNavLink>
            }
          >
            <Menu.Item value="nextjs" asChild>
              <Link href="/docs/starter-kits/nextjs">Next.js</Link>
            </Menu.Item>
            <Menu.Item value="tanstack-start" asChild>
              <Link href="/docs/starter-kits/tanstack-start">
                Tanstack Start
              </Link>
            </Menu.Item>
          </HoverMenu>

          <HoverMenu
            trigger={
              <PrimaryNavLink
                href="/docs/utilities"
                onClick={(e) => {
                  e.preventDefault()
                }}
                aria-current={
                  path.startsWith('/docs/utilities') ? 'page' : undefined
                }
              >
                Utilities <LuChevronDown />
              </PrimaryNavLink>
            }
          >
            <Menu.Item value="drizzle-crud" asChild>
              <Link href="/docs/drizzle-crud">Drizzle CRUD</Link>
            </Menu.Item>
            <Menu.Item value="slingshot" asChild>
              <Link href="/docs/slingshot">Slingshot</Link>
            </Menu.Item>
            <Menu.Item value="iconx" asChild>
              <Link href="/docs/iconx">Iconx</Link>
            </Menu.Item>
          </HoverMenu>
        </HStack>

        <Spacer />
        <CommandMenu
          trigger={<SearchButton width="200px" size="sm" flexShrink="1" />}
        />
        <HStack gap="0" justifyContent="flex-end">
          <IconButton asChild variant="ghost" size="sm" aria-label="Github">
            <Link href="https://github.com/saas-js" target="_blank">
              <BsGithub />
            </Link>
          </IconButton>
          <ColorModeButton />
          <Separator orientation="vertical" height="4" mx="2" />
          <LinkButton
            href="/pro/pricing"
            colorPalette="accent"
            variant="glass"
            size="sm"
          >
            Get Pro
          </LinkButton>
        </HStack>
      </HStack>
    </Box>
  )
}

const HeaderMobileNavbar = () => {
  return (
    <HStack hideFrom="md" h="full">
      {/* <ProLogoLink /> */}
      <Spacer />
      <HeaderMobileActions />
    </HStack>
  )
}

export const Header = () => {
  return (
    <HeaderRoot>
      <Box width="full" px="5">
        <HeaderDesktopNavbar />
        <HeaderMobileNavbar />
      </Box>
    </HeaderRoot>
  )
}

function HoverMenu({
  trigger,
  children,
}: {
  trigger: React.ReactNode
  children: React.ReactNode
}) {
  const triggerId = useId()
  const contentId = useId()

  return (
    <HoverCard.Root
      ids={{ trigger: triggerId, content: contentId }}
      openDelay={100}
      closeDelay={100}
    >
      <HoverCard.Context>
        {({ open }) => (
          <Menu.Root
            ids={{
              trigger: triggerId,
              content: contentId,
            }}
            composite
            open={open}
            closeOnSelect={false}
          >
            <HoverCard.Trigger asChild>
              <Menu.Trigger asChild>
                <div>{trigger}</div>
              </Menu.Trigger>
            </HoverCard.Trigger>

            <HoverCard.Positioner>
              <HoverCard.Content asChild id={contentId}>
                <Menu.Content id={contentId}>{children}</Menu.Content>
              </HoverCard.Content>
            </HoverCard.Positioner>
          </Menu.Root>
        )}
      </HoverCard.Context>
    </HoverCard.Root>
  )
}
