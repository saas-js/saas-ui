import { forwardRef } from '@chakra-ui/react'

import { Button, ButtonProps } from '@saas-ui/react'

import Link from 'next/link'

export interface NavLinkProps extends ButtonProps {
  isActive?: boolean
  href?: string
  id?: string
}

const NavLink = forwardRef((props: NavLinkProps, ref) => {
  const { href, type, isActive, ...rest } = props

  return (
    <Link href={href as string} passHref>
      <Button
        as="a"
        ref={ref}
        variant="nav-link"
        lineHeight="2rem"
        isActive={isActive}
        fontWeight="medium"
        {...rest}
      />
    </Link>
  )
})

NavLink.displayName = 'NavLink'

export default NavLink
