import * as React from 'react'
import {
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Kbd,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

import { useRouter } from 'next/router'

import headerNav from '@/data/header-nav'
import NavLink from '@/components/nav-link'
import { useScrollSpy } from '@/hooks/use-scrollspy'
import { MobileNavButton } from '@/docs/components/mobile-nav'
import { MobileNavContent } from '@/docs/components/mobile-nav'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'

import ThemeToggle from './theme-toggle'
import { ProductLaneLogo } from '../logos/productlane'
import { ChevronDownIcon, SearchInput, useHotkeys } from '@saas-ui/react'

import { GlobalSearch } from '../global-search/global-search'
import { useAuth } from '@saas-ui/auth'
import Link from 'next/link'
import {
  LuBookMarked,
  LuBookOpen,
  LuFileCode,
  LuFileText,
  LuGanttChartSquare,
  LuRotateCw,
} from 'react-icons/lu'
import { NextjsIcon } from '../logos/nextjs'

const Header = () => {
  const router = useRouter()
  const mobileNav = useDisclosure()
  const isDesktop = useBreakpointValue({ xl: true })
  const { user, isAuthenticated, logOut } = useAuth()
  const activeId = useScrollSpy(
    headerNav.filter(({ id }) => id).map(({ id }) => `[id="${id}"]`),
    {
      threshold: 0.75,
    }
  )

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  const { isOpen, onOpen, onClose } = useDisclosure()

  useHotkeys(['/', 'CMD+K'], () => {
    onOpen()
  })

  const isActive = (href: string) => !!router.asPath.match(new RegExp(href))

  return (
    <HStack flex="1" ps="4">
      <HStack spacing="1" flexShrink={0} flex="1" justifyContent="flex-start">
        <NavLink
          href="/blocks"
          isActive={isActive('/blocks')}
          label={
            <HStack as="span" justifyContent="center">
              <Text as="span">Blocks</Text>
              <Badge
                rounded="full"
                colorScheme="primary"
                variant="solid"
                lineHeight={1.2}
                py="0.5"
                px="1.5"
                fontSize="2xs"
              >
                New
              </Badge>
            </HStack>
          }
        />
        <NavLink href="/figma" isActive={isActive('/figma')} label="Figma" />
        <NavLink
          href="/nextjs-starter-kit"
          isActive={isActive('/nextjs-starter-kit')}
          label="Next.js starter"
        />

        <DropdownMenu label="Learn">
          <SimpleGrid
            w="100vw"
            minW="320px"
            maxW="500px"
            px="4"
            py="2"
            alignItems="flex-start"
            columns={{
              base: 2,
              lg: 3,
            }}
            gap={2}
          >
            <Box>
              <MenuGroup title="Core" fontWeight="normal" color="muted">
                <MenuItem
                  as={Link}
                  icon={<LuFileText size="1.2em" />}
                  href="/docs"
                  borderRadius="md"
                >
                  Documentation
                </MenuItem>
                <MenuItem
                  as={Link}
                  icon={<LuFileCode size="1.2em" />}
                  href="/docs/components"
                  borderRadius="md"
                >
                  Components
                </MenuItem>
                <MenuItem
                  as={Link}
                  icon={<LuBookMarked size="1.2em" />}
                  href="/docs/guides"
                  borderRadius="md"
                >
                  Guides
                </MenuItem>
              </MenuGroup>
            </Box>
            <Box>
              <MenuGroup title="Pro" fontWeight="normal" color="muted">
                <MenuItem
                  as={Link}
                  icon={<LuFileText size="1.2em" />}
                  href="/docs/pro"
                  borderRadius="md"
                >
                  Documentation
                </MenuItem>
                <MenuItem
                  as={Link}
                  icon={<NextjsIcon boxSize="1.2em" />}
                  href="/docs/nextjs-starter-kit"
                  borderRadius="md"
                  whiteSpace="nowrap"
                >
                  Next.js starter kit
                </MenuItem>
              </MenuGroup>
            </Box>
            <Box>
              <MenuGroup title="Resources" fontWeight="normal" color="muted">
                <MenuItem
                  as={Link}
                  href="https://roadmap.saas-ui.dev"
                  borderRadius="md"
                  icon={<LuGanttChartSquare size="1.2em" />}
                >
                  Roadmap
                </MenuItem>
                <MenuItem
                  as={Link}
                  icon={<LuBookOpen size="1.2em" />}
                  href="/blog"
                  borderRadius="md"
                >
                  Blog
                </MenuItem>
              </MenuGroup>
            </Box>
          </SimpleGrid>
        </DropdownMenu>

        <NavLink
          href="/pricing"
          isActive={isActive('/pricing')}
          label="Pricing"
        />
      </HStack>
      <HStack>
        <Box>
          {isDesktop && (
            <SearchInput
              placeholder="Search docs..."
              size="sm"
              borderRadius="md"
              onFocus={onOpen}
              rightElement={<Kbd fontSize="md">/</Kbd>}
            />
          )}
          <GlobalSearch
            isOpen={isOpen}
            onClose={onClose}
            onSelect={(value) => {
              console.log(value)
            }}
          />
        </Box>

        {isAuthenticated ? (
          <Menu>
            <MenuButton
              as={Button}
              variant="primary"
              rightIcon={<ChevronDownIcon />}
            >
              Account
            </MenuButton>
            <MenuList>
              <MenuGroup title={user?.email || undefined}>
                <MenuItem onClick={() => router.push('/account')}>
                  Account
                </MenuItem>
                <MenuItem onClick={() => router.push('/redeem')}>
                  Redeem license
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => router.push('/discord')}>
                  Discord
                </MenuItem>
              </MenuGroup>

              <MenuDivider />
              <MenuItem onClick={() => logOut()}>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <NavLink
            display={{ base: 'none', lg: 'block' }}
            href="/pricing"
            label="Buy Pro"
            variant="primary"
          />
        )}

        <HStack spacing="0">
          <Tooltip label="Github">
            <IconButton
              variant="ghost"
              aria-label="github"
              icon={<FaGithub size="14" />}
              borderRadius="md"
              as={Link}
              href="https://github.com/saas-js/saas-ui"
            />
          </Tooltip>

          <ThemeToggle />
        </HStack>

        <MobileNavButton
          ref={mobileNavBtnRef}
          aria-label="Open Menu"
          onClick={mobileNav.onOpen}
        />

        <MobileNavContent
          isOpen={mobileNav.isOpen}
          onClose={mobileNav.onClose}
        />
      </HStack>
    </HStack>
  )
}

export default Header

function DropdownMenu(props: { label: string; children: React.ReactNode }) {
  const disclosure = useDisclosure()

  return (
    <Box onMouseLeave={(e) => disclosure.onClose()}>
      <Menu {...disclosure} gutter={0} placement="bottom">
        <MenuButton
          as={Button}
          variant="nav-link"
          onMouseEnter={() => disclosure.onOpen()}
        >
          {props.label}
        </MenuButton>
        <MenuList>{props.children}</MenuList>
      </Menu>
    </Box>
  )
}
