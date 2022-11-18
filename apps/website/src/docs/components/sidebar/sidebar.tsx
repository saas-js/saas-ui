import { useRouter } from 'next/router'
import NextLink from 'next/link'
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
  Flex,
  Center,
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

function SidebarHeader({ isOpen, isActive, children, ...props }: any) {
  const color = useColorModeValue('gray.900', 'whiteAlpha.900')

  return (
    <chakra.div px="4" {...props}>
      <chakra.h4
        fontSize="sm"
        fontWeight="bold"
        my="1.25rem"
        letterSpacing="wider"
        color={isActive ? color : 'muted'}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        userSelect="none"
        cursor="pointer"
        className="sidebar-group-header"
        _hover={{ color }}
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
  path,
  pathname,
  open,
  contentRef,
  ...props
}: any) {
  const { asPath } = useRouter()
  const isActive = isMainNavLinkActive(path, asPath)

  const { isOpen, getToggleProps, getCollapseProps, onOpen, onClose } =
    useCollapse({
      defaultIsOpen: isActive || open,
    })

  React.useEffect(() => {
    if (isActive) {
      onOpen()
    }
  }, [isActive, onOpen])

  return (
    <Box {...props}>
      {heading && routes.length ? (
        <SidebarHeader
          isOpen={isOpen}
          isActive={isActive}
          {...getToggleProps()}
        >
          {icon && <Icon as={icon} me="2" />}
          {title}
        </SidebarHeader>
      ) : (
        <MainNavLink href={path}>
          {icon && <Icon as={icon} me="2" />}
          {title}
        </MainNavLink>
      )}

      {routes && (
        <Collapse {...getCollapseProps()}>
          <Box px="4" overflow="hidden">
            {routes?.map((lvl2, index) => {
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
                      <SidebarLink
                        as="li"
                        key={lvl3.path || i}
                        href={lvl3.path}
                      >
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
                        {lvl3.pro && (
                          <Badge
                            ml="2"
                            lineHeight="tall"
                            fontSize="10px"
                            variant="solid"
                            colorScheme="purple"
                          >
                            Pro
                          </Badge>
                        )}
                        {lvl3.beta && (
                          <Badge
                            ml="2"
                            lineHeight="tall"
                            fontSize="10px"
                            variant="outline"
                            colorScheme="green"
                          >
                            Beta
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
      )}
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
    <Flex flexDirection="column" height="100%">
      <Box px="2" pb="2">
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
      <Box flex="1" overflowY="auto" minH="0" py="4">
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
      </Box>
    </Flex>
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
      height="calc(100vh - 72px)"
      pr="4"
      pl="2"
      pt="16"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  )
}

type MainNavLinkProps = {
  href: string
  children: React.ReactNode
  label?: string
}

export const isMainNavLinkActive = (href: string, path: string) => {
  const [, group, category] = href.split('/')

  return path.includes(
    href.split('/').length >= 3 ? `${group}/${category}` : group
  )
}

const MainNavLink = ({ href, children }: MainNavLinkProps) => {
  const { asPath } = useRouter()
  const active = isMainNavLinkActive(href, asPath)
  const linkColor = useColorModeValue('gray.900', 'whiteAlpha.900')

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        py="1"
        px="4"
        mb="2"
        align="center"
        fontSize="sm"
        fontWeight="semibold"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={active ? linkColor : 'muted'}
        _hover={{ color: linkColor }}
      >
        {children}
      </Flex>
    </NextLink>
  )
}

export default Sidebar
