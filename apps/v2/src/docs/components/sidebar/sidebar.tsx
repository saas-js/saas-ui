import { useRouter } from 'next/router'
import NextLink from 'next/link'
import * as React from 'react'
import sortBy from 'lodash/sortBy'
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Badge,
  Box,
  chakra,
  Stack,
  useColorModeValue,
  Kbd,
  Collapse,
  Icon,
  Flex,
  Text,
  HStack,
} from '@chakra-ui/react'
import { Routes, RouteItem } from '@/docs/utils/get-route-context'
import { convertBackticksToInlineCode } from '@/docs/utils/convert-backticks-to-inline-code'
import SidebarCategory from './sidebar-category'
import SidebarLink from './sidebar-link'

import Link from 'next/link'

import { useHotkeys, useCollapse } from '@saas-ui/react'

import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { LuCheck } from 'react-icons/lu'
import SaasUIGlyph from '@/components/saas-ui-glyph'
import { NextjsIcon } from '@/components/logos/nextjs'

export type SidebarContentProps = Routes & {
  pathname?: string
  contentRef?: any
}

function SidebarHeader({ isOpen, isActive, children, ...props }: any) {
  const color = useColorModeValue('gray.900', 'whiteAlpha.900')

  return (
    <chakra.div {...props}>
      <chakra.h4
        fontSize="sm"
        fontWeight="semibold"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        userSelect="none"
        cursor="pointer"
        className="sidebar-group-header"
        height="8"
        px="2"
        borderRadius="md"
        _hover={{ color, bg: 'blackAlpha.50' }}
        _dark={{
          _hover: {
            bg: 'whiteAlpha.50',
          },
        }}
        gap="2"
      >
        <chakra.span
          color={useColorModeValue('gray.500', 'gray.500')}
          transition="color .2s ease-in"
          sx={{
            '.sidebar-group-header:hover &': {
              color: useColorModeValue('black', 'white'),
            },
          }}
        >
          <Icon
            as={FiChevronRight}
            transform={isOpen && 'rotate(90deg)'}
            transition="transform .2s ease-in"
          />
        </chakra.span>
        <chakra.span flex="1" display="inline-flex" alignItems="center">
          {children}
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
  sort,
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
        <SidebarLink href={path}>
          {icon && <Icon as={icon} me="2" />}
          {title}
        </SidebarLink>
      )}

      {routes && (
        <Collapse {...getCollapseProps()}>
          <Box overflow="hidden">
            {routes?.map((lvl2, index) => {
              if (!lvl2.routes) {
                return (
                  <SidebarLink ps="7" key={lvl2.path || index} href={lvl2.path}>
                    <span>{convertBackticksToInlineCode(lvl2.title)}</span>
                    {lvl2.new && (
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
                    {lvl2.soon && (
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
                    {lvl2.pro && (
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
                    {lvl2.beta && (
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
                  {/* <Stack spacing="1"> */}
                  {sortedRoutes.map((lvl3, i) => (
                    <SidebarLink key={lvl3.path || i} href={lvl3.path} mb="2px">
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
                  {/* </Stack> */}
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

  const searchRef = React.useRef<any>(null)

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
      <Box py="4">
        <SidebarSwitch />
      </Box>
      <Box flex="1" overflowY="auto" minH="0">
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
  const { pathname, asPath, isReady } = useRouter()
  const ref = React.useRef<HTMLDivElement>(null)
  const [isInitial, setInitial] = React.useState(true)

  // React.useEffect(() => {
  //   if (ref.current && isReady && isInitial) {
  //     const el = ref.current.querySelector(`a[href="${asPath}"]`)
  //     el?.scrollIntoView({ behavior: 'auto' })
  //     setInitial(false)
  //   }
  // }, [asPath, isReady, isInitial])

  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main navigation"
      pos="sticky"
      overscrollBehavior="contain"
      w="280px"
      top="60px"
      height="calc(100vh - 100px)"
      className="sidebar-content"
      ms="-2"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  )
}

export default Sidebar

export const isMainNavLinkActive = (href: string, path: string) => {
  const [, , group, category] = href.split('/')

  return path.includes(
    href.split('/').length >= 4 ? `${group}/${category}` : group
  )
}

function SidebarSwitch() {
  const router = useRouter()

  const items = [
    {
      label: 'Saas UI',
      description: 'Open source design system.',
      href: '/docs',
      icon: SaasUIGlyph,
    },
    {
      label: 'Saas UI Pro',
      description: 'Premium components and templates.',
      href: '/docs/pro',
      icon: (props) => (
        <SaasUIGlyph color="var(--chakra-colors-cyan-400)" {...props} />
      ),
    },
    {
      label: 'Next.js starter kit',
      description: 'Production ready SaaS starter kit.',
      href: '/docs/nextjs-starter-kit',
      icon: NextjsIcon,
    },
  ]

  const activeItem = items
    .concat()
    .reverse()
    .find((link) => router.asPath.match?.(link.href))

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        size="xs"
        py="2"
        height="auto"
        mb="2"
        w="full"
        textAlign="start"
        justifyContent="start"
        minW="0"
        borderColor="blackAlpha.200"
        _dark={{
          borderColor: 'whiteAlpha.200',
        }}
      >
        <HStack as="span" minW="0">
          <Icon as={activeItem?.icon} alignSelf="start" boxSize="4" />
          <Stack as="span" spacing="1" flex="1" minW="0">
            <Text as="span" flex="1">
              {activeItem?.label}
            </Text>
            <Text
              as="span"
              fontSize="xs"
              color="muted"
              fontWeight="normal"
              maxW="100%"
            >
              {activeItem?.description}
            </Text>
          </Stack>
          <Icon as={FiChevronDown} />
        </HStack>
      </MenuButton>
      <MenuList width="280px">
        {items.map((item) => (
          <Link key={item.href} href={item.href} legacyBehavior>
            <MenuItem fontSize="xs">
              <HStack flex="1">
                <Icon as={item.icon} alignSelf="start" boxSize="4" />
                <Stack spacing="0" flex="1">
                  <Text as="span" flex="1" fontWeight="semibold">
                    {item?.label}
                  </Text>
                  <Text
                    as="span"
                    fontSize="xs"
                    color="muted"
                    fontWeight="normal"
                  >
                    {item?.description}
                  </Text>
                </Stack>
              </HStack>{' '}
              {activeItem?.href === item.href ? <LuCheck /> : null}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  )
}
