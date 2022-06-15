import { chakra, PropsOf, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { transparentize } from '@chakra-ui/theme-tools'

const StyledLink = React.forwardRef(function StyledLink(
  props: PropsOf<typeof chakra.a> & { isActive?: boolean },
  ref: React.Ref<any>
) {
  const { isActive, isDisabled, ...rest } = props

  return (
    <chakra.a
      outline="none"
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={isDisabled ? 'true' : undefined}
      width="100%"
      px="3"
      py="1"
      ps="8"
      rounded="md"
      ref={ref}
      fontSize="sm"
      fontWeight="500"
      color={useColorModeValue('gray.700', 'whiteAlpha.800')}
      transition="all 0.2s"
      _hover={{
        color: useColorModeValue('black', 'white'),
        bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.200'),
      }}
      _focus={{
        color: useColorModeValue('black', 'white'),
        bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.200'),
        boxShadow: 'outline',
        '&:not(:focus-visible)': { boxShadow: 'none' },
      }}
      _activeLink={{
        bg: useColorModeValue('primary.50', transparentize('primary.500', 0.2)),
        color: useColorModeValue('primary.700', 'primary.400'),
        fontWeight: '600',
      }}
      _disabled={{
        bg: 'none',
        cursor: 'inherit',
        opacity: 0.6,
      }}
      {...rest}
    />
  )
})

type SidebarLinkProps = PropsOf<typeof chakra.div> & {
  href?: string
  icon?: React.ReactElement
}

const SidebarLink = (props: SidebarLinkProps) => {
  const { href, icon, children, ...rest } = props

  const { asPath } = useRouter()
  const isActive = asPath === href

  const isDisabled = !href

  let link = (
    <StyledLink isActive={isActive} isDisabled={isDisabled}>
      {children}
    </StyledLink>
  )
  if (href) {
    link = (
      <NextLink href={href} passHref>
        {link}
      </NextLink>
    )
  }

  return (
    <chakra.div
      userSelect="none"
      display="flex"
      alignItems="center"
      lineHeight="1.5rem"
      {...rest}
    >
      {link}
    </chakra.div>
  )
}

export default SidebarLink
