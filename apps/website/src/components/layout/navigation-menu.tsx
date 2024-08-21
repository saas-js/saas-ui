import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import {
  Box,
  Button,
  chakra,
  HStack,
  IconButton,
  Kbd,
  keyframes,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Tooltip,
  useDisclosure,
  useUpdateEffect,
  type HTMLChakraProps,
} from '@chakra-ui/react'
import { ChevronDownIcon, SearchInput, useHotkeys } from '@saas-ui/react'
import { useAuth } from '@saas-ui/auth'
import { GlobalSearch } from '../global-search/global-search'
import { useRouter } from 'next/router'
import { MobileNavButton, MobileNavContent } from '@/docs/components/mobile-nav'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import ThemeToggle from './theme-toggle'
import NavLink from '../nav-link'
import Logo from './logo'

export const Navigation = () => {
  const router = useRouter()
  const mobileNav = useDisclosure()
  const { user, isAuthenticated, logOut } = useAuth()

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  const { isOpen, onOpen, onClose } = useDisclosure()

  useHotkeys(['/', 'CMD+K'], () => {
    onOpen()
  })

  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        <NavigationMenu.Item>
          <Logo
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault()

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            }}
          />
        </NavigationMenu.Item>

        <HStack display={{ base: 'none', md: 'flex' }}>
          <NavigationMenu.Item>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <List
                sx={{
                  '@media only screen and (min-width: 600px)': {
                    width: '800px',
                    maxWidth: '80vw',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: 'repeat(6, 1fr)',
                  },
                }}
              >
                <ListItem
                  href="/#features"
                  title="Saas UI Core"
                  gridArea="1 / 1 / 4 / span 1"
                >
                  Open source component library for startups.
                </ListItem>

                <ListItem
                  href="/#pro-features"
                  title="Saas UI Pro"
                  gridArea="4 / 1 / -1 / span 1"
                >
                  Premium React components and utilities.
                </ListItem>

                <ListItem
                  href="/nextjs-starter-kit"
                  title="Next.js starter kit"
                  gridColumn="2 / span 1"
                  gridRow="span 2"
                >
                  Build intuitive Next.js apps with a solid foundation.
                </ListItem>

                <ListItem
                  href="/figma"
                  title="Figma"
                  gridColumn="2 / span 1"
                  gridRow="span 2"
                >
                  Design system and UI Kit for product designers.
                </ListItem>
                <ListItem
                  href="/blocks"
                  title="Blocks"
                  gridColumn="2 / span 1"
                  gridRow="span 2"
                >
                  Pre-built components for rapid development.
                </ListItem>
              </List>
            </NavigationMenuContent>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
            <NavigationMenuContent>
              <List
                sx={{
                  '@media only screen and (min-width: 600px)': {
                    width: '800px',
                    maxWidth: '80vw',
                    // gridAutoFlow: 'column',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(6, 1fr)',
                  },
                }}
              >
                <li
                  style={{ gridColumn: '1 / span 1', gridRow: 'span 6' }}
                  role="group"
                >
                  <NavigationMenu.Link asChild>
                    <Callout href="/docs">
                      <CalloutHeading>Core docs</CalloutHeading>
                      <CalloutText>Learn how to use Saas UI.</CalloutText>
                      <Spacer />
                      <HStack alignItems="flex-end">
                        <CalloutLink href="/docs">Introduction</CalloutLink>
                        <CalloutLink href="/docs/components">
                          Components
                        </CalloutLink>
                      </HStack>
                    </Callout>
                  </NavigationMenu.Link>
                </li>
                <ListItem
                  title="Pro docs"
                  href="/docs/pro"
                  gridColumn="2 / span 1"
                  gridRow="1 / span 3"
                >
                  Learn how to use Saas UI Pro.
                </ListItem>
                <ListItem
                  title="Starter kit docs"
                  href="/docs/nextjs-starter-kit"
                  gridColumn="2 / span 1"
                  gridRow="4 / span 3"
                >
                  Build modern apps with the Next.js starter kit.
                </ListItem>
                <ListItem
                  title="Roadmap"
                  href="https://roadmap.saas-ui.dev"
                  target="_blank"
                  gridColumn="3 / span 1"
                  gridRow="1 /span 2"
                />
                <ListItem
                  title="Changelog"
                  href="/changelog"
                  gridColumn="3 / span 1"
                  gridRow="3 / span 2"
                />
                <ListItem
                  title="Blog"
                  href="/blog"
                  gridColumn="3 / span 1"
                  gridRow="5 / span 2"
                />
              </List>
            </NavigationMenuContent>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
          </NavigationMenu.Item>
        </HStack>

        <Spacer />

        <Box
          sx={{
            '@media only screen and (max-width: 768px)': {
              display: 'none',
            },
          }}
        >
          <SearchInput
            placeholder="Search docs..."
            size="sm"
            borderRadius="md"
            onFocus={onOpen}
            rightElement={<Kbd fontSize="md">/</Kbd>}
          />
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
          <>
            <NavLink
              display={{ base: 'none', lg: 'block' }}
              href="/pricing"
              label="Buy Pro"
              variant="primary"
            />
            <NavLink
              display={{ base: 'none', lg: 'block' }}
              href="/login"
              label="Login"
            />
          </>
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

        <NavigationMenuIndicator></NavigationMenuIndicator>
      </NavigationMenuList>

      <ViewportPosition>
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenuRoot>
  )
}

