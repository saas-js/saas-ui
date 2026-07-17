'use client'

import * as React from 'react'

import { useLink } from '@/registry/default/lib/use-link/use-link.tsx'
import type { HTMLChakraProps } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import type { NavbarVariantProps } from '@saas-ui/chakra-preset/slot-recipes/navbar'

import { withContext, withProvider } from './navbar.context.ts'

interface NavbarBehaviorProps {
  parentRef?: React.RefObject<HTMLElement | null>
  height?: number | string
  shouldHideOnScroll?: boolean
  disableScrollHandler?: boolean
  onScrollPositionChange?: (scrollPosition: number) => void
}

interface NavbarRootProps
  extends
    NavbarVariantProps,
    NavbarBehaviorProps,
    Omit<HTMLChakraProps<'div'>, 'height'> {}

const NavbarRootPrimitive = React.forwardRef<HTMLDivElement, NavbarRootProps>(
  function NavbarRoot(props, forwardedRef) {
    const {
      parentRef,
      height = '3.5rem',
      shouldHideOnScroll = false,
      disableScrollHandler = false,
      onScrollPositionChange,
      style,
      ...rest
    } = props
    const rootRef = React.useRef<HTMLDivElement>(null)
    const [hidden, setHidden] = React.useState(false)
    const [atTop, setAtTop] = React.useState(true)

    React.useImperativeHandle(
      forwardedRef,
      () => rootRef.current as HTMLDivElement,
    )

    React.useEffect(() => {
      if (disableScrollHandler && !shouldHideOnScroll) return

      const target = parentRef?.current ?? window
      const getPosition = () =>
        target === window ? window.scrollY : (target as HTMLElement).scrollTop
      let previousPosition = getPosition()
      let throttleTimeout: ReturnType<typeof setTimeout> | undefined

      setAtTop(previousPosition === 0)

      const updateScrollPosition = () => {
        const position = getPosition()
        onScrollPositionChange?.(position)
        setAtTop(position === 0)

        if (shouldHideOnScroll) {
          const navbarHeight = rootRef.current?.offsetHeight ?? 0
          setHidden(position > previousPosition && position > navbarHeight)
        }
        previousPosition = position
        throttleTimeout = undefined
      }

      const handleScroll = () => {
        throttleTimeout ??= setTimeout(updateScrollPosition, 30)
      }

      target.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        target.removeEventListener('scroll', handleScroll)
        if (throttleTimeout !== undefined) clearTimeout(throttleTimeout)
      }
    }, [
      disableScrollHandler,
      onScrollPositionChange,
      parentRef,
      shouldHideOnScroll,
    ])

    return (
      <chakra.div
        ref={rootRef}
        data-hidden={hidden ? '' : undefined}
        data-at-top={atTop ? '' : undefined}
        style={
          {
            '--navbar-height': height,
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      />
    )
  },
)

const NavbarRoot = withProvider<HTMLDivElement, NavbarRootProps>(
  NavbarRootPrimitive,
  'root',
)

const NavbarBrand = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'brand',
)
const NavbarContent = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'content',
)
const NavbarItemGroup = withContext<HTMLUListElement, HTMLChakraProps<'ul'>>(
  'ul',
  'itemGroup',
)
const NavbarItem = withContext<HTMLLIElement, HTMLChakraProps<'li'>>(
  'li',
  'item',
)

interface NavbarLinkProps extends HTMLChakraProps<'a'> {
  active?: boolean
}

const NavbarLinkPrimitive = React.forwardRef<
  HTMLAnchorElement,
  NavbarLinkProps
>(function NavbarLink(props, ref) {
  const { active, asChild, children, ...rest } = props
  const Link = useLink()

  if (asChild) {
    return (
      <chakra.a
        asChild
        ref={ref}
        data-active={active ? '' : undefined}
        {...rest}
      >
        {children}
      </chakra.a>
    )
  }

  return (
    <chakra.a asChild ref={ref} data-active={active ? '' : undefined} {...rest}>
      <Link>{children}</Link>
    </chakra.a>
  )
})

const NavbarLink = withContext<HTMLAnchorElement, NavbarLinkProps>(
  NavbarLinkPrimitive,
  'link',
  { forwardAsChild: true },
)

export {
  NavbarRoot as Root,
  NavbarContent as Content,
  NavbarBrand as Brand,
  NavbarItemGroup as ItemGroup,
  NavbarItem as Item,
  NavbarLink as Link,
}

export type { NavbarRootProps as RootProps, NavbarLinkProps as LinkProps }
