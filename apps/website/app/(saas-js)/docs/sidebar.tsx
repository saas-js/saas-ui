'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { SideNav } from '@/components/sidenav'
import {
  Box,
  BoxProps,
  Collapsible,
  Icon,
  Portal,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react/styled-system'
import { searchPath } from 'fumadocs-core/breadcrumb'
import type { PageTreeBuilder } from 'fumadocs-core/source'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineMenu, AiOutlineRight } from 'react-icons/ai'
import { LuChevronRight } from 'react-icons/lu'

import { Breadcrumb } from '#components/ui/breadcrumb'
import { Drawer } from '#components/ui/drawer'
import { Sidebar } from '#components/ui/sidebar'

type PageTree = Awaited<ReturnType<PageTreeBuilder['build']>>
type PageTreeNode = PageTree['children'][number]

export const SidebarStart = (props: BoxProps & { tree: PageTree }) => {
  const { tree, ...rest } = props

  const pathname = usePathname()

  const path = useMemo(() => {
    return searchPath(tree.children, pathname) ?? []
  }, [tree, pathname])

  const root =
    (path.findLast(
      (item) => item.type === 'folder' && item.root,
    ) as PageTree) ?? tree

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

function SidebarItem({ item }: { item: PageTreeNode }) {
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
            css={{
              '&[data-state=open] svg': { transform: 'rotate(90deg)' },
            }}
          >
            <Sidebar.GroupTitle>{item.name}</Sidebar.GroupTitle>
            <Sidebar.GroupEndElement>
              <Icon
                as={LuChevronRight}
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

export const MobileMenuBreadcrumbs = ({ tree }: { tree: PageTree }) => {
  const pathname = usePathname()
  const path = useMemo(() => searchPath(tree.children, pathname) ?? [], [tree, pathname])
  const crumbs = path
    .filter((item) => item.type === 'folder' || item.type === 'page')
    .map((item) => String(item.name))

  return (
    <Breadcrumb.Root separator={<AiOutlineRight />}>
      {crumbs.map((crumb, index) => (
        <Text key={`${crumb}-${index}`}>{crumb}</Text>
      ))}
    </Breadcrumb.Root>
  )
}

export const MobileSidebarNav = ({ tree }: { tree: PageTree }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const pathnameRef = useRef(pathname)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      setIsOpen(false)
    }
    pathnameRef.current = pathname
  }, [pathname, setIsOpen])

  const path = useMemo(() => searchPath(tree.children, pathname) ?? [], [tree, pathname])
  const root =
    (path.findLast(
      (item) => item.type === 'folder' && item.root,
    ) as PageTree) ?? tree

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
          <MobileMenuBreadcrumbs tree={tree} />
        </MobileMenuButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />

        <Drawer.Content borderTopRadius="md" maxH="var(--content-height)">
          <Drawer.CloseButton />
          <Drawer.Body display="flex" flexDir="column" gap="6" py="5" flex="1">
            {root.children?.map((item) => {
              if (item.type === 'separator') return null

              if (item.type === 'folder') {
                const items =
                  item.children
                    ?.filter(
                      (child): child is Extract<PageTreeNode, { type: 'page' }> =>
                        child.type === 'page' && typeof child.url === 'string',
                    )
                    .map((child) => ({
                      title: String(child.name),
                      url: child.url,
                    })) ?? []

                if (item.index?.url) {
                  items.unshift({
                    title: String(item.index.name),
                    url: item.index.url,
                  })
                }

                return (
                  <SideNav
                    key={item.$id}
                    currentUrl={pathname}
                    title={String(item.name)}
                    items={items}
                  />
                )
              }

              if (item.type === 'page' && item.url) {
                return (
                  <SideNav
                    key={item.$id}
                    currentUrl={pathname}
                    title=""
                    items={[{ title: String(item.name), url: item.url }]}
                  />
                )
              }

              return null
            })}
          </Drawer.Body>
        </Drawer.Content>
      </Portal>
    </Drawer.Root>
  )
}