const enterFromRight = keyframes({
  from: { transform: 'translateX(200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

const enterFromLeft = keyframes({
  from: { transform: 'translateX(-200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

const exitToRight = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(200px)', opacity: 0 },
})

const exitToLeft = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(-200px)', opacity: 0 },
})

const scaleIn = keyframes({
  from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
})

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
})

const NavigationMenuRoot = chakra(NavigationMenu.Root, {
  baseStyle: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    justifyContent: 'stretch',
    zIndex: 1,
    gap: '8',
    '& > div': {
      width: '100%',
    },
  },
})

const NavigationMenuList = chakra(NavigationMenu.List, {
  baseStyle: {
    display: 'flex',
    flex: 1,
    padding: 0,
    listStyle: 'none',
    margin: 0,
    gap: 4,
  },
})

const itemStyles = {
  px: 3,
  py: 2,
  outline: 'none',
  userSelect: 'none',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 'md',
  fontSize: 'md',
  color: 'blackAlpha.800',
  _dark: {
    color: 'whiteAlpha.800',
  },
  _hover: {
    color: 'black',
    _dark: {
      color: 'white',
    },
  },
  _focus: {
    boxShadow: 'outline',
  },
  '&[data-state="open"]': {
    color: 'black',
    _dark: {
      color: 'white',
    },
  },
}

const NavigationMenuTrigger = chakra(NavigationMenu.Trigger, {
  baseStyle: {
    all: 'unset',
    ...itemStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
})

const NavigationMenuLink = chakra(NavigationMenu.Link, {
  baseStyle: {
    ...itemStyles,
    display: 'block',
    textDecoration: 'none',
    fontSize: 'md',
    lineHeight: 1,
  },
})

const NavigationMenuContent = chakra(NavigationMenu.Content, {
  baseStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    '@media only screen and (min-width: 600px)': { width: 'auto' },
    '&[data-motion="from-start"]': { animation: `${enterFromLeft} 250ms ease` },
    '&[data-motion="from-end"]': { animation: `${enterFromRight} 250ms ease` },
    '&[data-motion="to-start"]': { animation: `${exitToLeft} 250ms ease` },
    '&[data-motion="to-end"]': { animation: `${exitToRight} 250ms ease` },
  },
})

const NavigationMenuIndicator = chakra(NavigationMenu.Indicator, {
  baseStyle: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '10px',
    top: '100%',
    overflow: 'hidden',
    zIndex: 1,
    transition: 'width, transform 250ms ease',
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  },
})

const NavigationMenuViewport = chakra(NavigationMenu.Viewport, {
  baseStyle: {
    position: 'relative',
    transformOrigin: 'top center',
    marginTop: 0,
    width: '100%',
    backgroundColor: 'whiteAlpha.500',
    backdropFilter: 'blur(20px)',
    borderBottomRadius: 'lg',
    overflow: 'hidden',
    borderWidth: '1px',
    boxShadow:
      'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    height: 'var(--radix-navigation-menu-viewport-height)',
    transition: 'width, height, 300ms ease',
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
    '@media only screen and (min-width: 600px)': {
      width: 'var(--radix-navigation-menu-viewport-width)',
    },
    _dark: {
      backgroundColor: 'blackAlpha.400',
      boxShadow: 'dark-lg',
    },
  },
})

const List = chakra('ul', {
  baseStyle: {
    display: 'grid',
    p: 3,
    margin: 0,
    columnGap: 2,
    listStyle: 'none',
    gap: 2,
  },
})

