'use client'

import { useEffect, useId, useRef, useState } from 'react'

import { ColorModeButton } from '@/components/docs/color-mode-button'
import { MobileSearchButton, SearchButton } from '@/components/search-button'
import { SocialLinks } from '@/components/social-links'
import { useRoute } from '@/lib/use-route'
import { websiteConfig } from '@/website.config'
import { HoverCard } from '@ark-ui/react'
import { SaasUIIcon } from '@saas-ui/assets'
import {
  Box,
  DrawerTrigger,
  HStack,
  Portal,
  Separator,
  Spacer,
  Span,
  VStack,
  chakra,
} from '@saas-ui/react'
import { Drawer, IconButton, Menu } from '@saas-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsGithub } from 'react-icons/bs'
import { LuChevronDown, LuMenu } from 'react-icons/lu'

import { LinkButton } from '../link-button'
import { HeaderVersionMenu } from '../site/version-menu'
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
                onClick={(e) => {
                  e.preventDefault()
                }}
                href="/docs/getting-started/introduction"
                aria-current={
                  [
                    '/docs/getting-started',
                    '/docs/components',
                    '/docs/theming',
                    '/docs/styling',
                  ].some((route) => path.startsWith(route))
                    ? 'page'
                    : undefined
                }
              >
                Saas UI <LuChevronDown />
              </PrimaryNavLink>
            }
          >
            <Menu.Item value="getting-started" asChild>
              <Link href="/docs/getting-started/introduction">
                Getting started
              </Link>
            </Menu.Item>
            <Menu.Item value="components" asChild>
              <Link href="/docs/components/overview">Components</Link>
            </Menu.Item>
            <Menu.Item value="theming" asChild>
              <Link href="/docs/theming/overview">Theming</Link>
            </Menu.Item>
            <Menu.Item value="styling" asChild>
              <Link href="/docs/styling/overview">Styling</Link>
            </Menu.Item>
          </HoverMenu>

          <HoverMenu
            trigger={
              <PrimaryNavLink
                href="/docs/pro/getting-started/introduction"
                onClick={(e) => {
                  e.preventDefault()
                }}
                aria-current={path.startsWith('/docs/pro') ? 'page' : undefined}
              >
                Saas UI Pro <LuChevronDown />
              </PrimaryNavLink>
            }
          >
            <Menu.Item value="pro-components" asChild>
              <Link href="/docs/pro/getting-started/introduction">
                Getting started
              </Link>
            </Menu.Item>
            <Menu.Item value="data-grid" asChild>
              <Link href="/docs/pro/components/data-grid">Data grid</Link>
            </Menu.Item>
            <Menu.Item value="kanban" asChild>
              <Link href="/docs/pro/components/kanban">Kanban</Link>
            </Menu.Item>
          </HoverMenu>

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
            <Menu.Item value="tanstack-router" asChild>
              <Link href="/docs/starter-kits/tanstack-router">
                Tanstack Router
              </Link>
            </Menu.Item>
          </HoverMenu>
        </HStack>

        <Spacer />
        <CommandMenu
          trigger={<SearchButton width="200px" size="sm" flexShrink="1" />}
        />
        <HeaderVersionMenu />
        <HStack gap="0" justifyContent="flex-end">
          <IconButton asChild variant="ghost" size="sm" aria-label="Github">
            <Link href="https://github.com/saas-js/saas-ui" target="_blank">
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
