import { forwardRef } from '@chakra-ui/react'

import { Button, ButtonProps } from '@saas-ui/react'

import Link from 'next/link'

export interface NavLinkProps extends ButtonProps {
  isActive?: boolean
  href?: string
}

const NavLink = forwardRef((props: NavLinkProps, ref) => {
  const { href, children, type, isActive, ...rest } = props

  return (
    <Link href={href as string} passHref>
      <Button
        as="a"
        ref={ref}
        variant="nav-link"
        lineHeight="2rem"
        isActive={isActive}
        {...rest}
      >
        {children}
      </Button>
    </Link>
  )
})

NavLink.displayName = 'NavLink'

export default NavLink
