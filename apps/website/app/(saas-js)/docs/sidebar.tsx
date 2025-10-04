'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { SideNav } from '@/components/sidenav'
import { useRoute } from '@/lib/use-route'
import {
  Box,
  BoxProps,
  Collapsible,
  Icon,
  Portal,
  Separator,
  Stack,
  Text,
  chakra,
} from '@saas-ui/react'
import { Breadcrumb, Drawer, Sidebar } from '@saas-ui/react'
import { searchPath } from 'fumadocs-core/breadcrumb'
import type { PageTree } from 'fumadocs-core/server'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineMenu, AiOutlineRight } from 'react-icons/ai'
import { LuChevronRight } from 'react-icons/lu'

export const SidebarStart = (props: BoxProps & { tree: PageTree.Root }) => {
  const { tree, ...rest } = props

  const pathname = usePathname()

  const path = useMemo(() => {
    return searchPath(tree.children, pathname) ?? []
  }, [tree, pathname])

  const root =
    (path.findLast(
      (item) => item.type === 'folder' && item.root,
    ) as PageTree.Root) ?? tree

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
        {...rest}
      >
        <Sidebar.Body gap="0" px="4" py="8">
          {root.children?.map((item) => {
            if (item.type === 'separator') {
              return <Separator />
            }

            if (item.type === 'folder') {
              return (
                <Sidebar.Group key={item.$id} my="3">
                  <Sidebar.GroupHeader>
                    <Sidebar.GroupTitle color="fg">
                      {item.name}
                    </Sidebar.GroupTitle>
                  </Sidebar.GroupHeader>
                  <Sidebar.GroupContent>
                    {item.children?.map((item, index) => (
                      <SidebarItem key={`${item.$id}-${index}`} item={item} />
                    ))}
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              )
            }

            return <SidebarItem key={item.$id} item={item} />
          })}
        </Sidebar.Body>
      </Sidebar.Root>
    </Sidebar.Provider>
  )
}

function SidebarItem({ item }: { item: PageTree.Node }) {
  const pathname = usePathname()

  if (item.type === 'page') {
    const isActive = item.url ? pathname === item.url : false

    return (
      <Sidebar.NavItem key={item.$id}>
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
              {item.name}
            </Link>
          ) : (
            <Text>{item.name}</Text>
          )}
        </Sidebar.NavButton>
      </Sidebar.NavItem>
    )
  }

  if (item.type === 'separator') {
    return <Separator />
  }

  const isGroupActive = item.children?.some(
    (item) => item.type === 'page' && pathname === item.url,
  )

  return (
    <Collapsible.Root asChild key={item.$id} defaultOpen={isGroupActive}>
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
            <Sidebar.GroupTitle>{item.name}</Sidebar.GroupTitle>
            <Sidebar.GroupEndElement>
              <Icon
                as={LuChevronRight}
                _groupOpen={{
                  transform: 'rotate(90deg)',
                }}
                transition="transform 0.2s ease-in-out"
              />
            </Sidebar.GroupEndElement>
          </Sidebar.GroupHeader>
        </Collapsible.Trigger>

        <Collapsible.Content asChild>
          <Sidebar.GroupContent paddingBottom="2">
            {item.children?.map((item) => {
              if (item.type === 'separator') {
                return <Separator />
              }

              if (item.type === 'folder') {
                return <SidebarItem key={item.$id} item={item} />
              }

              return (
                <Sidebar.NavItem
                  key={item.$id}
                  ps="4"
                  _before={{
                    content: '""',
                    display: 'block',
                    height: '100%',
                    width: '1px',
                    bg: 'border',
                    position: 'absolute',
                    left: 2,
                    top: 0,
                    bottom: 0,
                    zIndex: -1,
                  }}
                >
                  <Sidebar.NavButton
                    asChild
                    _currentPage={{
                      bg: 'sidebar.accent.bg',
                      color: 'sidebar.accent.fg',
                    }}
                  >
                    <Link
                      href={item.url!}
                      aria-current={item.url === pathname ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </Sidebar.NavButton>
                </Sidebar.NavItem>
              )
            })}
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
      {crumbs?.map((crumb, index) => (
        <Text key={index}>{crumb}</Text>
      ))}
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
            {route.getSidebarNavItems()?.map((group) => (
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
