import { chakra, PropsOf } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { NavItem } from '@saas-ui/react'

type SidebarLinkProps = PropsOf<typeof chakra.a> & {
  href?: string
  icon?: React.ReactElement
}

const SidebarLink = (props: SidebarLinkProps) => {
  const { href, icon, children, ...rest } = props

  const { asPath } = useRouter()
  const isActive = asPath === href

  let link = (
    <NavItem
      isActive={isActive}
      variant="neutral"
      color="gray.600"
      _dark={{
        color: 'gray.300',
      }}
      _active={{
        color: 'inherit',
        fontWeight: 'medium',
      }}
      _hover={{
        color: 'inherit',
        bg: 'blackAlpha.100',
        _dark: {
          color: 'inherit',
          bg: 'whiteAlpha.100',
        },
      }}
      {...rest}
    >
      {children}
    </NavItem>
  )

  if (href) {
    link = (
      <NextLink href={href} passHref legacyBehavior>
        {link}
      </NextLink>
    )
  }

  return link
}

export default SidebarLink
