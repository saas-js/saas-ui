'use client'

import { useEffect, useRef, useState } from 'react'

import { SideNav } from '@/components/sidenav'
import { useRoute } from '@/lib/use-route'
import {
  Box,
  BoxProps,
  Collapsible,
  Group,
  Portal,
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react'
import { Breadcrumb, Drawer, Sidebar } from '@saas-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineMenu, AiOutlineRight } from 'react-icons/ai'

import type { NavItem } from './docs.config'

export const SidebarStart = (props: BoxProps) => {
  const route = useRoute()

  const primaryNav = route.getPrimaryNav()

  return (
    <Sidebar.Provider>
      <Sidebar.Root
        className="no-bg-scrollbar"
        as="aside"
        position="sticky"
        top="var(--header-height)"
        flexShrink="0"
        height="var(--content-height)"
        overflowY="auto"
        overscrollBehavior="contain"
        width="300px"
        hideBelow="md"
        fontSize="sm"
        borderRightWidth="0"
        bg="transparent"
        {...props}
      >
        <Sidebar.Body gap="6" px="4" py="8">
          {primaryNav.items?.map((group) => (
            <Sidebar.Group key={group.title}>
              <Sidebar.GroupHeader>
                <Sidebar.GroupTitle color="fg">
                  {group.title}
                </Sidebar.GroupTitle>
              </Sidebar.GroupHeader>
              <Sidebar.GroupContent>
                {route.getSidebarNavItems(group)?.map((item) => (
                  <SidebarItem
                    key={item.title}
                    item={{
                      ...item,
                      url: `/${primaryNav.url}/${group.url}/${item.url}`,
                    }}
                  />
                ))}
              </Sidebar.GroupContent>
            </Sidebar.Group>
          ))}
        </Sidebar.Body>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}

function SidebarItem({ item }: { item: NavItem }) {
  const route = useRoute()

  const isActive = item.url ? route.currentUrl === item.url : false
  const isGroupActive = item.items?.some(
    (item) => route.currentUrl === item.url,
  )

  if (!item.items || item.items.length === 0) {
    return (
      <Sidebar.NavItem key={item.title}>
        <Sidebar.NavButton
          asChild
          active={isActive}
          px="2"
          fontWeight="medium"
          color="sidebar.fg/70"
          _currentPage={{
            bg: 'sidebar.accent.bg',
            color: 'sidebar.accent.fg',
          }}
        >
          {item.url ? (
            <Link href={item.url} aria-current={isActive ? 'page' : undefined}>
              {item.title}
            </Link>
          ) : (
            <Text>{item.title}</Text>
          )}
        </Sidebar.NavButton>
      </Sidebar.NavItem>
    )
  }

  return (
    <Collapsible.Root asChild key={item.title} defaultOpen={isGroupActive}>
      <Sidebar.Group>
        <Collapsible.Trigger asChild>
          <Sidebar.GroupHeader
            fontSize="sm"
            height="8"
            data-active={isGroupActive ? '' : undefined}
            _active={{
              bg: 'sidebar.accent.bg',
            }}
          >
            <Sidebar.GroupTitle>{item.title}</Sidebar.GroupTitle>
          </Sidebar.GroupHeader>
        </Collapsible.Trigger>

        <Collapsible.Content asChild>
          <Sidebar.GroupContent paddingBottom="4">
            {item.items?.map((item) => (
              <Sidebar.NavItem key={item.title}>
                <Sidebar.NavButton
                  ps="8"
                  _before={{
                    content: '""',
                    display: 'block',
                    height: '100%',
                    width: '1px',
                    bg: 'border',
                    position: 'absolute',
                    left: 4,
                    top: 0,
                    bottom: 0,
                    zIndex: -1,
                  }}
                  asChild
                >
                  <Link
                    href={item.url!}
                    aria-current={
                      item.url === route.currentUrl ? 'page' : undefined
                    }
                  >
                    {item.title}
                  </Link>
                </Sidebar.NavButton>
              </Sidebar.NavItem>
            ))}
          </Sidebar.GroupContent>
        </Collapsible.Content>
      </Sidebar.Group>
    </Collapsible.Root>
  )
}

export const SidebarEnd = (props: BoxProps) => {
  const { children } = props
  return (
    <Box
      className="no-bg-scrollbar"
      as="aside"
      position="sticky"
      top="var(--header-height)"
      pt="8"
      pb="8"
      px="2"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      overscrollBehavior="contain"
      width="16rem"
      hideBelow="xl"
      {...props}
    >
      <Stack gap="4" align="flex-start">
        {children}
      </Stack>
    </Box>
  )
}

const MobileMenuButton = chakra('button', {
  base: {
    display: 'flex',
    px: '4',
    py: '2',
    gap: '2',
    w: 'full',
    hideFrom: 'md',
    fontSize: 'md',
    alignItems: 'center',
    color: 'fg',
    position: 'sticky',
    zIndex: '10',
    top: 'var(--header-height)',
    borderBottom: '1px solid',
    borderColor: 'border.subtle',
    cursor: 'pointer',
    bg: 'bg',
  },
})

export const MobileMenuBreadcrumbs = () => {
  const route = useRoute()

  const crumbs = route
    .getSidebarNavItems()
    .map((group) => {
      const item = group.items.find((item) => item.url === route.currentUrl)
      return item ? [group.title, item.title] : null
    })
    .filter(Boolean)[0]

  return (
    <Breadcrumb.Root separator={<AiOutlineRight />}>
      {crumbs?.map((crumb, index) => <Text key={index}>{crumb}</Text>)}
    </Breadcrumb.Root>
  )
}

export const MobileSidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const route = useRoute()
  const pathname = usePathname()
  const pathnameRef = useRef(pathname)

  const closeMenu = () => setIsOpen(false)

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
        <MobileMenuButton aria-label="Open menu">
          <AiOutlineMenu />
          <MobileMenuBreadcrumbs />
        </MobileMenuButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />

        <Drawer.Content borderTopRadius="md" maxH="var(--content-height)">
          <Drawer.CloseButton />
          <Drawer.Body display="flex" flexDir="column" gap="6" py="5" flex="1">
            {route
              .getSidebarNavItems()
              ?.map((group) => (
                <SideNav
                  key={group.title}
                  currentUrl={route.currentUrl}
                  title={group.title}
                  items={group.items}
                />
              ))}
          </Drawer.Body>
        </Drawer.Content>
      </Portal>
    </Drawer.Root>
  )
}
