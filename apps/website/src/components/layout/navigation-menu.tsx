import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import {
  Badge,
  Box,
  Button,
  chakra,
  HStack,
  Icon,
  IconButton,
  Kbd,
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
import {
  ChevronDownIcon,
  IconBadge,
  SearchInput,
  useHotkeys,
} from '@saas-ui/react'
import { useAuth } from '@saas-ui/auth'
import { GlobalSearch } from '../global-search/global-search'
import { useRouter } from 'next/router'
import { MobileNavButton, MobileNavContent } from '@/docs/components/mobile-nav'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import ThemeToggle from './theme-toggle'
import NavLink from '../nav-link'
import Logo from './logo'
import { SaasUIIcon } from '@saas-ui/assets'
import { NextjsIcon } from '../logos/nextjs'
import { FigmaLogo } from '../logos/figma'
import { FaDiscord, FaFigma, FaX } from 'react-icons/fa6'
import {
  LuBook,
  LuBookCopy,
  LuBox,
  LuFileClock,
  LuMap,
  LuSquare,
} from 'react-icons/lu'
import { keyframes } from '@emotion/react'

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

        <HStack display={{ base: 'none', md: 'flex' }} gap="1px">
          {/* <NavigationMenu.Item>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <List
                sx={{
                  '@media only screen and (min-width: 600px)': {
                    width: '800px',
                    maxWidth: '80vw',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: 'repeat(3, 1fr)',
                  },
                }}
              >
                <ListItem
                  href="/#features"
                  title="Saas UI"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <SaasUIIcon width="16px" height="16px" />
                    </IconBadge>
                  }
                  gridArea="1 / 1 / 2 / span 1"
                >
                  Open source design system for startups.
                </ListItem>

                <ListItem
                  href="/#pro-features"
                  title="Saas UI Pro"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <SaasUIIcon
                        width="16px"
                        height="16px"
                        color="var(--chakra-colors-teal-400)"
                      />
                    </IconBadge>
                  }
                  gridArea="2 / 1 / 3 / span 1"
                >
                  Premium React components and utilities.
                </ListItem>

                <ListItem
                  href="/nextjs-starter-kit"
                  title={
                    <>
                      <span>Next.js starter kit</span>
                      <Badge
                        variant="subtle"
                        colorScheme="green"
                        fontWeight="medium"
                        borderRadius="full"
                        textTransform="none"
                        py="2px"
                        px="4px"
                        ms="2"
                      >
                        Updated
                      </Badge>
                    </>
                  }
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <NextjsIcon width="16px" height="16px" />
                    </IconBadge>
                  }
                  gridArea="3 / 1 / 4 / span 1"
                >
                  Production ready Next.js starter kit.
                </ListItem>

                <ListItem
                  href="/figma"
                  title="Figma"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <Icon as={FaFigma} boxSize="16px" />
                    </IconBadge>
                  }
                  gridColumn="2 / span 1"
                  gridRow="span 1"
                >
                  Design system and UI Kit for product designers.
                </ListItem>
                <ListItem
                  href="/blocks"
                  title="Blocks"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <Icon as={LuBox} boxSize="16px" />
                    </IconBadge>
                  }
                  gridColumn="2 / span 1"
                  gridRow="span 1"
                >
                  Pre-built components for rapid development.
                </ListItem>
              </List>
            </NavigationMenuContent>
          </NavigationMenu.Item> */}

          <NavigationMenu.Item>
            <NavigationMenuLink href="/nextjs-starter-kit">
              Starter kit
            </NavigationMenuLink>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuLink href="/blocks">Blocks</NavigationMenuLink>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuLink href="/figma">Figma</NavigationMenuLink>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuTrigger asChild>
              <Link href="/docs">Docs</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <List
                sx={{
                  '@media only screen and (min-width: 600px)': {
                    width: '800px',
                    maxWidth: '80vw',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(4, 1fr)',
                  },
                }}
              >
                <li
                  style={{ gridColumn: '1 / span 1', gridRow: 'span 4' }}
                  role="group"
                >
                  <NavigationMenu.Link asChild>
                    <Callout href="/docs" height="180px">
                      <IconBadge mb="2" bg="white" _dark={{ bg: 'gray.900' }}>
                        <SaasUIIcon width="16px" height="16px" />
                      </IconBadge>
                      <CalloutHeading>Saas UI</CalloutHeading>
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
                <li
                  style={{ gridColumn: '2 / span 1', gridRow: '1 / span 4' }}
                  role="group"
                >
                  <NavigationMenu.Link asChild>
                    <Callout href="/docs/pro">
                      <IconBadge mb="2" bg="white" _dark={{ bg: 'gray.900' }}>
                        <SaasUIIcon
                          width="16px"
                          height="16px"
                          color="var(--chakra-colors-teal-400)"
                        />
                      </IconBadge>
                      <CalloutHeading>Saas UI Pro</CalloutHeading>
                      <CalloutText>Learn how to use Saas UI Pro.</CalloutText>
                      <Spacer />
                      <HStack alignItems="flex-end">
                        <CalloutLink href="/docs/pro">
                          Getting started
                        </CalloutLink>
                      </HStack>
                    </Callout>
                  </NavigationMenu.Link>
                </li>
                <li
                  style={{ gridColumn: '3 / span 1', gridRow: '1 / span 4' }}
                  role="group"
                >
                  <NavigationMenu.Link asChild>
                    <Callout href="/docs/nextjs-starter-kit">
                      <IconBadge mb="2" bg="white" _dark={{ bg: 'gray.900' }}>
                        <NextjsIcon width="16px" height="16px" />
                      </IconBadge>
                      <CalloutHeading>Next.js starter kit</CalloutHeading>
                      <CalloutText>
                        Learn to build apps with Next.js.
                      </CalloutText>
                      <Spacer />
                      <HStack alignItems="flex-end">
                        <CalloutLink href="/docs/nextjs-starter-kit">
                          Getting started
                        </CalloutLink>
                      </HStack>
                    </Callout>
                  </NavigationMenu.Link>
                </li>
              </List>
            </NavigationMenuContent>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuTrigger
              sx={{
                display: {
                  md: 'none',
                  lg: 'flex',
                },
              }}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <List
                sx={{
                  '@media only screen and (min-width: 600px)': {
                    width: '600px',
                    maxWidth: '80vw',

                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                  },
                }}
              >
                <ListItem
                  title="Roadmap"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <Icon as={LuMap} boxSize="16px" />
                    </IconBadge>
                  }
                  href="https://roadmap.saas-ui.dev"
                  target="_blank"
                >
                  See what&apos;s coming next.
                </ListItem>
                <ListItem
                  title="Github"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <Icon as={FaGithub} boxSize="16px" />
                    </IconBadge>
                  }
                  href="https://github.com/saas-js/saas-ui"
                >
                  Explore the code.
                </ListItem>
                <ListItem
                  title="Blog"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <Icon as={LuBook} boxSize="16px" />
                    </IconBadge>
                  }
                  href="/blog"
                >
                  Read the latest posts.
                </ListItem>
                <ListItem
                  title="Discord"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <Icon as={FaDiscord} boxSize="16px" />
                    </IconBadge>
                  }
                  href="/discord"
                >
                  Join our community.
                </ListItem>
                <ListItem
                  title="X"
                  icon={
                    <IconBadge bg="white" _dark={{ bg: 'gray.900' }}>
                      <Icon as={FaX} boxSize="16px" />
                    </IconBadge>
                  }
                  href="https://x.com/saas_js"
                  target="_blank"
                >
                  Follow us on X.
                </ListItem>
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
            '@media only screen and (max-width: 1020px)': {
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
              onClose()
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
    textWrap: 'nowrap',
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
    bg: 'white',
    borderBottomRadius: 'lg',
    overflow: 'hidden',
    borderWidth: '1px',
    borderColor: 'gray.300',
    boxShadow:
      'hsl(206 22% 7% / 25%) 0px 10px 38px -10px, hsl(206 22% 7% / 15%) 0px 10px 20px -15px',
    height: 'var(--radix-navigation-menu-viewport-height)',
    transition: 'width, height, 300ms ease',
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
    '@media only screen and (min-width: 600px)': {
      width: 'var(--radix-navigation-menu-viewport-width)',
    },
    _dark: {
      borderColor: 'gray.700',
      bg: 'gray.900',
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

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  Omit<HTMLChakraProps<'a'>, 'title'> & {
    icon?: React.ReactNode
    title: React.ReactNode
  }
>(function ListItem(
  { children, title, icon, gridRow, gridColumn, gridArea, ...props },
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
          <HStack alignItems="flex-start">
            {icon}
            <Box>
              <ListItemHeading>{title}</ListItemHeading>
              {children && <ListItemText>{children}</ListItemText>}
            </Box>
          </HStack>
        </ListItemLink>
      </NavigationMenu.Link>
    </chakra.li>
  )
})

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
    transition: 'background-color 0.2s ease',
    _hover: {
      bg: 'blackAlpha.50',
    },
    _focus: {
      bg: 'blackAlpha.50',
    },
    _dark: {
      _hover: {
        bg: 'whiteAlpha.100',
      },
      _focus: {
        bg: 'whiteAlpha.100',
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
    // background: 'blackAlpha.50',
    borderRadius: 'md',
    padding: 3,
    textDecoration: 'none',
    outline: 'none',
    userSelect: 'none',
    transition: 'background-color 0.2s ease',
    _hover: {
      background: 'blackAlpha.50',
    },
    _focus: {
      background: 'blackAlpha.50',
    },
    _dark: {
      _hover: {
        background: 'whiteAlpha.100',
      },
      _focus: {
        background: 'whiteAlpha.100',
      },
    },
  },
})

const CalloutHeading = chakra('div', {
  baseStyle: {
    fontSize: 'md',
    fontWeight: 'medium',
    lineHeight: 1.4,
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
