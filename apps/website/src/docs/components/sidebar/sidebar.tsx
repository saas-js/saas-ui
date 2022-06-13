import { useRouter } from 'next/router'
import * as React from 'react'
import sortBy from 'lodash/sortBy'
import {
  Badge,
  Box,
  chakra,
  Stack,
  useColorModeValue,
  Kbd,
  Collapse,
  Icon,
} from '@chakra-ui/react'
import { Routes, RouteItem } from '@/docs/utils/get-route-context'
import { convertBackticksToInlineCode } from '@/docs/utils/convert-backticks-to-inline-code'
import SidebarCategory from './sidebar-category'
import SidebarLink from './sidebar-link'

import { SearchInput, useHotkeys, useCollapse } from '@saas-ui/react'

import { ChevronRightIcon } from '@chakra-ui/icons'

export type SidebarContentProps = Routes & {
  pathname?: string
  contentRef?: any
}

function SidebarHeader({ color, isOpen, children, ...props }: any) {
  return (
    <chakra.div mt="8" px="4" {...props}>
      <chakra.h4
        fontSize="sm"
        fontWeight="bold"
        my="1.25rem"
        letterSpacing="wider"
        color={color}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        userSelect="none"
        cursor="pointer"
        className="sidebar-group-header"
      >
        <chakra.span flex="1" display="inline-flex" alignItems="center">
          {children}
        </chakra.span>
        <chakra.span
          color={useColorModeValue('gray.500', 'gray.500')}
          transition="color .2s ease-in"
          sx={{
            '.sidebar-group-header:hover &': {
              color: useColorModeValue('black', 'white'),
            },
          }}
        >
          <ChevronRightIcon
            transform={isOpen && 'rotate(90deg)'}
            transition="transform .2s ease-in"
          />
        </chakra.span>
      </chakra.h4>
    </chakra.div>
  )
}

function SidebarGroup({
  title,
  icon,
  routes,
  heading,
  pathname,
  open,
  contentRef,
  ...props
}: any) {
  const { isOpen, getToggleProps, getCollapseProps, onOpen, onClose } =
    useCollapse({
      defaultIsOpen: open,
    })

  React.useEffect(() => {
    if (open) {
      onOpen()
    } else {
      onClose()
    }
  }, [routes, open, onOpen, onClose])

  return (
    <Box {...props}>
      {heading && (
        <SidebarHeader isOpen={isOpen} {...getToggleProps()}>
          {icon && <Icon as={icon} me="2" />}
          {title}
        </SidebarHeader>
      )}

      <Collapse {...getCollapseProps()}>
        <Box px="4" overflow="hidden">
          {routes.map((lvl2, index) => {
            if (!lvl2.routes) {
              return (
                <SidebarLink
                  ml="-3"
                  mb="2"
                  key={lvl2.path || index}
                  href={lvl2.path}
                >
                  {lvl2.title}
                </SidebarLink>
              )
            }

            const selected = pathname.startsWith(lvl2.path)
            const opened = selected || lvl2.open

            const sortedRoutes = lvl2.sort
              ? sortBy(lvl2.routes, (i) => i.title)
              : lvl2.routes

            return (
              <SidebarCategory
                contentRef={contentRef}
                key={lvl2.path + index}
                title={lvl2.title}
                selected={selected}
                opened={opened}
              >
                <Stack as="ul" spacing="1">
                  {sortedRoutes.map((lvl3, i) => (
                    <SidebarLink as="li" key={lvl3.path || i} href={lvl3.path}>
                      <span>{convertBackticksToInlineCode(lvl3.title)}</span>
                      {lvl3.new && (
                        <Badge
                          ml="2"
                          lineHeight="tall"
                          fontSize="10px"
                          variant="solid"
                          colorScheme="primary"
                        >
                          New
                        </Badge>
                      )}
                      {lvl3.soon && (
                        <Badge
                          ml="2"
                          lineHeight="tall"
                          fontSize="10px"
                          variant="solid"
                          colorScheme="gray"
                        >
                          Soon
                        </Badge>
                      )}
                    </SidebarLink>
                  ))}
                </Stack>
              </SidebarCategory>
            )
          })}
        </Box>
      </Collapse>
    </Box>
  )
}

export function SidebarContent(props: SidebarContentProps) {
  const { routes, pathname, contentRef } = props
  const color = useColorModeValue('gray.700', 'inherit')

  const searchRef = React.useRef(null)

  useHotkeys('/', () => {
    searchRef.current?.focus()
  })

  const [query, setQuery] = React.useState('')

  // @todo move this to algolia
  const filterRoutes = React.useCallback((routes, query): RouteItem[] => {
    return routes.reduce((memo, routeItem) => {
      let current = Object.assign({}, routeItem)

      if (current.heading === true) {
        current.open = true
      }

      const isMatch = current.title.match(new RegExp(`.*${query}.*`, 'i'))

      if (current.routes) {
        current.routes = filterRoutes(routeItem.routes, query)
      }

      if (isMatch || current.routes?.length) {
        memo.push(current)
      }

      return memo
    }, [])
  }, [])

  const filteredRoutes = React.useMemo(() => {
    return query ? filterRoutes(routes, query) : routes
  }, [routes, query, filterRoutes])

  return (
    <>
      <Box>
        <SearchInput
          ref={searchRef}
          placeholder="Search docs..."
          size="sm"
          borderRadius="md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onReset={() => setQuery(null)}
          rightElement={
            <Kbd bg="none" fontSize="lg" fontWeight="bold">
              /
            </Kbd>
          }
        />
      </Box>
      {filteredRoutes.map((lvl1, idx) => {
        return (
          <SidebarGroup
            key={idx}
            contentRef={contentRef}
            pathname={pathname}
            {...lvl1}
          />
        )
      })}
    </>
  )
}

const Sidebar = ({ routes }) => {
  const { pathname } = useRouter()
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      overscrollBehavior="contain"
      w="280px"
      top="72px"
      height="calc(100vh - 80px)"
      pr="4"
      pb="6"
      pl="2"
      pt="16"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  )
}

export default Sidebar
