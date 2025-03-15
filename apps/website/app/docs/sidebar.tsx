'use client'

import { useEffect, useRef, useState } from 'react'

import { SideNav } from '@/components/sidenav'
import { useRoute } from '@/lib/use-route'
import { Box, BoxProps, Portal, Stack, Text, chakra } from '@chakra-ui/react'
import { Breadcrumb, Drawer } from '@saas-ui/react'
import { usePathname } from 'next/navigation'
import { AiOutlineMenu, AiOutlineRight } from 'react-icons/ai'

export const SidebarStart = (props: BoxProps) => {
  const route = useRoute()
  return (
    <Box
      className="no-bg-scrollbar"
      as="aside"
      position="sticky"
      top="var(--header-height)"
      pe="5"
      ms="-3"
      py="8"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      overscrollBehavior="contain"
      width="16rem"
      hideBelow="md"
      fontSize="sm"
      {...props}
    >
      <Stack gap="6">
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
      </Stack>
    </Box>
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
