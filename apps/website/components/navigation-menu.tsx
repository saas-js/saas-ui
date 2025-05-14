import { forwardRef } from 'react'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Box, HStack, type HTMLChakraProps, chakra } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import Link from 'next/link'

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

export const NavigationMenuRoot = chakra(NavigationMenu.Root, {
  base: {
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

export const NavigationMenuList = chakra(NavigationMenu.List, {
  base: {
    display: 'flex',
    flex: 1,
    padding: 0,
    listStyle: 'none',
    margin: 0,
    gap: 4,
  },
})

export const NavigationMenuItem = chakra(NavigationMenu.Item, {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export const NavigationMenuTrigger = chakra(NavigationMenu.Trigger, {
  base: {
    all: 'unset',
    ...itemStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
})

export const NavigationMenuLink = chakra(NavigationMenu.Link, {
  base: {
    ...itemStyles,
    display: 'block',
    textDecoration: 'none',
    fontSize: 'md',
    lineHeight: 1,
    textWrap: 'nowrap',
  },
})

export const NavigationMenuContent = chakra(NavigationMenu.Content, {
  base: {
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

export const NavigationMenuIndicator = chakra(NavigationMenu.Indicator, {
  base: {
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

export const NavigationMenuViewport = chakra(NavigationMenu.Viewport, {
  base: {
    position: 'relative',
    transformOrigin: 'top center',
    marginTop: 0,
    width: '100%',
    bg: 'bg.panel',
    borderRadius: 'panel.lg',
    overflow: 'hidden',
    borderWidth: '1px',
    borderColor: 'border',
    boxShadow: 'lg',
    height: 'var(--radix-navigation-menu-viewport-height)',
    transition: 'width, height, 300ms ease',
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
    '@media only screen and (min-width: 600px)': {
      width: 'var(--radix-navigation-menu-viewport-width)',
    },
  },
})

export const List = chakra('ul', {
  base: {
    display: 'grid',
    p: 3,
    margin: 0,
    columnGap: 2,
    listStyle: 'none',
    gap: 2,
  },
})

export const ListItem = forwardRef<
  HTMLAnchorElement,
  Omit<HTMLChakraProps<'a'>, 'title'> & {
    icon?: React.ReactNode
    title: React.ReactNode
  }
>(function ListItem(
  { children, title, icon, gridRow, gridColumn, gridArea, ...props },
  forwardedRef,
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

export const ListItemLink = chakra(Link, {
  base: {
    display: 'block',
    height: '100%',
    outline: 'none',
    textDecoration: 'none',
    userSelect: 'none',
    px: 3,
    py: 2,
    borderRadius: 'control.md',
    fontSize: 'md',
    cursor: 'pointer',
    transitionProperty: 'background',
    transitionDuration: 'fast',
    _hover: {
      bg: 'bg.muted',
    },
    _focus: {
      bg: 'bg.muted',
    },
  },
})

export const ListItemHeading = chakra('div', {
  base: {
    fontWeight: 'medium',
    lineHeight: 1.2,
    textStyle: 'sm',
    color: 'fg',
    transitionProperty: 'color',
    transitionDuration: 'fast',
  },
})

export const ListItemText = chakra('p', {
  base: {
    all: 'unset',
    textStyle: 'xs',
    fontWeight: 'initial',
    color: 'fg.muted',
    transitionProperty: 'color',
    transitionDuration: 'fast',
    _groupHover: {
      color: 'fg.subtle',
    },
  },
})

export const Callout = chakra('a', {
  base: {
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

export const CalloutHeading = chakra('div', {
  base: {
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

export const CalloutText = chakra('p', {
  base: {
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

export const CalloutLink = chakra(Link, {
  base: {
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

export const ViewportPosition = chakra('div', {
  base: {
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