const ListItem = React.forwardRef<HTMLAnchorElement, HTMLChakraProps<'a'>>(
  function ListItem(
    { children, title, gridRow, gridColumn, gridArea, ...props },
    forwardedRef
  ) {
    return (
      <chakra.li
        role="group"
        gridRow={gridRow}
        gridColumn={gridColumn}
        gridArea={gridArea}
      >
        <NavigationMenu.Link asChild>
          <ListItemLink {...props} ref={forwardedRef}>
            <ListItemHeading>{title}</ListItemHeading>
            {children && <ListItemText>{children}</ListItemText>}
          </ListItemLink>
        </NavigationMenu.Link>
      </chakra.li>
    )
  }
)

const ListItemLink = chakra(Link, {
  baseStyle: {
    display: 'block',
    height: '100%',
    outline: 'none',
    textDecoration: 'none',
    userSelect: 'none',
    padding: 4,
    borderRadius: 'md',
    fontSize: 'md',
    cursor: 'pointer',
    bg: 'blackAlpha.50',
    transition: 'background-color 0.2s ease',
    _hover: {
      bg: 'blackAlpha.100',
    },
    _focus: {
      bg: 'blackAlpha.100',
    },
    _dark: {
      bg: 'whiteAlpha.200',
      _hover: {
        bg: 'whiteAlpha.300',
      },
      _focus: {
        bg: 'whiteAlpha.300',
      },
    },
  },
})

const ListItemHeading = chakra('div', {
  baseStyle: {
    fontWeight: 'medium',
    lineHeight: 1.2,
    color: 'blackAlpha.800',
    _dark: {
      color: 'whiteAlpha.800',
    },
    transition: 'color 0.2s ease',
    _groupHover: {
      color: 'black',
      _dark: {
        color: 'white',
      },
    },
  },
})

const ListItemText = chakra('p', {
  baseStyle: {
    all: 'unset',
    lineHeight: 1.4,
    fontSize: 'sm',
    fontWeight: 'initial',
    color: 'blackAlpha.600',
    transition: 'color 0.2s ease',
    _dark: {
      color: 'whiteAlpha.600',
    },
    _groupHover: {
      color: 'blackAlpha.800',
      _dark: {
        color: 'whiteAlpha.800',
      },
    },
  },
})

const Callout = chakra('a', {
  baseStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    background: 'blackAlpha.50',
    borderRadius: 'md',
    padding: 4,
    textDecoration: 'none',
    outline: 'none',
    userSelect: 'none',
    transition: 'background-color 0.2s ease',
    _hover: {
      background: 'blackAlpha.100',
    },
    _focus: {
      background: 'blackAlpha.100',
    },
    _dark: {
      background: 'whiteAlpha.200',
      _hover: {
        background: 'whiteAlpha.300',
      },
      _focus: {
        background: 'whiteAlpha.300',
      },
    },
  },
})

const CalloutHeading = chakra('div', {
  baseStyle: {
    fontSize: 'md',
    fontWeight: 'medium',
    lineHeight: 1.2,
    color: 'blackAlpha.800',
    _dark: {
      color: 'whiteAlpha.800',
    },
    transition: 'color 0.2s ease',
    _groupHover: {
      color: 'black',
      _dark: {
        color: 'white',
      },
    },
  },
})

const CalloutText = chakra('p', {
  baseStyle: {
    all: 'unset',
    lineHeight: 1.4,
    fontSize: 'sm',
    fontWeight: 'initial',
    color: 'blackAlpha.600',
    transition: 'color 0.2s ease',
    _dark: {
      color: 'whiteAlpha.600',
    },
    _groupHover: {
      color: 'blackAlpha.800',
      _dark: {
        color: 'whiteAlpha.800',
      },
    },
  },
})

const CalloutLink = chakra(Link, {
  baseStyle: {
    display: 'block',
    height: '100%',
    outline: 'none',
    textDecoration: 'none',
    userSelect: 'none',
    px: 3,
    py: 1,
    borderRadius: 'full',
    fontSize: 'sm',
    fontWeight: 'medium',
    cursor: 'pointer',
    bg: 'blackAlpha.50',
    transition: 'background-color 0.2s ease',
    _hover: {
      bg: 'blackAlpha.100',
    },
    _focus: {
      bg: 'blackAlpha.100',
    },
    _groupHover: {
      bg: 'blackAlpha.100',
    },
    _dark: {
      bg: 'whiteAlpha.200',
      _hover: {
        bg: 'whiteAlpha.300',
      },
      _focus: {
        bg: 'whiteAlpha.300',
      },
      _groupHover: {
        bg: 'whiteAlpha.300',
      },
    },
  },
})

const ViewportPosition = chakra('div', {
  baseStyle: {
    display: 'content',
    position: 'absolute',
    mt: 2,
    justifyContent: 'flex-start',
    width: '100%',
    top: '100%',
    left: 0,
    perspective: '2000px',
  },
})
